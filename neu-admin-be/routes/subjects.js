const express = require('express')
const router = express.Router()
const SubjectSchema = require('../models/subject')
const ProgramSchema = require('../models/program')
const ExcelJs = require("exceljs")
const { uploadToServer } = require('../helpers/multer_middleware')
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

router.get('/api/export-excel-subjects', async (req, res) => {
    try {
        const { id } = req.query
        const subjects = await SubjectSchema.find({
            program: { id: new ObjectId(id)}
        }).lean()
        let stt = 0
        const aSubjects = subjects.map(doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-subjects")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("documents")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "TÊN MÔN HỌC", key:"name", width: 10},
            {header: "NĂM HỌC", key:"year", width: 20},
            {header: "MÃ MÔN HỌC", key:"subjectCode", width: 15},
            {header: "GIẢNG VIÊN", key:"lecturer", width: 30},
            {header: "TRỢ GIẢNG", key:"teachingAssistant", width: 30},
            {header: "ĐIỀU TRA ĐÁNH GIÁ", key:"review", width: 20},
            {header: "THỜI GIAN HỌC-TỪ", key:"timeFrom", width: 20},
            {header: "THỜI GIAN HỌC-ĐẾN", key:"timeTo", width: 20},
        ]
        aSubjects.map(subject => {
            sheet.addRow({
                stt: subject.stt,
                name: subject.name,
                year: subject.year,
                subjectCode: subject.subjectCode,
                lecturer: subject.lecturer,
                teachingAssistant: subject.teachingAssistant,
                review: subject.review,
                timeFrom: subject.timeFrom,
                timeTo: subject.timeTo
            })
        })
        await workbook.xlsx.writeFile(`public/Quản lý môn học-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Quản lý môn học-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-subjects catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-subjects-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-quan-ly-mon-hoc.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-subjects-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-subjects-data', uploadToServer.single("subjects-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-subjects-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importSubjectsArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            // console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importSubjectsArr.push({
                    name: row.values[2],
                    year: row.values[3],
                    subjectCode: row.values[4],
                    lecturer: row.values[5],
                    teachingAssistant: row.values[6],
                    review: row.values[7],
                    timeFrom: row.values[8],
                    timeTo: row.values[9],
                    program: {
                        id: programId
                    }
                })
            }
            
        })
        console.log(importSubjectsArr, "importSubjectsArr /api/import-subjects-data")
        const savedImportSubjects = await SubjectSchema.insertMany(importSubjectsArr)
        console.log(savedImportSubjects, "savedImportSubjects /api/import-subjects-data")
        res.json({
            error: false,
            message: "import data thành công"
        })
    } catch (error) {
        console.log(error, "/api/import-decisions-data catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
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