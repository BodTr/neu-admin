const express = require('express')
const router = express.Router()
const ProgramSchema = require('../models/program')
const YearSchema = require('../models/years')
const { emptyProgramInputsValidation, typeProgramInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

const initYearId = '65e968d440e62c9bf7a39996'

router.use(authenticateAccessToken)

router.get('/api/get-all-programs', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const programs = await ProgramSchema.find({
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await ProgramSchema.estimatedDocumentCount()
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

router.get('/api/get-years-array', async(req, res) => {
    try {
        
        const yearsArrDoc = await YearSchema.findOne({ _id: initYearId })
        console.log(yearsArrDoc, "yearsArrDoc, get-years-array api")
        const yearsArr = yearsArrDoc.yearsArray
        console.log(yearsArr, "yearsArr, get-years-array api")
        const filteredYearsArr = yearsArr.filter((year, index) => {
            if(yearsArr.indexOf(year) === index) {
                return year
            } // lấy những phần tử có giá trị year đầu tiên
            
        })
        console.log(filteredYearsArr, "filteredYearsArr, get-years-array api")
        const orderedYearsArr = filteredYearsArr.sort((a, b) => {
            return a - b
        })
        console.log(orderedYearsArr, "orderedYearsArr, get-years-array api")
        res.json({error: false, data: orderedYearsArr})
    } catch (error) {
        console.log(error, "get get-years-array api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

// api lấy những chương trình chưa gán vs ng dùng nào

router.get('/api/get-programs-by-year', async(req, res) => {
    try {
        console.log(req.query, "req.query, get-programs-by-year api")
        const year = req.query.year
        console.log(year, "year get-programs-by-year api")
        const programsZeroUser = await ProgramSchema.find({ user: { id: new ObjectId('111111111111111111111111') } }).lean() // những chương trình chưa liên kết với người dùng nào
        console.log(programsZeroUser, "programsZeroUser get-programs-by-year api")
        const programsZeroUserFilterByYear = programsZeroUser.filter((prog) => {
            console.log(prog.year.toString() === year, "filter function get-programs-by-year api")
            if (prog.year.toString() === year) {
                return prog
            }

        })
        console.log(programsZeroUserFilterByYear, "programsZeroUserFilterByYear get-programs-by-year api")
        res.json({ error: false, programsZeroUserFilterByYear })
    } catch (error) {
        console.log(error, "get-programs-by-year catch block api")
    }
})

// api kiểm tra người dùng đã được gắn với chương trình nào chưa

router.get('/api/check-user-has-program-or-not', async(req, res) => {
    try {
        const { id } = req.payload // từ authenticateAccessToken()
        const attachedPrograms = await ProgramSchema.find({ user: { id: new ObjectId(id) } }).lean()
        console.log(attachedPrograms, "attachedPrograms get-attached-programs api")
        let hasProgram = null
        if (attachedPrograms.length == 0) {
            hasProgram = false
        } else {
            hasProgram = true
        }
        res.json({ error: false, hasProgram })
    } catch (error) {
        console.log(error, "get-attached-programs api catch block error")
    }
})

// api tìm các chương trình của người dùng theo năm

router.get('/api/get-attached-programs-by-year', async(req, res) => {
    try {
        const userId = req.payload
        console.log(req.query, "req.query, get-attached-programs-by-year api")
        const year = req.query.year
        const attachedPrograms = await ProgramSchema.find({ user: { id: new ObjectId(userId) } }).lean()
        const attachedProgramsFilterByYear = attachedPrograms.filter((prog) => {
            console.log(prog.year.toString() === year, "filter function get-attached-programs-by-year api")
            if (prog.year.toString() === year) {
                return prog
            }

        })
        console.log(attachedProgramsFilterByYear, "attachedProgramsFilterByYear get-attached-programs-by-year api")
        res.json({ error: false, attachedProgramsFilterByYear })
    } catch (error) {
        console.log(error, "get-attached-programs-by-year api catch block error")
    }
})

router.patch('/api/add-programs-for-users/:id', async(req, res) => {
    try {
        const userId = req.params.id
        const { programIdArr } = req.body
        console.log(userId, "user id add-programs-for-users patch api")
        console.log(programIdArr, "programIdArr add-programs-for-users patch api")
        if (programIdArr.length === 0) {
            res.json({error: false, message: 'Chưa chọn bất kì chương trình nào'})
        } else {
            const addedUserProgramsArr = programIdArr.map(async (id) => {
                const updatedProgram = await ProgramSchema.findOneAndUpdate({_id: id}, {user: { id: new ObjectId(userId) } }, {new: true})
                return updatedProgram
            })
            console.log(addedUserProgramsArr, "addedUserProgramsArr add-programs-for-users")
            res.json({ error: false, message: 'Cập nhật khóa học cho đơn vị thành công' })
        }
    } catch(error) {
        console.log(error, "add-programs-for-users api catch block error")
    }
})

router.post('/api/create-program', emptyProgramInputsValidation, typeProgramInputsValidation, async (req, res) => {
    try {
        const { name, year, nation, parterUni, major, quota, level, agency, agencyPhoneNumber, expiry } = req.body
        console.log(req.body, "req.body post api")
        const existedProgram = await ProgramSchema.findOne({ name: name })
        if (existedProgram) {
            res.json({ error: true, message: "Chương trình đã tồn tại" })
        } else {
            const newProgram = await ProgramSchema.create({
                name: name,
                year: year,
                nation: nation,
                parterUni: parterUni,
                major: major,
                quota: quota,
                level: level,
                agency: agency,
                agencyPhoneNumber: agencyPhoneNumber,
                expiry: expiry,
                user: {
                    id: new ObjectId('111111111111111111111111')
                }
            })

            const yearsArrDoc = await YearSchema.findOne({_id: initYearId})
            const yearsArray = yearsArrDoc.yearsArray
            const firstArrItem = yearsArray[0]
            console.log(firstArrItem, "firstArrItem, create-program api")
            if (firstArrItem === 1) {
                
                const updatingArr = await YearSchema.findOneAndUpdate({ _id: initYearId }, { yearsArray: [year] }, {new: true})
                console.log(updatingArr, "updatingArr, lần đầu")
            } else {
                yearsArray.push(year)
                const newYearsArray = yearsArray
                const updatingArr = await YearSchema.findOneAndUpdate({ _id: initYearId }, { yearsArray: newYearsArray }, {new: true})
                console.log(updatingArr, "updatingArr, các lần sau")
            }

            console.log(newProgram, "newProgram")
            res.json({ error: false, message: 'Lưu thành công chương trình' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})


router.put('/api/edit-program/:id', emptyProgramInputsValidation, typeProgramInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, year, nation, parterUni, major, quota, level, agency, agencyPhoneNumber, expiry } = req.body
        console.log(id, "::put api id::")
        const updatingProgram = {
            name: name,
            year: year,
            nation: nation,
            parterUni: parterUni,
            major: major,
            quota: quota,
            level: level,
            agency: agency,
            agencyPhoneNumber: agencyPhoneNumber,
            expiry: expiry,
        }
        console.log(req.body, "put api req.body")
        const updatedProgram = await ProgramSchema.findOneAndUpdate({ _id: id }, updatingProgram, {new: true})
        console.log(updatedProgram, "updatedProgram")
        res.json({ error: false, message: "Chương trình đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-program/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingProgram = await ProgramSchema.findOneAndDelete({ _id: id })
        console.log(deletingProgram, "deletingProgram")
        res.json({ error: false, message: "Xóa thành công chương trình" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_PROGRAM_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "PROGRAM_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router