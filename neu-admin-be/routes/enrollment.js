const express = require('express')
const router = express.Router()
const EnrollmentSchema = require('../models/enrollment')
const { emptyEnrollmentInputsValidation, typeEnrollmentInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)
router.get('/api/get-all-enrollments', async (req, res) => {
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
        const enrollments = await EnrollmentSchema.find(
            filter
            // year : { $eq: query }
            
        ).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await EnrollmentSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aEnrollments = enrollments.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aEnrollments, "aEnrollments")
        res.json({ data: aEnrollments, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-enrollment', emptyEnrollmentInputsValidation, typeEnrollmentInputsValidation, async (req, res) => {
    try {
        const { programId, year, enrollmentCount, admissionCount, transferStudents, graduatedCount, admittedStudents, applicantsCount, dropoutCount, reservedStudents, trainingStudents } = req.body;
        console.log(req.body, "req.body post api")
        
        const newEnrollment = await EnrollmentSchema.create({
            year: year,
            enrollmentCount: enrollmentCount,
            admissionCount: admissionCount,
            transferStudents: transferStudents,
            graduatedCount: graduatedCount,
            admittedStudents: admittedStudents,
            applicantsCount: applicantsCount,
            dropoutCount: dropoutCount,
            reservedStudents: reservedStudents,
            trainingStudents: trainingStudents,
            program: {
                id: programId
            }
        })
        console.log(newEnrollment, "newEnrollment")
        res.json({ error: false, message: 'Lưu thành công' })
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-enrollment/:id', emptyEnrollmentInputsValidation, typeEnrollmentInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { year, enrollmentCount, admissionCount, transferStudents, graduatedCount, admittedStudents, applicantsCount, dropoutCount, reservedStudents, trainingStudents } = req.body;
        console.log(id, "::put api id::")
        const updatingEnrollment = {
            year: year,
            enrollmentCount: enrollmentCount,
            admissionCount: admissionCount,
            transferStudents: transferStudents,
            graduatedCount: graduatedCount,
            admittedStudents: admittedStudents,
            applicantsCount: applicantsCount,
            dropoutCount: dropoutCount,
            reservedStudents: reservedStudents,
            trainingStudents: trainingStudents,
        }
        console.log(req.body, "put api req.body")
        const updatedEnrollment = await EnrollmentSchema.findOneAndUpdate({ _id: id }, updatingEnrollment, {new: true})
        console.log(updatedEnrollment, "updatedEnrollment")
        res.json({ error: false, message: "Văn bản đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-enrollment/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingEnrollment = await EnrollmentSchema.findOneAndDelete({ _id: id })
        console.log(deletingEnrollment, "deletingEnrollment")
        res.json({ error: false, message: "Xóa thành công văn bản" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_ENROLLMENT_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "ENROLLMENT_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router