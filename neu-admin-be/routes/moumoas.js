const express = require('express')
const router = express.Router()
const MoumoaSchema = require('../models/moumoa')
const { emptyMoumoaInputsValidation, typeMoumoaInputsValidation, emptyFileMoumoaInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectsCommand } = require('@aws-sdk/client-s3')
const { initMoumoaDocMiddleware } = require('../helpers/init_doc')
const { upload } = require('../helpers/multer_middleware')


const ObjectId = require("mongodb").ObjectId

router.get('/api/get-all-moumoas', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const moumoas = await MoumoaSchema.find({
            program: { id: new ObjectId(id) }
            ,name: {$regex: query}
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

router.post('/api/create-moumoa', initMoumoaDocMiddleware, upload.single("attachedDoc"), emptyFileMoumoaInputValidation, emptyMoumoaInputsValidation, typeMoumoaInputsValidation, async (req, res) => {
    try {
        const { programId, nation, partnerUni, docType, docDetail, signingTime, expireTime, note  } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file post api")
        const moumoaId = req.payload
        const { attachedDoc } = req.file
        const attachedDocLink = attachedDoc.location
        const newMoumoa = {
            nation: nation,
            partnerUni: partnerUni,
            docType: docType,
            docDetail: docDetail,
            attachedDocLink: attachedDocLink,
            signingTime: signingTime,
            expireTime: expireTime,
            note: note,
            program: {
                id: programId
            }
        }
        const storingMoumoa = await MoumoaSchema.findOneAndUpdate({ _id: moumoaId }, newMoumoa, {new: true})
        console.log(storingMoumoa, "storingMoumoa")
        res.json({ error: false, message: 'Lưu thành công chương trình' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-document/:id', upload.single("attachedDoc1"), emptyMoumoaInputsValidation, typeMoumoaInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { nation, partnerUni, docType, docDetail, signingTime, expireTime, note, attachedDocLink, attachedDocName } = req.body
        const { attachedDoc1 } = req.file
        console.log(req.file, "req.file put api")
        console.log(req.body, "req.body put api")
        

        console.log(id, "::put api id::")
        const updatingDocument = {
            nation: nation,
            partnerUni: partnerUni,
            docType: docType,
            docDetail: docDetail,
            signingTime: signingTime,
            expireTime: expireTime,
            note: note
        }
        console.log(req.body, "put api req.body")
        const updatedDocument = await MoumoaSchema.findOneAndUpdate({ _id: id }, updatingDocument, {new: true})
        console.log(updatedDocument, "updatedDocument")
        res.json({ error: false, message: "Văn bản đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-document/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingDocument = await MoumoaSchema.findOneAndDelete({ _id: id })
        console.log(deletingDocument, "deletingDocument")
        res.json({ error: false, message: "Xóa thành công văn bản" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_DOCUMENT_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "DOCUMENT_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router