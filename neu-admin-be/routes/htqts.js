// hợp tác quốc tế
const express = require('express')
const router = express.Router()
const HTQTSchema = require('../models/htqt')
const { emptyHTQTInputsValidation, typeHTQTInputsValidation, emptyFileHTQTInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initHTQTDocMiddleware } = require('../helpers/init_doc')
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

router.post('/api/create-htqt', initHTQTDocMiddleware, upload.single("attachedHTQTDoc"), emptyFileHTQTInputValidation, emptyHTQTInputsValidation, typeHTQTInputsValidation, async (req, res, next) => {
    try {
        const { nation, partnerUni, funding, planDetail, signingTime, expireTime, note  } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file post api")
        const htqtId = req.payload
        const attachedDoc = req.file
        console.log(attachedDoc, "attachedDoc, post api")
        const attachedDocLink = attachedDoc.location
        const attachedDocName = attachedDoc.originalname
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
        res.json({ error: false, message: 'Lưu thành công chương trình' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        // res.json({ error: true, message: "something went wrong" })
        next(error)
    }
})

router.put('/api/edit-htqt/:id', upload.single("attachedHTQTDoc1"), emptyHTQTInputsValidation, typeHTQTInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { nation, partnerUni, funding, planDetail, signingTime, expireTime, note, attachedDocLink, attachedDocName } = req.body
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
        const delHtqtKey = delHtqt.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(delHtqtKey, "delHtqtKey delete api")
        const newDeleteCommand = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${delHtqtKey}`
        })
        const result = await s3.send(newDeleteCommand)
        console.log(result, ":::result, delete api:::")
        const deletingHtqt = await HTQTSchema.findOneAndDelete({ _id: id })
        console.log(deletingHtqt, "deletingHtqt")
        res.json({ error: false, message: "Xóa thành công" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
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

        if (error.code === "EMPTY_HTQT_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        } else if (error.code === "HTQT_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        } else if (error.code === "EMPTY_HTQT_FILE_INPUT_ERROR") {
            console.log(error.code, "empty file input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        } else {
            return res.json({ error: true, message: "Something went wrong" })
        }

    }
    

})

module.exports = router