const express = require('express')
const router = express.Router()
const MoumoaSchema = require('../models/moumoa')
const ExcelJs = require("exceljs")
const { emptyMoumoaInputsValidation, typeMoumoaInputsValidation, emptyFileMoumoaInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initMoumoaDocMiddleware } = require('../helpers/init_doc')
const { upload } = require('../helpers/multer_middleware')
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

router.get('/api/get-all-moumoas', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const moumoas = await MoumoaSchema.find({
            partnerUni: {$regex: query}
            
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        // console.log(moumoas, "moumoas /api/get-all-moumoas")
        let count = await MoumoaSchema.estimatedDocumentCount()
        let stt = 0
        const aMoumoas = moumoas.map( doc => {
            stt++
            let status = 1
            let signingTime = doc.signingTime
            let expireTime = doc.expireTime
            let a_expireTime = expireTime.split("-")
            let a_signingTime = signingTime.split("-")
            doc.signingTime = a_signingTime[2] + "/" + a_signingTime[1] + "/" + a_signingTime[0]
            doc.expireTime = a_expireTime[2] + "/" + a_expireTime[1] + "/" + a_expireTime[0]
            const timeNow = new Date()
            const expiryDate = new Date(expireTime)
            if(expiryDate < timeNow){
                status = 3
            } else if (expiryDate - timeNow <= 2592000000*6) { // thời hạn ít hơn 6 tháng (6 tháng = 2592000000*6 mili s)
                status = 2
            } else {
                status = 1
            }
            const docDetail =  doc.docDetail
            const fixedDocDetail = docDetail.replaceAll("\r\n", "<br>")
            doc.docDetail = fixedDocDetail
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt,
                status: status                                                                                  
            }
        })
        console.log(aMoumoas, "aMoumoas")
        res.json({ data: aMoumoas, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-moumoa', initMoumoaDocMiddleware, upload.single("attachedMoumoaDoc"), async (req, res, next) => {
    try {
        const { nation, partnerUni, docType, docDetail, signingTime, expireTime, note  } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file post api")
        const moumoaId = req.payload
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
        const newMoumoa = {
            nation: nation,
            partnerUni: partnerUni,
            docType: docType,
            docDetail: docDetail,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
            signingTime: signingTime,
            expireTime: expireTime,
            note: note,
        }
        const storingMoumoa = await MoumoaSchema.findOneAndUpdate({ _id: moumoaId }, newMoumoa, {new: true})
        console.log(storingMoumoa, "storingMoumoa")
        res.json({ error: false, message: 'Lưu thành công' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        // res.json({ error: true, message: "something went wrong" })
        next(error)
    }
})

router.put('/api/edit-moumoa/:id', upload.single("attachedMoumoaDoc1"), async(req, res) => {
    try {
        const { id } = req.params
        const { nation, partnerUni, docType, docDetail, signingTime, expireTime, note, attachedDocLink, attachedDocName } = req.body
        const attachedDoc1 = req.file
        console.log(req.file, "req.file put api")
        console.log(req.body, "req.body put api")
        let newAttachedDocLink = ''
        if (attachedDoc1) {
            if (attachedDocLink === "") {
                console.log('ko có link ảnh cũ edit-moumoa api')
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
        const updatingMoumoa = {
            nation: nation,
            partnerUni: partnerUni,
            docType: docType,
            docDetail: docDetail,
            signingTime: signingTime,
            expireTime: expireTime,
            note: note,
            attachedDocLink: newAttachedDocLink,
            attachedDocName: attachedDocName
        }
        console.log(req.body, "put api req.body")
        const updatedMoumoa = await MoumoaSchema.findOneAndUpdate({ _id: id }, updatingMoumoa, {new: true})
        console.log(updatedMoumoa, "updatedMoumoa")
        res.json({ error: false, message: "Văn bản đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-moumoa/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const delMoumoa = await MoumoaSchema.findOne({ _id: id })
        const attachedDocLink = delMoumoa.attachedDocLink
        if (attachedDocLink === "") {
            console.log('ko có link ảnh cũ delete-moumoa api')
        } else {
            const delMoumoaKey = delMoumoa.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delMoumoaKey, "delMoumoaKey delete api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delMoumoaKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, delete api:::")
        }

        const deletingMoumoa = await MoumoaSchema.findOneAndDelete({ _id: id })
        console.log(deletingMoumoa, "deletingMoumoa")
        res.json({ error: false, message: "Xóa thành công văn bản" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-moumoas', async (req, res) => {
    try {
        const moumoas = await MoumoaSchema.find().lean()
        let stt = 0
        const aMoumoas = moumoas.map( doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("documents")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "QUỐC GIA", key:"nation", width: 20},//
            {header: "TRƯỜNG ĐỐI TÁC", key:"partnerUni", width: 30},//
            {header: "LOẠI VĂN BẢN", key:"docType", width: 20},//
            {header: "NỘI DUNG VĂN BẢN", key:"docDetail", width: 50},//
            {header: "THỜI GIAN KÝ KẾT", key:"signingTime", width: 20},//
            {header: "THỜI GIAN HẾT HẠN", key:"expireTime", width: 20},
            {header: "GHI CHÚ", key:"note", width: 40},
            {header: "TÊN VĂN BẢN ĐÍNH KÈM", key:"attachedDocName", width: 30},
            {header: "LINK VĂN BẢN ĐÍNH KÈM", key:"attachedDocLink", width: 40},
        ]
        aMoumoas.map(moumoa => {
            sheet.addRow({
                stt: moumoa.stt,
                nation: moumoa.nation,
                partnerUni: moumoa.partnerUni,
                docType: moumoa.docType,
                docDetail: moumoa.docDetail,
                signingTime: moumoa.signingTime,
                expireTime: moumoa.expireTime,
                note: moumoa.note,
                attachedDocName: moumoa.attachedDocName,
                attachedDocLink: moumoa.attachedDocLink
            })
        })
        await workbook.xlsx.writeFile(`public/Quản lý moumoa.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Quản lý moumoa.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-moumoas catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.use('/api/create-moumoa', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const moumoaId = req.payload
        const docFile = req.file
        const delInitMoumoa = await MoumoaSchema.deleteOne({ _id: moumoaId })
        console.log(delInitMoumoa, "deleted delInitMoumoa")
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

router.use('/api/edit-moumoa/:id', async(error, req, res, next) => {
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

        // if (error.code === "EMPTY_MOUMOA_FILE_INPUT_ERROR") {
        //     console.log(error.code, "empty file input error")
        //     return res.json({ error: true, message: "Chưa chọn file nào" })
        // }

    }
    

})

module.exports = router