const express = require('express')
const router = express.Router()
const AgencySchema = require('../models/agency')
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

router.post('/api/create-agency', emptyAgencyInputsValidation, typeAgencyInputsValidation, async (req, res) => {
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

router.put('/api/edit-agency/:id', emptyAgencyInputsValidation, typeAgencyInputsValidation, async(req, res) => {
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

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_AGENCY_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "AGENCY_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router