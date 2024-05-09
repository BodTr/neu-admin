const express = require('express')
const router = express.Router()
const SubjectSchema = require('../models/subject')
const { emptySubjectInputsValidation, typeSubjectInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)

router.get('/api/get-all-subjects', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        let filter = {program: { id: new ObjectId(id) }}
        if (query) {
            filter = {
                year: { $eq: query },
                program: { id: new ObjectId(id) }
            }
        }
        const subjects = await SubjectSchema.find(filter).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await SubjectSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aSubjects = subjects.map( doc => {
            stt++
            let timeFrom = doc.timeFrom
            let timeTo = doc.timeTo
            let a_timeTo = timeTo.split("-")
            let a_timeFrom = timeFrom.split("-")
            doc.timeFrom = a_timeFrom[2] + "/" + a_timeFrom[1] + "/" + a_timeFrom[0]
            doc.timeTo = a_timeTo[2] + "/" + a_timeTo[1] + "/" + a_timeTo[0]
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

router.post('/api/create-subject', async (req, res) => {
    try {
        const { name, lecturer, teachingAssistant, timeFrom, timeTo, year, subjectCode, review, programId } = req.body;
        console.log(req.body, "req.body post api")
        
        const existedSubject = await SubjectSchema.findOne({ name: name })
        if (existedSubject) {
            res.json({ error: true, message: "Môn học đã tồn tại" })
        } else {
            const newSubject = await SubjectSchema.create({
                name: name,
                lecturer: lecturer,
                teachingAssistant: teachingAssistant,
                timeFrom: timeFrom,
                timeTo: timeTo,
                year: year,
                subjectCode: subjectCode,
                review: review,
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

router.put('/api/edit-subject/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { name, lecturer, teachingAssistant, timeFrom, timeTo, year, subjectCode, review } = req.body;
        console.log(id, "::put api id::")
        const updatingSubject = {
            name: name,
            lecturer: lecturer,
            teachingAssistant: teachingAssistant,
            timeFrom: timeFrom,
            timeTo: timeTo,
            year: year,
            subjectCode: subjectCode,
            review: review,
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
        res.json({ error: false, message: "Xóa thành công môn học" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

// router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
//     if (error) {
//         console.log(error, "custom error handler")

//         if (error.code === "EMPTY_SUBJECT_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
//         }
    
//         if (error.code === "SUBJECT_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
//         }
//     }
    

// })

module.exports = router