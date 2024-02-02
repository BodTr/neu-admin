const express = require('express')
const router = express.Router()
const MoumoaSchema = require('../models/moumoa')
const { emptyMoumoaInputsValidation, typeMoumoaInputsValidation, emptyFileMoumoaInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initMoumoaDocMiddleware } = require('../helpers/init_doc')
const { upload } = require('../helpers/multer_middleware')


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

router.get('/api/get-all-moumoas', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const moumoas = await MoumoaSchema.find({
            partnerUni: {$regex: query}
            
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await MoumoaSchema.estimatedDocumentCount()
        let stt = 0
        const aMoumoas = moumoas.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aMoumoas, "aMoumoas")
        res.json({ data: aMoumoas, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-moumoa', initMoumoaDocMiddleware, upload.single("attachedMoumoaDoc"), emptyFileMoumoaInputValidation, emptyMoumoaInputsValidation, typeMoumoaInputsValidation, async (req, res, next) => {
    try {
        const { nation, partnerUni, docType, docDetail, signingTime, expireTime, note  } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file post api")
        const moumoaId = req.payload
        const attachedDoc = req.file
        console.log(attachedDoc, "attachedDoc, post api")
        const attachedDocLink = attachedDoc.location
        const attachedDocName = attachedDoc.originalname
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
        res.json({ error: false, message: 'Lưu thành công chương trình' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        // res.json({ error: true, message: "something went wrong" })
        next(error)
    }
})

router.put('/api/edit-moumoa/:id', upload.single("attachedMoumoaDoc1"), emptyMoumoaInputsValidation, typeMoumoaInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { nation, partnerUni, docType, docDetail, signingTime, expireTime, note, attachedDocLink, attachedDocName } = req.body
        const attachedDoc1 = req.file
        console.log(req.file, "req.file put api")
        console.log(req.body, "req.body put api")
        let newAttachedDocLink = ''
        if (attachedDoc1) {
            const oldFileKey = attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(oldFileKey, "oldFileKey put api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${oldFileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, put api:::")
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
        const delMoumoaKey = delMoumoa.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(delMoumoaKey, "delMoumoaKey delete api")
        const newDeleteCommand = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${delMoumoaKey}`
        })
        const result = await s3.send(newDeleteCommand)
        console.log(result, ":::result, delete api:::")
        const deletingMoumoa = await MoumoaSchema.findOneAndDelete({ _id: id })
        console.log(deletingMoumoa, "deletingMoumoa")
        res.json({ error: false, message: "Xóa thành công văn bản" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
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

        if (error.code === "EMPTY_MOUMOA_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        } else if (error.code === "MOUMOA_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        } else if (error.code === "EMPTY_MOUMOA_FILE_INPUT_ERROR") {
            console.log(error.code, "empty file input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        } else {
            return res.json({ error: true, message: "Something went wrong" })
        }

    }
    

})

module.exports = router