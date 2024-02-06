const express = require('express')
const router = express.Router()
const DecisionSchema = require('../models/close_decision')
const { emptyDecisionInputsValidation, typeDecisionInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { upload } = require('../helpers/multer_middleware')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)
router.get('/api/get-all-close-decisions', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const decisions = await DecisionSchema.find({
            program: { id: new ObjectId(id) },
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await DecisionSchema.estimatedDocumentCount()
        let stt = 0
        const aDecisions = decisions.map( doc => {
            stt++
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

router.post('/api/create-close-decision', upload.single("attachedDoc"), emptyDecisionInputsValidation, typeDecisionInputsValidation, async (req, res) => {
    try {
        const { programId, name, detail, number, signDate, expireIn } = req.body
        console.log(req.body, "req.body post api")
        
        const existedDecision = await DecisionSchema.findOne({ name: name })
        if (existedDecision) {
            res.json({ error: true, message: "Quyết định đã tồn tại" })
        } else {
            console.log(detail, number, signDate, expireIn, "abc")

            const attachedDoc = req.file
            console.log(attachedDoc, "attachedDoc, post api")
            const attachedDocLink = attachedDoc.location
            const attachedDocName = attachedDoc.originalname



            const newDecision = await DecisionSchema.create({
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
            })
            console.log(newDecision, "newDecision")
            res.json({ error: false, message: 'Lưu thành công chương trình' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-close-decision/:id',  upload.single("attachedDoc"),emptyDecisionInputsValidation, typeDecisionInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, detail, number, signDate, expireIn, attachedDocLink, attachedDocName} = req.body
        console.log(id, "::put api id::")
        const attachedDoc = req.file
        if(attachedDoc){
            console.log(attachedDoc, "attachedDoc, post api")
             attachedDocLink = attachedDoc.location
                attachedDocName = attachedDoc.originalname
        }


        const updatingDecision = {
            name: name,
            detail: detail,
            number: number,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
            signDate: signDate,
            expireIn: expireIn
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

router.delete('/api/delete-close-decision/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingDecision = await DecisionSchema.findOneAndDelete({ _id: id })
        console.log(deletingDecision, "deletingDecision")
        res.json({ error: false, message: "Xóa thành công quyết định" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_DECISION_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "DECISION_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router