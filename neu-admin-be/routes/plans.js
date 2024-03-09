const express = require('express')
const router = express.Router()
const PlanSchema = require('../models/plan')
const { emptyPlanlInputsValidation, typePlanInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)

router.get('/api/get-all-plans', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const plans = await PlanSchema.find({
            program: { id: new ObjectId(id) },
            certName: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await PlanSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aPlans = plans.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aPlans, "aPlans")
        res.json({ data: aPlans, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-plan', emptyPlanlInputsValidation, typePlanInputsValidation, async (req, res) => {
    try {
        const { programId, certName, qualifiedLecturer, qualifiedStudent, planStructure, tuition, infraCondition, language, ecoManage, report } = req.body
        console.log(req.body, "req.body post api")
        const newPLan = await PlanSchema.create({
            certName: certName,
            qualifiedLecturer: qualifiedLecturer,
            qualifiedStudent: qualifiedStudent,
            planStructure: planStructure,
            tuition: tuition,
            infraCondition: infraCondition,
            language: language,
            ecoManage: ecoManage,
            report: report,
            program: {
                id: programId
            }
        })
        console.log(newPLan, "newPLan")
        res.json({ error: false, message: 'Lưu thành công đề án' })
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-plan/:id', emptyPlanlInputsValidation, typePlanInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { certName, qualifiedLecturer, qualifiedStudent, planStructure, tuition, infraCondition, language, ecoManage, report  } = req.body
        console.log(id, "::put api id::")
        const updatingPlan = {
            certName: certName,
            qualifiedLecturer: qualifiedLecturer,
            qualifiedStudent: qualifiedStudent,
            planStructure: planStructure,
            tuition: tuition,
            infraCondition: infraCondition,
            language: language,
            ecoManage: ecoManage,
            report: report
        }
        console.log(req.body, "put api req.body")
        const updatedPlan = await PlanSchema.findOneAndUpdate({ _id: id }, updatingPlan, {new: true})
        console.log(updatedPlan, "updatedPlan")
        res.json({ error: false, message: "Mục tiêu đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-plan/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingPlan = await PlanSchema.findOneAndDelete({ _id: id })
        console.log(deletingPlan, "deletingPlan")
        res.json({ error: false, message: "Xóa thành công mục tiêu" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_PLAN_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "PLAN_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router