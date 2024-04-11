const express = require('express')
const router = express.Router()
const ProcessSchema = require('../models/edu_quality_process')
const { emptyProcessInputsValidation, typeProcessInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)
router.get('/api/get-all-processes', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const processes = await ProcessSchema.find({
            program: { id: new ObjectId(id) }
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await ProcessSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aProcesses = processes.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aProcesses, "aProcesses")
        res.json({ data: aProcesses, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-process', emptyProcessInputsValidation, typeProcessInputsValidation, async (req, res) => {
    try {
        const { evaluationForm, evaluateProgramQuality, processes, programId } = req.body;
        console.log(req.body, "req.body post api")

        const newProcess = await ProcessSchema.create({
            evaluationForm: evaluationForm,
            evaluateProgramQuality: evaluateProgramQuality,
            processes: processes,
            program: {
                id: programId
            }
        })
        console.log(newProcess, "newProcess")
        res.json({ error: false, message: 'Lưu thành công quy trình' })
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-process/:id', emptyProcessInputsValidation, typeProcessInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { evaluationForm, evaluateProgramQuality, processes, } = req.body
        console.log(id, "::put api id::")
        
        const updatingProcess = {
            evaluationForm: evaluationForm,
            evaluateProgramQuality: evaluateProgramQuality,
            processes: processes,
        }
        console.log(req.body, "put api req.body")
        const updatedProcess = await ProcessSchema.findOneAndUpdate({ _id: id }, updatingProcess, {new: true})
        console.log(updatedProcess, "updatedProcess")
        res.json({ error: false, message: "Quy trình đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-process/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingProcess = await ProcessSchema.findOneAndDelete({ _id: id })
        console.log(deletingProcess, "deletingProcess")
        res.json({ error: false, message: "Xóa thành công mục tiêu" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_PROCESS_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "PROCESS_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router