const express = require('express')
const router = express.Router()
const StudentSchema = require('../models/student')
const { emptyStudentInputsValidation, typeStudentInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')

const ObjectId = require("mongodb").ObjectId



router.use(authenticateAccessToken)
router.get('/api/get-all-students', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const students = await StudentSchema.find({
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await StudentSchema.estimatedDocumentCount()
        let stt = 0
        const aStudents = students.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aStudents, "aStudents")
        res.json({ data: aStudents, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-student', emptyStudentInputsValidation, typeStudentInputsValidation, async (req, res, next) => {
    try {
        const { name, studentCode, birthday, sex, nation, schoolYear, tempResidence, dien, major, courseDuration, monthCount, bgdReceiveNumber, bgdReceiveDate, neuReceiveNumber, neuReceiveDate, expenses, shp, kpck, nationalDayExpenses, tetVnExpenses, tetLaoCamExpenses, travelExpenses, initExpenses} = req.body;
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")

        const newStudent = await StudentSchema.create({
            name: name,
            studentCode: studentCode,
            birthday: birthday,
            sex: sex,
            nation: nation,
            schoolYear: schoolYear,
            tempResidence: tempResidence,
            dien: dien,
            major: major,
            courseDuration: courseDuration,
            monthCount: monthCount,
            bgdReceiveNumber: bgdReceiveNumber,
            bgdReceiveDate: bgdReceiveDate,
            neuReceiveNumber: neuReceiveNumber,
            neuReceiveDate: neuReceiveDate,
            expenses: expenses,
            shp: shp,
            kpck: kpck,
            nationalDayExpenses: nationalDayExpenses,
            tetVnExpenses: tetVnExpenses,
            tetLaoCamExpenses: tetLaoCamExpenses,
            travelExpenses: travelExpenses,
            initExpenses: initExpenses,
        })

        console.log(newStudent, "newStudent post api")
        res.json({ error: false, message: 'Lưu thành công' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        // res.json({ error: true, message: "something went wrong" })
        next(error)
    }
})

router.put('/api/edit-student/:id', emptyStudentInputsValidation, typeStudentInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, studentCode, birthday, sex, nation, schoolYear, tempResidence, dien, major, courseDuration, monthCount, bgdReceiveNumber, bgdReceiveDate, neuReceiveNumber, neuReceiveDate, expenses, shp, kpck, nationalDayExpenses, tetVnExpenses, tetLaoCamExpenses, travelExpenses, initExpenses} = req.body;
        console.log(req.body, "req.body put api")
        const updatingStudent = ({
            name: name,
            studentCode: studentCode,
            birthday: birthday,
            sex: sex,
            nation: nation,
            schoolYear: schoolYear,
            tempResidence: tempResidence,
            dien: dien,
            major: major,
            courseDuration: courseDuration,
            monthCount: monthCount,
            bgdReceiveNumber: bgdReceiveNumber,
            bgdReceiveDate: bgdReceiveDate,
            neuReceiveNumber: neuReceiveNumber,
            neuReceiveDate: neuReceiveDate,
            expenses: expenses,
            shp: shp,
            kpck: kpck,
            nationalDayExpenses: nationalDayExpenses,
            tetVnExpenses: tetVnExpenses,
            tetLaoCamExpenses: tetLaoCamExpenses,
            travelExpenses: travelExpenses,
            initExpenses: initExpenses,
        })
        const updatedStudent = await StudentSchema.findOneAndUpdate({ _id: id }, updatingStudent, {new: true})
        console.log(updatedStudent, "updatedStudent put api")
        res.json({ error: false, message: "Thông tin học sinh sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-student/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingStudent = await StudentSchema.findOneAndDelete({ _id: id })
        console.log(deletingStudent, "deletingStudent")
        res.json({ error: false, message: "Xóa thành công thông tin học sinh" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})


router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_STUDENT_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        } else if (error.code === "STUDENT_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        } else {
            return res.json({ error: true, message: "Something went wrong" })
        }

    }
    

})

module.exports = router