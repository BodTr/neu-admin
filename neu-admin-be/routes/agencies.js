const express = require('express')
const router = express.Router()
const AgencySchema = require('../models/agency')
const ProgramSchema = require('../models/program')
const ExcelJs = require("exceljs")
const { emptyAgencyInputsValidation, typeAgencyInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')

const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)

router.get('/api/get-all-agencies', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const agencies = await AgencySchema.find({
            program: { id: new ObjectId(id) },
            unit: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await AgencySchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aAgencies = agencies.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aAgencies, "aAgencies")
        res.json({ data: aAgencies, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-agency', async (req, res) => {
    try {
        const { programId, unit, progLeaderName, progLeaderPosition, progLeaderPhoneNumber, progLeaderEmail, progLeaderUnit, progManagementName, progManagementPosition, progManagementPhoneNumber, progManagementEmail, progManagementUnit, coordinatorName, coordinatorPosition, coordinatorPhoneNumber, coordinatorEmail, coordinatorUnit } = req.body;

        console.log(req.body, "req.body post api")
        
        const existedAgency = await AgencySchema.findOne({ unit: unit })
        if (existedAgency) {
            res.json({ error: true, message: "Đơn vị đã tồn tại" })
        } else {

            const newAgency = await AgencySchema.create({
                unit: unit,

                progLeaderName: progLeaderName,
                progLeaderPosition: progLeaderPosition,
                progLeaderPhoneNumber: progLeaderPhoneNumber,
                progLeaderEmail: progLeaderEmail,
                progLeaderUnit: progLeaderUnit,

                progManagementName: progManagementName,
                progManagementPosition: progManagementPosition,
                progManagementPhoneNumber: progManagementPhoneNumber,
                progManagementEmail: progManagementEmail,
                progManagementUnit: progManagementUnit,

                coordinatorName: coordinatorName,
                coordinatorPosition: coordinatorPosition,
                coordinatorPhoneNumber: coordinatorPhoneNumber,
                coordinatorEmail: coordinatorEmail,
                coordinatorUnit: coordinatorUnit,

                program: {
                    id: programId
                }
            })
            console.log(newAgency, "newAgency")
            res.json({ error: false, message: 'Lưu thành công đơn vị' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-agency/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { unit, progLeaderName, progLeaderPosition, progLeaderPhoneNumber, progLeaderEmail, progLeaderUnit, progManagementName, progManagementPosition, progManagementPhoneNumber, progManagementEmail, progManagementUnit, coordinatorName, coordinatorPosition, coordinatorPhoneNumber, coordinatorEmail, coordinatorUnit } = req.body;
        console.log(id, "::put api id::")
        const updatingAgency = {
            unit: unit,

            progLeaderName: progLeaderName,
            progLeaderPosition: progLeaderPosition,
            progLeaderPhoneNumber: progLeaderPhoneNumber,
            progLeaderEmail: progLeaderEmail,
            progLeaderUnit: progLeaderUnit,

            progManagementName: progManagementName,
            progManagementPosition: progManagementPosition,
            progManagementPhoneNumber: progManagementPhoneNumber,
            progManagementEmail: progManagementEmail,
            progManagementUnit: progManagementUnit,

            coordinatorName: coordinatorName,
            coordinatorPosition: coordinatorPosition,
            coordinatorPhoneNumber: coordinatorPhoneNumber,
            coordinatorEmail: coordinatorEmail,
            coordinatorUnit: coordinatorUnit,
        }
        console.log(req.body, "put api req.body")
        const updatedAgency = await AgencySchema.findOneAndUpdate({ _id: id }, updatingAgency, {new: true})
        console.log(updatedAgency, "updatedAgency")
        res.json({ error: false, message: "Đơn vị đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-agency/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingAgency = await AgencySchema.findOneAndDelete({ _id: id })
        console.log(deletingAgency, "deletingAgency")
        res.json({ error: false, message: "Xóa thành công đơn vị" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-agencies', async (req, res) => {
    try {
        const { id } = req.query // id: program id
        const agencies = await AgencySchema.find({ 
            program: { id: new ObjectId(id) }
        }).lean()
        let stt = 0
        const aAgencies = agencies.map( doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aAgencies, "aAgencies /api/export-excel-agencies")
        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-trans-programs")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("agencies")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "ĐƠN VỊ THỰC HIỆN", key:"unit", width: 40},
            {header: "HỌ TÊN LÃNH ĐẠO PHỤ TRÁCH CHƯƠNG TRÌNH", key:"progLeaderName", width: 40},
            {header: "CHỨC VỤ LÃNH ĐẠO PHỤ TRÁCH CHƯƠNG TRÌNH", key:"progLeaderPosition", width: 40},
            {header: "SĐT LÃNH ĐẠO PHỤ TRÁCH CHƯƠNG TRÌNH", key:"progLeaderPhoneNumber", width: 30},
            {header: "EMAIL LÃNH ĐẠO PHỤ TRÁCH CHƯƠNG TRÌNH", key:"progLeaderEmail", width: 30},
            {header: "ĐƠN VỊ LÃNH ĐẠO PHỤ TRACH CHƯƠNG TRÌNH", key:"progLeaderUnit", width: 30},
            {header: "HỌ TÊN CHỦ NHIỆM CHƯƠNG TRÌNH", key:"progManagementName", width: 40},
            {header: "CHỨC VỤ CHỦ NHIỆM CHƯƠNG TRÌNH", key:"progManagementPosition", width: 20},
            {header: "SĐT CHỦ NHIỆM CHƯƠNG TRÌNH", key:"progManagementPhoneNumber", width: 20},
            {header: "EMAIL CHỦ NHIỆM CHƯƠNG TRÌNH", key:"progManagementEmail", width: 30},
            {header: "ĐƠN VỊ CHỦ NHIỆM CHƯƠNG TRÌNH", key:"progManagementUnit", width: 40},
            {header: "HỌ TÊN ĐIỀU PHỐI VIÊN", key:"coordinatorName", width: 30},
            {header: "CHỨC VỤ ĐIỀU PHỐI VIÊN", key:"coordinatorPosition", width: 30},
            {header: "SĐT ĐIỀU PHỐI VIÊN", key:"coordinatorPhoneNumber", width: 30},
            {header: "EMAIL ĐIỀU PHỐI VIÊN", key:"coordinatorEmail", width: 20},
            {header: "ĐƠN VỊ ĐIỀU PHỐI VIÊN", key:"coordinatorUnit", width: 10},
        ]

        aAgencies.map((agency) => {
            sheet.addRow ({
                stt: agency.stt,
                unit: agency.unit,
                progLeaderName: agency.progLeaderName,
                progLeaderPosition: agency.progLeaderPosition,
                progLeaderPhoneNumber: agency.progLeaderPhoneNumber,
                progLeaderEmail: agency.progLeaderEmail,
                progLeaderUnit: agency.progLeaderUnit,
                progManagementName: agency.progManagementName,
                progManagementPosition: agency.progManagementPosition,
                progManagementPhoneNumber: agency.progManagementPhoneNumber,
                progManagementEmail: agency.progManagementEmail,
                progManagementUnit: agency.progManagementUnit,
                coordinatorName: agency.coordinatorName,
                coordinatorPosition: agency.coordinatorPosition,
                coordinatorPhoneNumber: agency.coordinatorPhoneNumber,
                coordinatorEmail: agency.coordinatorEmail,
                coordinatorUnit: agency.coordinatorUnit,

            })
        })
        await workbook.xlsx.writeFile(`public/T.T Đơn vị thực hiện-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `T.T Đơn vị thực hiện-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "error /api/export-excel-agencies")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

// router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
//     if (error) {
//         console.log(error, "custom error handler")

//         if (error.code === "EMPTY_AGENCY_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
//         }
    
//         if (error.code === "AGENCY_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
//         }
//     }
    

// })

module.exports = router