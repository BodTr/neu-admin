const express = require('express')
const router = express.Router()
const GoalSchema = require('../models/goal')
const ProgramSchema = require('../models/program')
const ExcelJs = require("exceljs")
const { emptyGoalInputsValidation, typeGoalInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)

router.get('/api/get-all-goals', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const goals = await GoalSchema.find({
            program: { id: new ObjectId(id) },
            goalFrom: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await GoalSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aGoals = goals.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aGoals, "aGoals")
        res.json({ data: aGoals, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-goal', async (req, res) => {
    try {
        const { programId, programGoal, testDetail, goalFrom } = req.body
        console.log(req.body, "req.body post api")
        const newGoal = await GoalSchema.create({
            programGoal: programGoal,
            testDetail: testDetail,
            goalFrom: goalFrom,
            program: {
                id: programId
            }
        })
        console.log(newGoal, "newGoal")
        res.json({ error: false, message: 'Lưu thành công mục tiêu' })
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-goal/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { programGoal, testDetail, goalFrom } = req.body
        console.log(id, "::put api id::")
        const updatingGoal = {
            programGoal: programGoal,
            testDetail: testDetail,
            goalFrom: goalFrom,
        }
        console.log(req.body, "put api req.body")
        const updatedGoal = await GoalSchema.findOneAndUpdate({ _id: id }, updatingGoal, {new: true})
        console.log(updatedGoal, "updatedGoal")
        res.json({ error: false, message: "Mục tiêu đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-goal/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingGoal = await GoalSchema.findOneAndDelete({ _id: id })
        console.log(deletingGoal, "deletingGoal")
        res.json({ error: false, message: "Xóa thành công mục tiêu" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-goals', async (req, res) => {
    try {
        const { id } = req.query
        const goals = await GoalSchema.find({
            program: { id: new ObjectId(id) }
        }).lean()
        let stt = 0
        const aGoals = goals.map(doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aGoals, "aGoals /api/export-excel-goals")
        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-goals")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("goals")
        sheet.columns = [
            {header: "STT", key: "stt", width: 10},
            {header: "NỘI DUNG MỤC TIÊU", key: "programGoal", width: 50},
            {header: "TỰ ĐÁNH GIÁ", key: "testDetail", width: 50},
            {header: "PHÂN LOẠI", key: "goalFrom", width: 20},
        ]
        aGoals.map((goal) => {
            sheet.addRow ({
                stt: goal.stt,
                programGoal: goal.programGoal,
                testDetail: goal.testDetail,
                goalFrom: goal.goalFrom,
            })
        })

        await workbook.xlsx.writeFile(`public/Mục tiêu chương trình-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Mục tiêu chương trình-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })

    } catch (error) {
        console.log(error, "error /api/export-excel-goals")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

// router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
//     if (error) {
//         console.log(error, "custom error handler")

//         if (error.code === "EMPTY_GOAL_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
//         }
    
//         if (error.code === "GOAL_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
//         }
//     }
    

// })

module.exports = router