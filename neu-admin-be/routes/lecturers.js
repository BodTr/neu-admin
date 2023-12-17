const express = require('express')
const router = express.Router()
const LecturerSchema = require('../models/lecturer')
const { emptyLecturerInputsValidation, typeLecturerInputsValidation } = require('../helpers/input_validate_middleware')

const ObjectId = require("mongodb").ObjectId

router.get('/api/get-all-lecturers', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const lecturers = await LecturerSchema.find({
            program: { id: new ObjectId(id) },
            name: {$regex: query},
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await LecturerSchema.estimatedDocumentCount()
        let stt = 0
        const aLecturers = lecturers.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aLecturers, "aLecturers")
        res.json({ data: aLecturers, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-lecturer', emptyLecturerInputsValidation, typeLecturerInputsValidation, async (req, res) => {
    try {
        const { programId, name, nationality, unit, birthyear, level, experience } = req.body
        console.log(req.body, "req.body post api")
        const newLecturer = await LecturerSchema.create({
            name: name,
            nationality: nationality,
            unit: unit,
            birthyear: birthyear,
            level: level,
            experience: experience,
            program: {
                id: programId
            }
        })
        console.log(newLecturer, "newLecturer")
        res.json({ error: false, message: 'Lưu thành công thông tin giảng viên' })
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-lecturer/:id', emptyLecturerInputsValidation, typeLecturerInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, nationality, unit, birthyear, level, experience } = req.body
        console.log(id, "::put api id::")
        const updatingLecturer = {
            name: name,
            nationality: nationality,
            unit: unit,
            birthyear: birthyear,
            level: level,
            experience: experience,
        }
        console.log(req.body, "put api req.body")
        const updatedLecturer = await LecturerSchema.findOneAndUpdate({ _id: id }, updatingLecturer, {new: true})
        console.log(updatedLecturer, "updatedLecturer")
        res.json({ error: false, message: "Thông tin giảng viên đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-lecturer/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingLecturer = await LecturerSchema.findOneAndDelete({ _id: id })
        console.log(deletingLecturer, "deletingLecturer")
        res.json({ error: false, message: "Xóa thành công giangr viên" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_LECTURER_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "LECTURER_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router