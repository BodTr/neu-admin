const express = require('express')
const router = express.Router()
const DocumentSchema = require('../models/document')
const { emptyDocumentInputsValidation, typeDocumentInputsValidation } = require('../helpers/input_validate_middleware')

const ObjectId = require("mongodb").ObjectId

router.get('/api/get-all-documents', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const documents = await DocumentSchema.find({
            program: { id: new ObjectId(id) }
            ,name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await DocumentSchema.estimatedDocumentCount()
        let stt = 0
        const aDocuments = documents.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aDocuments, "aDocuments")
        res.json({ data: aDocuments, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-document', emptyDocumentInputsValidation, typeDocumentInputsValidation, async (req, res) => {
    try {
        const { programId, name, content, effDate, expireIn } = req.body
        console.log(req.body, "req.body post api")
        
        const existedDocument = await DocumentSchema.findOne({ name: name })
        if (existedDocument) {
            res.json({ error: true, message: "Văn bản đã tồn tại" })
        } else {
            const newDocument = await DocumentSchema.create({
                name: name,
                content: content,
                effDate: effDate,
                expireIn: expireIn,
                program: {
                    id: programId
                }
            })
            console.log(newDocument, "newDocument")
            res.json({ error: false, message: 'Lưu thành công chương trình' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-document/:id', emptyDocumentInputsValidation, typeDocumentInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, content, effDate, expireIn } = req.body
        console.log(id, "::put api id::")
        const updatingDocument = {
            name: name,
            content: content,
            effDate: effDate,
            expireIn: expireIn
        }
        console.log(req.body, "put api req.body")
        const updatedDocument = await DocumentSchema.findOneAndUpdate({ _id: id }, updatingDocument, {new: true})
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
        const deletingDocument = await DocumentSchema.findOneAndDelete({ _id: id })
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