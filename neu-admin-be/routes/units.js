const express = require('express')
const router = express.Router()
const UnitSchema = require('../models/unit')
const ProgramSchema = require('../models/program')
const ExcelJs = require("exceljs")
const { uploadToServer } = require('../helpers/multer_middleware')
const { emptyUnitInputsValidation, typeUnitInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)

router.get('/api/get-all-units', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const units = await UnitSchema.find({
            program: { id: new ObjectId(id) },
            unit: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await UnitSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aUnits = units.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aUnits, "aUnits")
        res.json({ data: aUnits, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-unit', async (req, res) => {
    try {
        const { programId, unit } = req.body
        console.log(req.body, "req.body post api")
        
        const existedUnit = await UnitSchema.findOne({ unit: unit })
        if (existedUnit) {
            res.json({ error: true, message: "Văn bản đã tồn tại" })
        } else {
            const newUnit = await UnitSchema.create({
                unit,
                program: {
                    id: programId
                }
            })
            console.log(newUnit, "newUnit")
            res.json({ error: false, message: 'Lưu thành công thông tin đơn vị' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-unit/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { unit } = req.body
        console.log(id, "::put api id::")
        const updatingUnit = {
            unit: unit
        }
        console.log(req.body, "put api req.body")
        const updatedUnit = await UnitSchema.findOneAndUpdate({ _id: id }, updatingUnit, {new: true})
        console.log(updatedUnit, "updatedUnit")
        res.json({ error: false, message: "Thông tin đơn vị đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-unit/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingUnit = await UnitSchema.findOneAndDelete({ _id: id })
        console.log(deletingUnit, "deletingUnit")
        res.json({ error: false, message: "Xóa thành công văn bản" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-units', async (req, res) => {
    try {
        const { id } = req.query
        const units = await UnitSchema.find({
            program: { id: new ObjectId(id)}
        }).lean()
        let stt = 0
        const aUnits = units.map(doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-documents")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("documents")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "TÊN ĐƠN VỊ", key:"unit", width: 30},
        ]
        aUnits.map (unit => {
            sheet.addRow({
                stt: unit.stt,
                unit: unit.unit
            })
        })
    await workbook.xlsx.writeFile(`public/Quản lý đơn vị công tác-${programName}.xlsx`)
    const excelFilePath = process.env.CND_EXCELFILE + `Quản lý đơn vị công tác-${programName}.xlsx`
    res.json({
        error: false,
        path: excelFilePath
    })
    } catch (error) {
        console.log(error, "/api/export-excel-units catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})
router.get('/api/get-units-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-quan-ly-don-vi-cong-tac.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-units-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-units-data', uploadToServer.single("units-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-units-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importUnitsArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            // console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importUnitsArr.push({
                    unit: row.values[2],

                    program: {
                        id: programId
                    }
                })
            }
            
        })
        console.log(importUnitsArr, "importUnitsArr /api/import-units-data")
        const savedImportUnits = await UnitSchema.insertMany(importUnitsArr)
        console.log(savedImportUnits, "savedImportUnits /api/import-units-data")
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

//         if (error.code === "EMPTY_UNIT_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
//         }
    
//         if (error.code === "UNIT_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
//         }
//     }
    

// })

module.exports = router