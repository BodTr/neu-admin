const express = require('express')
const router = express.Router()
const UnitSchema = require('../models/unit')
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
        let count = await UnitSchema.estimatedDocumentCount()
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

router.post('/api/create-unit', emptyUnitInputsValidation, typeUnitInputsValidation, async (req, res) => {
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

router.put('/api/edit-unit/:id', emptyUnitInputsValidation, typeUnitInputsValidation, async(req, res) => {
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

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_UNIT_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "UNIT_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router