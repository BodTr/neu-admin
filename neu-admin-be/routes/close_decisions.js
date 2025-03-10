const express = require('express')
const router = express.Router()
const CloseDecisionSchema = require('../models/close_decision')
const ProgramSchema = require('../models/program')
const ExcelJs = require("exceljs")
const { emptyCloseDecisionInputsValidation, typeCloseDecisionInputsValidation, emptyFileCloseDecisionInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initCloseDecisionDocMiddleware } = require('../helpers/init_doc')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { upload, uploadToServer } = require('../helpers/multer_middleware')
const ObjectId = require("mongodb").ObjectId

const config = {
    // credential
}

const s3 = new S3Client(config)

router.use(authenticateAccessToken)
router.get('/api/get-all-close-decisions', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const decisions = await CloseDecisionSchema.find({
            program: { id: new ObjectId(id) },
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await CloseDecisionSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aDecisions = decisions.map( doc => {
            stt++
            let signDate = doc.signDate
            let a_signDate = signDate.split("-")
            doc.signDate = a_signDate[2] + "/" + a_signDate[1] + "/" + a_signDate[0]
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aDecisions, "aDecisions")
        res.json({ data: aDecisions, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-close-decision', initCloseDecisionDocMiddleware, upload.single("closeDecisionDoc"), async (req, res) => {
    try {
        const { programId, name, detail, number, signDate, expireIn } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file create-close-decision api")
        const closeDecisionId = req.payload
        const attachedDoc = req.file
        let attachedDocLink = ""
        let attachedDocName = ""
        if (!attachedDoc) {
            attachedDocLink = ""
            attachedDocName = ""
        } else {
            attachedDocLink = attachedDoc.location
            attachedDocName = attachedDoc.originalname
        }
        const newCloseDecision = {
            name: name,
            detail: detail,
            number: number,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
            signDate: signDate,
            expireIn: expireIn,
            program: {
                id: programId
            }
        }

        const storingCloseDecision = await CloseDecisionSchema.findOneAndUpdate({ _id: closeDecisionId }, newCloseDecision, {new: true})
        console.log(storingCloseDecision, "storingCloseDecision")
        res.json({ error: false, message: 'Lưu thành công quyết định' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-close-decision/:id',  upload.single("closeDecisionDoc1"), async(req, res) => {
    try {
        const { id } = req.params
        const { name, detail, number, signDate, expireIn, attachedDocLink, attachedDocName} = req.body
        console.log(id, "::put api id::")
        const closeDecisionDoc1 = req.file
        console.log(closeDecisionDoc1, "closeDecisionDoc1 put api")
        let newAttachedDocLink = ''
        if(closeDecisionDoc1) {
            if (attachedDocLink === "" || attachedDocLink === undefined) {
                console.log('ko có link ảnh cũ edit-close-decision api')
            } else {
                const oldFileKey = attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
                console.log(oldFileKey, "oldFileKey put api")
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${oldFileKey}`
                })
                const result = await s3.send(newDeleteCommand)
                console.log(result, ":::result, newDeleteCommand put api:::")
            }
            newAttachedDocLink = closeDecisionDoc1.location
        } else {
            newAttachedDocLink = attachedDocLink
        }


        const updatingDecision = {
            name: name,
            detail: detail,
            number: number,
            attachedDocLink: newAttachedDocLink,
            attachedDocName: attachedDocName,
            signDate: signDate,
            expireIn: expireIn
        }
        console.log(req.body, "put api req.body")
        const updatedDecision = await CloseDecisionSchema.findOneAndUpdate({ _id: id }, updatingDecision, {new: true})
        console.log(updatedDecision, "updatedDecision")
        res.json({ error: false, message: "Quyết định đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-close-decision/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingDecision = await CloseDecisionSchema.findOne({ _id: id })
        console.log(deletingDecision, "deletingDecision")
        const attachedDocLink = deletingDecision.attachedDocLink
        if (attachedDocLink === "" || attachedDocLink === undefined) {
            console.log('ko có link ảnh cũ delete-close-decision api')
        } else {
            const delDecisionKey = deletingDecision.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delDecisionKey, "delDecisionKey delete-close-decision api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delDecisionKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, "newDeleteCommand result delete api")
        }

        const delDecision = await CloseDecisionSchema.findOneAndDelete({ _id: id })
        console.log(delDecision, "delDecision")
        res.json({ error: false, message: "Xóa thành công quyết định" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-close-decisions', async (req, res) => {
    try {
        const { id } = req.query
        const closeDecisions = await CloseDecisionSchema.find({
            program: { id: new ObjectId(id) }
        }).lean()
        let stt = 0
        const aCloseDecisions = closeDecisions.map(doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aCloseDecisions, "aCloseDecisions /api/export-excel-close-decisions")
        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-close-decisions")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("close-decisions")
        sheet.columns = [
            {header: "STT", key: "stt", width: 10},
            {header: "TÊN QUYẾT ĐỊNH", key: "name", width: 40},
            {header: "NỘI DUNG QUYẾT ĐỊNH", key: "detail", width: 70},
            {header: "QUYẾT ĐỊNH SỐ", key: "number", width: 20},
            {header: "NGÀY KÝ", key: "signDate", width: 20},
            {header: "THỜI HẠN HIỆU LỰC", key: "expireIn", width: 10},
            {header: "TÊN VĂN BẢN ĐÍNH KÈM", key: "attachedDocName", width: 30},
            {header: "LINK VĂN BẢN ĐÍNH KÈM", key: "attachedDocLink", width: 30},
        ]
        aCloseDecisions.map((decision) => {
            sheet.addRow({
                stt: decision.stt,
                name: decision.name,
                detail: decision.detail,
                number: decision.number,
                signDate: decision.signDate,
                expireIn: decision.expireIn,
                attachedDocName: decision.attachedDocName,
                attachedDocLink: decision.attachedDocLink,
            })
        })
        await workbook.xlsx.writeFile(`public/Các quyết định đóng chương trình-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Các quyết định đóng chương trình-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-close-decisions catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-close-decisions-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-cac-quyet-dinh-dong-chuong-trinh.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-close-decisions-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-close-decisions-data', uploadToServer.single("close-decisions-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-close-decisions-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)
        // console.log(workbook, "workbook /api/import-trans-programs-data")
        let importCloseDecisionArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            // console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importCloseDecisionArr.push({
                    name: row.values[2],
                    detail: row.values[3],
                    number: row.values[4],
                    signDate: row.values[5],
                    expireIn: row.values[6],
                    attachedDocName: row.values[7],
                    attachedDocLink: row.values[8],
                    program: {
                        id: programId
                    }
                })
            }
            
        })
        // console.log(sheet, "sheet /api/import-trans-programs-data")
        console.log(importCloseDecisionArr, "importCloseDecisionArr /api/import-trans-programs-data")
        const savedImportCloseDecsisions = await CloseDecisionSchema.insertMany(importCloseDecisionArr)
        console.log(savedImportCloseDecsisions, "savedImportTransProg /api/import-trans-programs-data")
        res.json({
            error: false,
            message: "import data thành công"
        })
    } catch (error) {
        console.log(error, "/api/import-decisions-data catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.use('/api/create-close-decision', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const decisionId = req.payload
        const docFile = req.file
        const delInitDecision = await CloseDecisionSchema.deleteOne({ _id: decisionId })
        console.log(delInitDecision, "deleted delInitDecision")
        if (!docFile) {
            next(error)
        } else {
            console.log('POST api error!! So, delete image just uploaded')
            const fileKey = docFile.Key
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${fileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, "::: s3 file deleted result, post api:::")
            next(error)
        }
    } catch (error) {
        console.log(error, "post error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' }) // nếu có lỗi gì xảy ra ở try block owr treen thì lỗi đc xử lí ở đây
    }
})

router.use('/api/edit-close-decision/:id', async(error, req, res, next) => {
    try {
        console.log(error, "error handle put api middleware")
        const { id } = req.params
        const docFile = req.file
        if (!docFile) {
            next(error)
        } else {
            const fileKey = docFile.Key
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${fileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, error handle put api middleware:::")
            next(error)
        }
    } catch (error) {
        console.log(error, "put error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' })
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        // if (error.code === "EMPTY_CLOSE_DECISION_FILE_INPUT_ERROR") {
        //     console.log(error.code, "empty input error")
        //     return res.json({ error: true, message: "Chưa chọn file nào" })
        // }
    
        // if (error.code === "DECISION_INPUTS_TYPE_ERROR") {
        //     console.log("input type error")
        //     return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        // }
    }
    

})

module.exports = router