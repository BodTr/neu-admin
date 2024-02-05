const express = require('express')
const router = express.Router()
const ProgramSchema = require('../models/program')
const { emptyProgramInputsValidation, typeProgramInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)

router.get('/api/get-all-programs', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const programs = await ProgramSchema.find({
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await ProgramSchema.estimatedDocumentCount()
        let stt = 0
        const aPrograms = programs.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aPrograms, "aPrograms")
        res.json({ data: aPrograms, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-program', emptyProgramInputsValidation, typeProgramInputsValidation, async (req, res) => {
    try {
        const { name, year } = req.body
        console.log(req.body, "req.body post api")
        const existedProgram = await ProgramSchema.findOne({ name: name })
        if (existedProgram) {
            res.json({ error: true, message: "Chương trình đã tồn tại" })
        } else {
            const newProgram = await ProgramSchema.create({
                name: name,
                year: year
            })
            console.log(newProgram, "newProgram")
            res.json({ error: false, message: 'Lưu thành công chương trình' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-program/:id', emptyProgramInputsValidation, typeProgramInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, year } = req.body
        console.log(id, "::put api id::")
        const updatingProgram = {
            name: name,
            year: year
        }
        console.log(req.body, "put api req.body")
        const updatedProgram = await ProgramSchema.findOneAndUpdate({ _id: id }, updatingProgram, {new: true})
        console.log(updatedProgram, "updatedProgram")
        res.json({ error: false, message: "Chương trình đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-program/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingProgram = await ProgramSchema.findOneAndDelete({ _id: id })
        console.log(deletingProgram, "deletingProgram")
        res.json({ error: false, message: "Xóa thành công chương trình" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_PROGRAM_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "PROGRAM_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router