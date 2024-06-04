const express = require('express')
const router = express.Router()
const TransProgramSchema = require('../models/trans_program')
const ProgramSchema = require('../models/program')
const { emptyTransProgramInputsValidation, typeTransProgramInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ExcelJs = require("exceljs")
const { uploadToServer } = require('../helpers/multer_middleware')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)

router.get('/api/get-all-trans-programs', async (req, res) => {
    try {

        let { page, limit, query, id } = req.query

        let skip = (parseInt(page) - 1) * parseInt(limit)
        const programs = await TransProgramSchema.find({
            program: { id: new ObjectId(id) },
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await TransProgramSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
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

router.post('/api/create-trans-program', async (req, res) => {
    try {
        const { programId, name,name_en, degreeName, degreeType, issuedBy } = req.body
        console.log(req.body, "req.body post api")
        const existedProgram = await TransProgramSchema.findOne({ name: name })
        if (existedProgram) {
            res.json({ error: true, message: "Chương trình đã tồn tại" })
        } else {
            const newProgram = await TransProgramSchema.create({
                name: name,
                name_en: name_en,
                degreeName: degreeName,
                degreeType: degreeType,
                issuedBy: issuedBy,
                program: {
                    id: programId
                }
            })
            console.log(newProgram, "newProgram")
            res.json({ error: false, message: 'Lưu thành công thông tin chương trình' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-trans-program/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { name,name_en, degreeName, degreeType, issuedBy } = req.body
        console.log(id, "::put api id::")
        const updatingProgram = {
            name: name,
            name_en: name_en,
            degreeName: degreeName,
            degreeType: degreeType,
            issuedBy: issuedBy
        }
        console.log(req.body, "put api req.body")
        const updatedProgram = await TransProgramSchema.findOneAndUpdate({ _id: id }, updatingProgram, {new: true})
        console.log(updatedProgram, "updatedProgram")
        res.json({ error: false, message: "Thông tin chương trình đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-trans-program/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingProgram = await TransProgramSchema.findOneAndDelete({ _id: id })
        console.log(deletingProgram, "deletingProgram")
        res.json({ error: false, message: "Xóa thành công thông tin chương trình" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-trans-programs', async (req, res) => {
    try {
        
        const { id } = req.query // id: program id
        const programs = await TransProgramSchema.find({
            program: { id: new ObjectId(id) }
        }).lean()

        let stt = 0
        const aPrograms = programs.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aPrograms, "aPrograms /api/export-excel-trans-programs")
        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-trans-programs")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("trans-programs")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "TÊN TIẾNG VIỆT", key:"name", width: 60},
            {header: "TÊN TIẾNG ANH", key:"name_en", width: 60},
            {header: "TÊN THƯƠNG HIỆU", key:"degreeType", width: 20},
            {header: "TÊN VĂN BẰNG", key:"degreeName", width: 20},
            {header: "CẤP BỞI", key:"issuedBy", width: 20},
        ]
        aPrograms.map((program) => {
            sheet.addRow({
                stt: program.stt,
                name: program.name,
                name_en: program.name_en,
                degreeName: program.degreeName,
                degreeType: program.degreeType,
                issuedBy: program.issuedBy
            })
        })
        await workbook.xlsx.writeFile(`public/T.T chương trình liên kết-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `T.T chương trình liên kết-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-trans-programs catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-trans-programs-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-thong-tin-chuong-trinh-lien-ket.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        })
    } catch (error) {
        console.log(error, "/api/get-trans-programs-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-trans-programs-data', uploadToServer.single("trans-programs-import-file"), async (req, res) => {
    try {
        console.log(req.file, "req.file /api/import-trans-programs-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)
        // console.log(workbook, "workbook /api/import-trans-programs-data")
        let importTransProgArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            // console.log("Row " + rowNumber + " = " + typeof(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importTransProgArr.push({
                    name: row.values[2],
                    name_en: row.values[3],
                    degreeName: row.values[5],
                    degreeType: row.values[4],
                    issuedBy: row.values[6],
                    program: {
                        id: programId
                    }
                })
            }
            
        })
        // console.log(sheet, "sheet /api/import-trans-programs-data")
        console.log(importTransProgArr, "importTransProgArr /api/import-trans-programs-data")
        const savedImportTransProg = await TransProgramSchema.insertMany(importTransProgArr)
        console.log(savedImportTransProg, "savedImportTransProg /api/import-trans-programs-data")
        res.json({
            error: false,
            message: "import data thành công"
        })
    } catch (error) {
        console.log(error, "/api/import-trans-programs-data catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

// router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
//     if (error) {
//         console.log(error, "custom error handler")

//         if (error.code === "EMPTY_TRANS_PROGRAM_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
//         }
    
//         if (error.code === "TRANS_PROGRAM_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
//         }
//     }
    

// })

module.exports = router