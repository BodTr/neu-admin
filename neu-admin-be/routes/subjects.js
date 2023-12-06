const express = require('express')
const router = express.Router()
const SubjectSchema = require('../models/subject')
const { emptySubjectInputsValidation, typeSubjectInputsValidation } = require('../helpers/input_validate_middleware')

const ObjectId = require("mongodb").ObjectId

router.get('/api/get-all-subjects', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const subjects = await SubjectSchema.find({
            program: { id: new ObjectId(id) }
            ,name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await SubjectSchema.estimatedDocumentCount()
        let stt = 0
        const aSubjects = subjects.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aSubjects, "aSubjects")
        res.json({ data: aSubjects, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-subject', emptySubjectInputsValidation, typeSubjectInputsValidation, async (req, res) => {
    try {
        const { programId, name, lecturer, teachingAssistant, executionTime, year, creditsCount, note, studentsCount } = req.body
        console.log(req.body, "req.body post api")
        
        const existedSubject = await SubjectSchema.findOne({ name: name })
        if (existedSubject) {
            res.json({ error: true, message: "Môn học đã tồn tại" })
        } else {
            const newSubject = await SubjectSchema.create({
                name: name,
                lecturer: lecturer,
                teachingAssistant: teachingAssistant,
                executionTime: executionTime,
                year: year,
                creditsCount: creditsCount,
                studentsCount: studentsCount,
                note: note,
                program: {
                    id: programId
                }
            })
            console.log(newSubject, "newSubject")
            res.json({ error: false, message: 'Lưu thành công môn học' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-subject/:id', emptySubjectInputsValidation, typeSubjectInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, lecturer, teachingAssistant, executionTime, year, creditsCount, note, studentsCount } = req.body
        console.log(id, "::put api id::")
        const updatingSubject = {
            name: name,
            lecturer: lecturer,
            teachingAssistant: teachingAssistant,
            executionTime: executionTime,
            year: year,
            creditsCount: creditsCount,
            studentsCount: studentsCount,
            note: note,
        }
        console.log(req.body, "put api req.body")
        const updatedSubject = await SubjectSchema.findOneAndUpdate({ _id: id }, updatingSubject, {new: true})
        console.log(updatedSubject, "updatedSubject")
        res.json({ error: false, message: "Môn học đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-subject/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingSubject = await SubjectSchema.findOneAndDelete({ _id: id })
        console.log(deletingSubject, "deletingSubject")
        res.json({ error: false, message: "Xóa thành công văn bản" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_SUBJECT_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "SUBJECT_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router