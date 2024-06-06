const express = require('express')
const router = express.Router()
const DecisionSchema = require('../models/decision')
const ProgramSchema = require('../models/program')
const ExcelJs = require("exceljs")
const { emptyDecisionInputsValidation, typeDecisionInputsValidation, emptyFileDecisionInputValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { initDecisionDocMiddleware } = require('../helpers/init_doc')
const { upload, uploadToServer } = require('../helpers/multer_middleware')
const ObjectId = require("mongodb").ObjectId
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const config = {
    version: 'latest',
    region: 'ap-southeast-1',
    endpoint: 'https://s3.ap-southeast-1.amazonaws.com',
    credentials: {
        accessKeyId: 'AKIAJWV2UWBGOU7M53TA',
        secretAccessKey: '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',
    },
}

const s3 = new S3Client(config)

router.use(authenticateAccessToken)
router.get('/api/get-all-decisions', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const decisions = await DecisionSchema.find({
            program: { id: new ObjectId(id) },
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await DecisionSchema.countDocuments({
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

router.post('/api/create-decision', initDecisionDocMiddleware, upload.single("approvalDecisionDoc"), async (req, res) => {
    try {
        const { programId, name, detail, number, signDate, expireIn, expireInLL } = req.body
        console.log(req.body, "req.body post api")
        const decisionId = req.payload
        console.log(decisionId, "req.payload post api")
        const attachedDoc = req.file
        console.log(attachedDoc, "attachedDoc, post api")
        let attachedDocLink = ""
        let attachedDocName = ""
        if (!attachedDoc) {
            attachedDocLink = ""
            attachedDocName = ""
        } else {
            attachedDocLink = attachedDoc.location
            attachedDocName = attachedDoc.originalname
        }

        // thêm quyết định vừa xong vào chương trình tương ứng
        const program = await ProgramSchema.findOne({ _id: programId})
        console.log(program, "oldProgram create decision api")
        let decisionsArray = program.decisionsArray
        decisionsArray.push({
            decisionId: decisionId,
            decisionName: attachedDocName,
            decisionLink: attachedDocLink
        })

        const updatingProgram = await ProgramSchema.findOneAndUpdate({ _id: programId }, {decisionsArray: decisionsArray}, {new: true})
        console.log(updatingProgram, "updatingProgram create decision api")

        const newDecision = {
            name: name,
            detail: detail,
            number: number,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
            signDate: signDate,
            expireIn: expireIn,
            expireInLL: expireInLL,
            program: {
                id: programId
            }
        }
        const storingDecision = await DecisionSchema.findOneAndUpdate({ _id: decisionId }, newDecision, {new: true})
        console.log(storingDecision, "storingDecision post api")
        res.json({ error: false, message: 'Lưu thành công quyết định' })
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-decision/:id',  upload.single("approvalDecisionDoc1"), async(req, res) => {
    try {
        const { id } = req.params
        const { name, detail, number, signDate, expireIn, expireInLL, attachedDocLink, attachedDocName, programId} = req.body
        console.log(id, "::put api id::")
        const attachedDoc1 = req.file
        let newAttachedDocLink = ''
        if(attachedDoc1){
            console.log(attachedDoc1, "attachedDoc, post api")
            if (attachedDocLink === "") {
                console.log('ko có link ảnh cũ edit-decision api')
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

            newAttachedDocLink = attachedDoc1.location
        } else {
            newAttachedDocLink = attachedDocLink
        }

        const program = await ProgramSchema.findOne({ _id: programId })
        console.log(program, "before update program edit-decision api")
        const decisionArray = program.decisionsArray
        console.log(decisionArray, "old decisionArray edit-decision api")
        const editDecision = {
            decisionId: id,
            decisionName: attachedDocName,
            decisionLink: newAttachedDocLink
        }

        const newDecisionArray = decisionArray.map((item) => {
            console.log(item.decisionId, "vs", editDecision.id, "map function")
            if (item.decisionId === editDecision.decisionId) {
                return item = editDecision
            } else {
                return item
            }
        })
        console.log(newDecisionArray, "newDecisionArray edit-decision api")
        const updatingProgram = await ProgramSchema.findOneAndUpdate({ _id: programId }, {decisionsArray: newDecisionArray}, {new: true})
        console.log(updatingProgram, "updatingProgram edit-decision api")
        const updatingDecision = {
            name: name,
            detail: detail,
            number: number,
            attachedDocLink: newAttachedDocLink,
            attachedDocName: attachedDocName,
            signDate: signDate,
            expireIn: expireIn,
            expireInLL: expireInLL,
        }
        console.log(req.body, "put api req.body")
        const updatedDecision = await DecisionSchema.findOneAndUpdate({ _id: id }, updatingDecision, {new: true})
        console.log(updatedDecision, "updatedDecision")
        res.json({ error: false, message: "Quyết định đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-decision/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const delDecision = await DecisionSchema.findOne({ _id: id })
        const attachedDocLink = delDecision.attachedDocLink
        if (attachedDocLink === "") {
            console.log('ko có link ảnh cũ delete-decision api')
        } else {
            const delDecisionKey = delDecision.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delDecisionKey, "delDecisionKey delete api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delDecisionKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, "newDeleteCommand result delete api")
        }

        const programId = delDecision.program.id.toString()
        const program = await ProgramSchema.findOne({ _id: programId })

        // Loại bỏ quyết định bị xóa khỏi bảng program
        let decisionArray = program.decisionsArray
        const newDecisionArray = decisionArray.filter((item) => {
            if (item.decisionId !== id) {
                return item
            }
        })
        const updatingProgram = await ProgramSchema.findOneAndUpdate({ _id: programId }, {decisionsArray: newDecisionArray}, {new: true})
        console.log(updatingProgram, "updatingProgram delete-decision api")
        const deletingDecision = await DecisionSchema.findOneAndDelete({ _id: id })
        console.log(deletingDecision, "deletingDecision delete-decision api")
        res.json({ error: false, message: "Xóa thành công quyết định" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-decisions', async (req, res) => {
    try {
        const { id } = req.query // id: program id
        const decisions = await DecisionSchema.find({
            program: { id: new ObjectId(id) }
        }).lean()
        let stt = 0
        const aDecisions= decisions.map( doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-decisions")
        const programName = program.name 
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("decisions")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "TÊN QUYẾT ĐỊNH", key:"name", width: 20},
            {header: "NỘI DUNG QUYẾT ĐỊNH", key:"detail", width: 70},
            {header: "QUYẾT ĐỊNH SỐ", key:"number", width: 10},
            {header: "NGÀY KÝ", key:"signDate", width: 10},
            {header: "THỜI HẠN HIỆU LỰC", key:"expireIn", width: 10},
            {header: "THỜI HẠN HẾT HIỆU LỰC", key:"expireInLL", width: 10},
            {header: "TÊN VĂN BẢN ĐÍNH KÈM", key:"attachedDocName", width: 10},
            {header: "LINK VĂN BẢN ĐÍNH KÈM", key:"attachedDocLink", width: 30},
        ]
        aDecisions.map((decision) => {
            sheet.addRow({
                stt: decision.stt,
                name: decision.name,
                detail: decision.detail,
                number: decision.number,
                signDate: decision.signDate,
                expireIn: decision.expireIn,
                expireInLL: decision.expireInLL,
                attachedDocName: decision.attachedDocName,
                attachedDocLink: decision.attachedDocLink,
            })
        })
        await workbook.xlsx.writeFile(`public/Các quyết định phê duyệt-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Các quyết định phê duyệt-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-decisions catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-decisions-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-cac-quyet-dinh-phe-duyet.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-decisions-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-decisions-data', uploadToServer.single("decisions-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-decisions-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importDecisionArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            // console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importDecisionArr.push({
                    name: row.values[2],
                    detail: row.values[3],
                    number: row.values[4],
                    signDate: row.values[5],
                    expireIn: row.values[6],
                    expireInLL: row.values[7],
                    attachedDocName: row.values[8],
                    attachedDocLink: row.values[9],
                    program: {
                        id: programId
                    }
                })
            }
            
        })
        console.log(importDecisionArr, "importDecisionArr /api/import-decisions-data")
        const savedImportDecisions = await DecisionSchema.insertMany(importDecisionArr)
        console.log(savedImportDecisions, "savedImportDecisions /api/import-decisions-data")
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

router.use('/api/create-decision', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const decisionId = req.payload
        const docFile = req.file
        const delInitDecision = await DecisionSchema.deleteOne({ _id: decisionId })
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

router.use('/api/edit-decision/:id', async(error, req, res, next) => {
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
            console.log(result, ":::result, post api:::")
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

        // if (error.code === "EMPTY_DECISION_FILE_INPUT_ERROR") {
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