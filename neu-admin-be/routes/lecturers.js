const express = require('express')
const router = express.Router()
const LecturerSchema = require('../models/lecturer')
const ProgramSchema = require('../models/program')
const ExcelJs = require("exceljs")
const { emptyLecturerInputsValidation, typeLecturerInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const lecturer = require('../models/lecturer')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)

router.get('/api/get-all-lecturers', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        let filter = {program: { id: new ObjectId(id) }}
        if (query) {
            filter = {
                birthyear: { $eq: query },
                program: { id: new ObjectId(id) }
            }
        }
        const lecturers = await LecturerSchema.find(filter).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await LecturerSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
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

router.post('/api/create-lecturer', async (req, res) => {
    try {
        const { programId, name, nationality, unit, birthyear, contractStatus, level, subject } = req.body;
        console.log(req.body, "req.body post api")
        const newLecturer = await LecturerSchema.create({
            name: name,
            nationality: nationality,
            unit: unit,
            birthyear: birthyear,
            contractStatus: contractStatus,
            level: level,
            subject: subject,
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

router.put('/api/edit-lecturer/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { name, nationality, unit, birthyear, contractStatus, level, subject } = req.body;
        console.log(id, "::put api id::")
        const updatingLecturer = {
            name: name,
            nationality: nationality,
            unit: unit,
            birthyear: birthyear,
            contractStatus: contractStatus,
            level: level,
            subject: subject,
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
        res.json({ error: false, message: "Xóa thành công giảng viên" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-lecturers', async (req, res) => {
    try {
        const { id } = req.query
        const lecturers = await LecturerSchema.find({
            program: { id: new ObjectId(id)}
        }).lean()
        let stt = 0
        const aLecturers = lecturers.map( doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-lecturers")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("documents")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "HỌ TÊN GIẢNG VIÊN", key:"name", width: 20},
            {header: "NĂM SINH", key:"birthyear", width: 10},
            {header: "QUỐC TỊCH", key:"nationality", width: 20},
            {header: "ĐƠN VỊ CÔNG TÁC", key:"unit", width: 30},
            {header: "TÌNH TRẠNG HỢP ĐỒNG", key:"contractStatus", width: 20},
            {header: "TRÌNH ĐỘ", key:"level", width: 25},
            {header: "TÊN MÔN HỌC GIẢNG DẠY", key:"subject", width: 10},
        ]
        aLecturers.map( lecturer => {
            sheet.addRow({
                stt: lecturer.stt,
                name: lecturer.name,
                birthyear: lecturer.birthyear,
                nationality: lecturer.nationality,
                unit: lecturer.unit,
                contractStatus: lecturer.contractStatus,
                level: lecturer.level,
                subject: lecturer.subject
            })
        })
        await workbook.xlsx.writeFile(`public/Quản lý giảng viên-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Quản lý giảng viên-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-lecturers catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

// router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
//     if (error) {
//         console.log(error, "custom error handler")

//         if (error.code === "EMPTY_LECTURER_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
//         }
    
//         if (error.code === "LECTURER_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
//         }
//     }
    

// })

module.exports = router