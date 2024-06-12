// hợp tác quốc tế
const express = require('express')
const router = express.Router()
const HTQTSchema = require('../models/htqt')
const ExcelJs = require("exceljs")
const { emptyHTQTInputsValidation, typeHTQTInputsValidation, emptyFileHTQTInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initHTQTDocMiddleware } = require('../helpers/init_doc')
const { upload, uploadToServer } = require('../helpers/multer_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')

const ObjectId = require("mongodb").ObjectId

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

router.get('/api/get-all-htqts', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const htqts = await HTQTSchema.find({
            partnerUni: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await HTQTSchema.estimatedDocumentCount()
        let stt = 0
        const aHtqts = htqts.map( doc => {
            stt++
            let signingTime = doc.signingTime
            let expireTime = doc.expireTime
            let a_expireTime = expireTime.split("-")
            let a_signingTime = signingTime.split("-")
            doc.signingTime = a_signingTime[2] + "/" + a_signingTime[1] + "/" + a_signingTime[0]
            doc.expireTime = a_expireTime[2] + "/" + a_expireTime[1] + "/" + a_expireTime[0]
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aHtqts, "aHtqts")
        res.json({ data: aHtqts, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-htqt', initHTQTDocMiddleware, upload.single("attachedHTQTDoc"), async (req, res, next) => {
    try {
        const { nation, partnerUni, funding, planDetail, signingTime, expireTime, note  } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file post api")
        const htqtId = req.payload
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
        const newHtqt = {
            nation: nation,
            partnerUni: partnerUni,
            funding: funding,
            planDetail: planDetail,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
            signingTime: signingTime,
            expireTime: expireTime,
            note: note,
        }
        const storingHtqt = await HTQTSchema.findOneAndUpdate({ _id: htqtId }, newHtqt, {new: true})
        console.log(storingHtqt, "storingHtqt")
        res.json({ error: false, message: 'Lưu thành công' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        // res.json({ error: true, message: "something went wrong" })
        next(error)
    }
})

router.put('/api/edit-htqt/:id', upload.single("attachedHTQTDoc1"), async(req, res) => {
    try {
        const { id } = req.params
        const { nation, partnerUni, funding, planDetail, signingTime, expireTime, note, attachedDocLink, attachedDocName } = req.body
        const attachedDoc1 = req.file
        console.log(req.file, "req.file put api")
        console.log(req.body, "req.body put api")
        let newAttachedDocLink = ''
        if (attachedDoc1) {
            if (attachedDocLink === "") {
                console.log('ko có link ảnh cũ edit-htqt api')
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

        console.log(id, "::put api id::")
        const updatingHtqt = {
            nation: nation,
            partnerUni: partnerUni,
            funding: funding,
            planDetail: planDetail,
            signingTime: signingTime,
            expireTime: expireTime,
            note: note,
            attachedDocLink: newAttachedDocLink,
            attachedDocName: attachedDocName
        }
        console.log(req.body, "put api req.body")
        const updatedHtqt = await HTQTSchema.findOneAndUpdate({ _id: id }, updatingHtqt, {new: true})
        console.log(updatedHtqt, "updatedHtqt")
        res.json({ error: false, message: "Văn bản đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-htqt/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const delHtqt = await HTQTSchema.findOne({ _id: id })
        const attachedDocLink = delHtqt.attachedDocLink
        if (attachedDocLink === "") {
            console.log('ko có link ảnh cũ delete-htqt api')
        } else {
            const delHtqtKey = delHtqt.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delHtqtKey, "delHtqtKey delete api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delHtqtKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, delete api:::")
        }
        
        const deletingHtqt = await HTQTSchema.findOneAndDelete({ _id: id })
        console.log(deletingHtqt, "deletingHtqt")
        res.json({ error: false, message: "Xóa thành công" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-htqts', async (req, res) => {
    try {
        const htqts = await HTQTSchema.find().lean()
        let stt = 0
        const aHtqts = htqts.map(doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("htqts")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "QUỐC GIA", key:"nation", width: 30},
            {header: "TRƯỜNG ĐỐI TÁC", key:"partnerUni", width: 30},
            {header: "NGUỒN KINH PHÍ", key:"funding", width: 30},
            {header: "NỘI DUNG DỰ ÁN", key:"planDetail", width: 50},
            {header: "THỜI GIAN KÝ KẾT", key:"signingTime", width: 20},
            {header: "THỜI GIAN HẾT HẠN", key:"expireTime", width: 20},
            {header: "GHI CHÚ", key:"note", width: 30},
            {header: "TÊN VĂN BẢN ĐÍNH KÈM", key:"attachedDocName", width: 30},
            {header: "LINK VĂN BẢN ĐÍNH KÈM", key:"attachedDocLink", width: 30},
        ]
        aHtqts.map(htqt => {
            sheet.addRow({
                stt: htqt.stt,
                nation: htqt.nation,
                partnerUni: htqt.partnerUni,
                funding: htqt.funding,
                planDetail: htqt.planDetail,
                signingTime: htqt.signingTime,
                expireTime: htqt.expireTime,
                note: htqt.note,
                attachedDocName: htqt.attachedDocName,
                attachedDocLink: htqt.attachedDocLink
            })
        })
 

        await workbook.xlsx.writeFile(`public/Quản lý các dự án htqt.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Quản lý các dự án htqt.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-htqts catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-htqts-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-quan-ly-cac-du-an-htqt.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-htqts-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-htqts-data', uploadToServer.single("htqts-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-htqts-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importHtqtsArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            // console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importHtqtsArr.push({
                    nation: row.values[2],
                    partnerUni: row.values[3],
                    funding: row.values[4],
                    planDetail: row.values[5],
                    signingTime: row.values[6],
                    expireTime: row.values[7],
                    note: row.values[8],
                    attachedDocName: row.values[9],
                    attachedDocLink: row.values[10],
                    program: {
                        id: programId
                    }
                })
            }
            
        })
        console.log(importHtqtsArr, "importHtqtsArr /api/import-htqts-data")
        const savedImportHtqts = await HTQTSchema.insertMany(importHtqtsArr)
        console.log(savedImportHtqts, "savedImportHtqts /api/import-htqts-data")
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

router.use('/api/create-htqt', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const htqtId = req.payload
        const docFile = req.file
        const delInitHtqt = await HTQTSchema.deleteOne({ _id: htqtId })
        console.log(delInitHtqt, "deleted delInitHtqt")
        if (!docFile) {
            next(error)
        } else {
            console.log('POST api error!! So, delete images just uploaded')
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

router.use('/api/edit-htqt/:id', async(error, req, res, next) => {
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

        // if (error.code === "EMPTY_HTQT_FILE_INPUT_ERROR") {
        //     console.log(error.code, "empty file input error")
        //     return res.json({ error: true, message: "Chưa chọn file nào" })
        // }

    }
    

})

module.exports = router