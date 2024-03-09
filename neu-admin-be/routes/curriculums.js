const express = require('express')
const router = express.Router()
const CurriculumSchema = require('../models/curriculum')
const { emptyCurriculumInputsValidation, typeCurriculumInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)
router.get('/api/get-all-curriculums', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const curriculums = await CurriculumSchema.find({
            program: { id: new ObjectId(id) },
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await CurriculumSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aCurriculums = curriculums.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aCurriculums, "aCurriculums")
        res.json({ data: aCurriculums, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-curriculum', emptyCurriculumInputsValidation, typeCurriculumInputsValidation, async (req, res) => {
    try {
        const { programId, name, year, location, subjectType, creditsCount, trainingUni } = req.body
        console.log(req.body, "req.body post api")
        
        const existedCurriculum = await CurriculumSchema.findOne({ name: name })
        if (existedCurriculum) {
            res.json({ error: true, message: "Văn bản đã tồn tại" })
        } else {
            const newCurriculum = await CurriculumSchema.create({
                name: name,
                year: year,
                location: location,
                subjectType: subjectType,
                creditsCount: creditsCount,
                trainingUni: trainingUni,
                program: {
                    id: programId
                }
            })
            console.log(newCurriculum, "newCurriculum")
            res.json({ error: false, message: 'Lưu thành công chương trình' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-curriculum/:id', emptyCurriculumInputsValidation, typeCurriculumInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, content, effDate, expireIn } = req.body
        console.log(id, "::put api id::")
        const updatingCurriculum = {
            name: name,
            content: content,
            effDate: effDate,
            expireIn: expireIn
        }
        console.log(req.body, "put api req.body")
        const updatedCurriculum = await CurriculumSchema.findOneAndUpdate({ _id: id }, updatingCurriculum, {new: true})
        console.log(updatedCurriculum, "updatedCurriculum")
        res.json({ error: false, message: "Văn bản đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-curriculum/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingCurriculum = await CurriculumSchema.findOneAndDelete({ _id: id })
        console.log(deletingCurriculum, "deletingCurriculum")
        res.json({ error: false, message: "Xóa thành công văn bản" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_CURRICULUM_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "CURRICULUM_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router