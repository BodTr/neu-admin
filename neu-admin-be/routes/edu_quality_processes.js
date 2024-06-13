const express = require('express')
const router = express.Router()
const ProcessSchema = require('../models/edu_quality_process')
const ProgramSchema = require('../models/program')
const ExcelJs = require("exceljs")
const { uploadToServer } = require("../helpers/multer_middleware")
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

router.post('/api/create-process', async (req, res) => {
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

router.put('/api/edit-process/:id', async(req, res) => {
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

router.get('/api/export-excel-processes', async (req, res) => {
    try {
        const { id } = req.query // id: program id
        const processes = await ProcessSchema.find({
            program: { id: new ObjectId(id)}
        }).lean()
        let stt = 0
        const aProcesses = processes.map(doc => {

            stt++
            return {
                ...doc,
                stt: stt,
            }
        })

        let processDocsArrayLengthArray = []
        aProcesses.forEach(process => {
            let processArrayLength = process.processes.length
            processDocsArrayLengthArray.push(processArrayLength)
        })

        console.log(processDocsArrayLengthArray, "processDocsArrayLengthArray /api/export-excel-processes")

        const maxValue = Math.max(...processDocsArrayLengthArray)
        console.log(maxValue, "maxValue /api/export-excel-processes")
        let pushCol = []
        for (let i = 0; i < maxValue; i++) {
            pushCol.push(
                {
                    header: `QUY TRÌNH ${i + 1}`,
                    key: `processName${i + 1}`,
                    width: 40
                },
                {
                    header: `NỘI DUNG QUY TRÌNH ${i + 1}`,
                    key: `processDetail${i + 1}`,
                    width: 50
                }
            )
        }
        console.log(pushCol, "pushCol /api/export-excel-processes")
        const constCol = [
            {header: "STT", key:"stt", width: 10},
            {header: "HÌNH THỨC KIỂM TRA ĐÁNH GIÁ", key:"evaluationForm", width: 50},
            {header: "KHẢO SÁT ĐÁNH GIÁ CHẤT LƯỢNG CHƯƠNG TRÌNH", key:"evaluateProgramQuality", width: 50},
        ]

        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-processes")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("processes")
        sheet.columns = constCol.concat(pushCol)
        console.log(aProcesses, "aProcesses /api/export-excel-processes 3")
        aProcesses.map(process => {
            const processesArr= process.processes
            console.log(processesArr, "processesArr 2 /api/export-excel-processes")
            let addObj = {}
            if (processesArr.length === 0) {
                console.log("processesArr.length === 0")
                addObj = {}
            } else {
                console.log(processesArr, "processesArr 3 /api/export-excel-processes")
                addObj = processesArr.reduce((acc, process, i) => {
                    acc[`processName${i + 1}`] = process.processName;
                    acc[`processDetail${i + 1}`] = process.processDetail;
                    return acc;
                }, {})
                console.log(addObj, "addObj /api/export-excel-processes 1")
            }

            console.log(addObj, "addObj /api/export-excel-processes")
            const constObj = {
                stt: process.stt,
                evaluationForm: process.evaluationForm,
                evaluateProgramQuality: process.evaluateProgramQuality
            }
            const finalObj = { ...constObj, ...addObj }
            sheet.addRow(finalObj)
        })
        await workbook.xlsx.writeFile(`public/Đảm bảo chất lượng đào tạo-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Đảm bảo chất lượng đào tạo-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-processes catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-processes-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-thong-tin-doi-tac.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-processes-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-processes-data', uploadToServer.single("processes-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-processes-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importPartnerArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importPartnerArr.push({

                    program: {
                        id: programId
                    }
                })
            }
            
        })
        console.log(importPartnerArr, "importPartnerArr /api/import-processes-data")
        const savedImportProcesses = await ProcessSchema.insertMany(importPartnerArr)

        console.log(savedImportProcesses, "savedImportProcesses /api/import-processes-data")
        res.json({
            error: false,
            message: "import data thành công"
        })
    } catch (error) {
        console.log(error, "/api/import-processes-data catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

// router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
//     if (error) {
//         console.log(error, "custom error handler")

//         if (error.code === "EMPTY_PROCESS_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
//         }
    
//         if (error.code === "PROCESS_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
//         }
//     }
    

// })

module.exports = router