const express = require('express')
const router = express.Router()
const ProgramSchema = require('../models/program')
const YearSchema = require('../models/years')
const ExcelJs = require("exceljs")

const {
    emptyProgramInputsValidation,
    typeProgramInputsValidation
} = require('../helpers/input_validate_middleware')
const {
    authenticateAccessToken
} = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

const initYearId = '65e968d440e62c9bf7a39996'

const UserSchema = require('../models/user')


router.use(authenticateAccessToken)

router.get('/api/get-all-programs', async (req, res) => {
    try {
        let {
            page,
            limit,
            query
        } = req.query
        const { id, permission } = req.payload
        console.log(req.payload, "req.payload /api/get-all-programs")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        let programs = []
        let count = 0
        let stt = 0
        if (permission === "Super Admin") {
            programs = await ProgramSchema.find({
                name: {
                    $regex: query
                }
            }).lean().sort({
                _id: -1
            }).skip(skip).limit(limit)
            count = await ProgramSchema.countDocuments()
            console.log(programs, "programs Super Admin /api/get-all-programs")
        } else {
            programs = await ProgramSchema.find({
                name: {
                    $regex: query
                },
                user: {
                    id: new ObjectId(id),
                }
            }).lean().sort({
                _id: -1
            }).skip(skip).limit(limit)
            count = await ProgramSchema.countDocuments({
                user: {
                    id: { id: new ObjectId(id) },
                }
            })
            console.log(programs, "programs not Super Admin /api/get-all-programs")
        }

        const aPrograms = programs.map(doc => {
            let expiry = doc.expiry
            const timeNow = new Date()
            let status = 1
            const expiryDate = new Date(expiry)
            // 3: hết hạn, 2: sắp hết hạn, 1 còn hạn
            if(expiryDate < timeNow){
                status = 3
            } else if (expiryDate - timeNow <= 2592000000*6) { // thời hạn ít hơn 6 tháng (6 tháng = 2592000000*6 mili s)
                status = 2
            } else {
                status = 1
            }
            stt++
            // const id = doc._id.toString()
            

            let a_expiry = expiry.split("-")
            doc.expiry = a_expiry[2] + "/" +  a_expiry[1] + "/" + a_expiry[0]
            return {
                ...doc,
                stt: stt,
                status: status,
            }
        })
        console.log(aPrograms, "aPrograms")
        res.json({
            data: aPrograms,
            count: count,
            error: false
        })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({
            error: true,
            message: "something went wrong"
        })
    }
})

router.get('/api/get-all-programs-one', async (req, res) => {
    try {
        let {
            page,
            limit,
            query,
            id
        } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        let filter = {}
        if (query) {
            filter = {year: { $eq: query }}
        }
        const programs = await ProgramSchema.find(
            // {year: { $eq: query }}
            filter
        ).select({name: 1, agency: 1, year: 1, user: 1}).lean().sort({
            _id: -1
        }).skip(skip).limit(limit)
        let count = await ProgramSchema.estimatedDocumentCount()
        let stt = 0
        const aPrograms = programs.map(doc => {
            stt++
            if(doc.agency && doc.user.id.toString() === id) {
                return {
                    ...doc,
                    stt: stt,
                    isManage: true
                }
            } else {
                return {
                    ...doc,
                    stt: stt,
                    isManage: false
                }
            }
            
        })
        console.log(aPrograms, "aPrograms")
        res.json({
            data: aPrograms,
            count: count,
            error: false
        })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({
            error: true,
            message: "something went wrong"
        })
    }
})

router.get('/api/get-years-array', async (req, res) => {
    try {

        const yearsArrDoc = await YearSchema.findOne({
            _id: initYearId
        })
        console.log(yearsArrDoc, "yearsArrDoc, get-years-array api")
        const yearsArr = yearsArrDoc.yearsArray
        console.log(yearsArr, "yearsArr, get-years-array api")
        const filteredYearsArr = yearsArr.filter((year, index) => {
            if (yearsArr.indexOf(year) === index) {
                return year
            } // lấy những phần tử có giá trị year đầu tiên

        })
        console.log(filteredYearsArr, "filteredYearsArr, get-years-array api")
        const orderedYearsArr = filteredYearsArr.sort((a, b) => {
            return a - b
        })
        console.log(orderedYearsArr, "orderedYearsArr, get-years-array api")
        res.json({
            error: false,
            data: orderedYearsArr
        })
    } catch (error) {
        console.log(error, "get get-years-array api catch block error")
        res.json({
            error: true,
            message: "something went wrong"
        })
    }
})

// api lấy những chương trình chưa gán vs ng dùng nào

router.get('/api/get-programs-by-year', async (req, res) => {
    try {
        console.log(req.query, "req.query, get-programs-by-year api")
        const year = req.query.year
        console.log(year, "year get-programs-by-year api")
        const programsZeroUser = await ProgramSchema.find({
            user: {
                id: new ObjectId('111111111111111111111111')
            }
        }).lean() // những chương trình chưa liên kết với người dùng nào
        console.log(programsZeroUser, "programsZeroUser get-programs-by-year api")
        const programsZeroUserFilterByYear = programsZeroUser.filter((prog) => {
            console.log(prog.year.toString() === year, "filter function get-programs-by-year api")
            if (prog.year.toString() === year) {
                return prog
            }

        })
        console.log(programsZeroUserFilterByYear, "programsZeroUserFilterByYear get-programs-by-year api")
        res.json({
            error: false,
            programsZeroUserFilterByYear
        })
    } catch (error) {
        console.log(error, "get-programs-by-year catch block api")
    }
})

// api kiểm tra người dùng đã được gắn với chương trình nào chưa

router.get('/api/check-user-has-program-or-not', async (req, res) => {
    try {

        const {
            id
        } = req.payload // từ authenticateAccessToken()

        //LẤyt hông tin user
        const userItem = await UserSchema.findOne({
            _id: new ObjectId(id)
        })

        if (userItem.permission == "Super Admin") {
            var hasProgram = true
        } else {
            const attachedPrograms = await ProgramSchema.countDocuments({
                user: {
                    id: new ObjectId(id)
                }
            })
            console.log(attachedPrograms, "attachedPrograms get-attached-programs api")
            var hasProgram = null
            if (attachedPrograms == 0) {
                hasProgram = false
            } else {
                hasProgram = true
            }

        }
        res.json({
            error: false,
            hasProgram
        })

    } catch (error) {
        console.log(error, "get-attached-programs api catch block error")
    }
})

// api tìm các chương trình của người dùng theo năm

router.get('/api/get-attached-programs-by-year', async (req, res) => {
    try {
        const userId = req.payload
        // var year = req.query.year
        // year = parseInt(year)

        //LẤyt hông tin user
        const userItem = await UserSchema.findOne({
            _id: new ObjectId(userId)
        })
        let filteredattachedPrograms = []
        if (userItem.permission == "Super Admin") {
            attachedPrograms = await ProgramSchema.find().lean()
            console.log(attachedPrograms, "attachedPrograms Super Admin")
            filteredattachedPrograms = attachedPrograms
            console.log(filteredattachedPrograms, "filteredattachedPrograms Super Admin")
        } else {
            attachedPrograms = await ProgramSchema.find({
                user: {
                    id: new ObjectId(userId)
                }
            }).lean()
            filteredattachedPrograms = attachedPrograms
        }

        res.json({
            error: false,
            attachedProgramsFilterByYear: filteredattachedPrograms
        })
    } catch (error) {
        console.log(error, "get-attached-programs-by-year api catch block error")
    }
})

// api lấy danh sách các chương trình đang gắn với người dùng
router.get('/api/get/all-attached-program', async (req, res) => {
    const userId = req.payload
    const attachedPrograms = await ProgramSchema.find({ user: { id: new ObjectId(userId) } }).lean()
    res.json({ error: false, attachedPrograms })

})

router.patch('/api/add-programs-for-users/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const {
            programIdArr,
            unattachedProgramIdArr
        } = req.body
        console.log(userId, "user id add-programs-for-users patch api")
        console.log(programIdArr, "programIdArr add-programs-for-users patch api")
        console.log(unattachedProgramIdArr, "unattachedProgramIdArr add-programs-for-users patch api")
        if (unattachedProgramIdArr.length === 0) {
            console.log("ko có program nào bị bỏ liên kết với user")
        } else {
            const upDatedProgram = unattachedProgramIdArr.map(async (item) => {
                const updatingProgram = {
                    agency: '',
                    agencyPhoneNumber: '',
                    user: {id : new ObjectId('111111111111111111111111')}

                }
                const upDatingDoc = await ProgramSchema.findOneAndUpdate({_id: item}, updatingProgram, {new: true})
                return upDatingDoc
            })
            
            console.log(upDatedProgram, "upDatedProgram, add-programs-for-users patch api")
        }
        const user = await UserSchema.findOne({_id: userId})
        const userName = user.name
        const userPhoneNumber = user.phoneNumber
        const updatingProgram = {
            agency: userName,
            agencyPhoneNumber: userPhoneNumber,
            user: {
                id: new ObjectId(userId)
            }
        }
        const addedUserProgramsArr = programIdArr.map(async (id) => {
            const updatedProgram = await ProgramSchema.findOneAndUpdate({
                _id: id
            }, 
            updatingProgram
            , {
                new: true
            })
            return updatedProgram
        })
        console.log(addedUserProgramsArr, "addedUserProgramsArr add-programs-for-users")
        res.json({
            error: false,
            message: 'Cập nhật khóa học cho đơn vị thành công'
        })
        
    } catch (error) {
        console.log(error, "add-programs-for-users api catch block error")
    }
})

router.post('/api/create-program', async (req, res) => {
    try {
        const {
            name,
            year,
            nation,
            parterUni,
            major,
            quota,
            level,
            expiry
        } = req.body
        console.log(req.body, "req.body post api")
        const existedProgram = await ProgramSchema.findOne({
            name: name
        })
        if (existedProgram) {
            res.json({
                error: true,
                message: "Chương trình đã tồn tại"
            })
        } else {

            
            const newProgram = await ProgramSchema.create({
                name: name,
                year: year,
                nation: nation,
                parterUni: parterUni,
                major: major,
                quota: quota,
                level: level,
                expiry: expiry,
                user: {
                    id: new ObjectId('111111111111111111111111')
                }
            })

            // const yearsArrDoc = await YearSchema.findOne({
            //     _id: initYearId
            // })
            // const yearsArray = yearsArrDoc.yearsArray
            // const firstArrItem = yearsArray[0]
            // console.log(firstArrItem, "firstArrItem, create-program api")
            // if (firstArrItem === 1) {

            //     const updatingArr = await YearSchema.findOneAndUpdate({
            //         _id: initYearId
            //     }, {
            //         yearsArray: [year]
            //     }, {
            //         new: true
            //     })
            //     console.log(updatingArr, "updatingArr, lần đầu")
            // } else {
            //     yearsArray.push(year)
            //     const newYearsArray = yearsArray
            //     const updatingArr = await YearSchema.findOneAndUpdate({
            //         _id: initYearId
            //     }, {
            //         yearsArray: newYearsArray
            //     }, {
            //         new: true
            //     })
            //     console.log(updatingArr, "updatingArr, các lần sau")
            // }

            console.log(newProgram, "newProgram")
            res.json({
                error: false,
                message: 'Lưu thành công chương trình'
            })
        }


    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({
            error: true,
            message: "something went wrong"
        })
    }
})


router.put('/api/edit-program/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            name,
            year,
            nation,
            parterUni,
            major,
            quota,
            level,
            expiry
        } = req.body
        console.log(id, "::put api id::")
        // let status = true
        // console.log(timeNow, "timeNow edit-program")
        
        // const expiryDate = new Date(expiry)
        // console.log(expiryDate < timeNow, "expiry < timeNow edit-program")
        const updatingProgram = {
            name: name,
            year: year,
            nation: nation,
            parterUni: parterUni,
            major: major,
            quota: quota,
            level: level,
            expiry: expiry,
        }
        console.log(req.body, "put api req.body")
        const updatedProgram = await ProgramSchema.findOneAndUpdate({
            _id: id
        }, updatingProgram, {
            new: true
        })
        console.log(updatedProgram, "updatedProgram")
        res.json({
            error: false,
            message: "Chương trình đã được sửa thành công"
        })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
        // next(error)
    }
})

// api bỏ liên kết giữa chương trình và người dùng
router.patch('/api/delete-attached-program/:id', async(req, res) => {
    try {
        const { id } = req.params
        const updatingProgram = {
            agency: '',
            agencyPhoneNumber: '',
            user: { id: new ObjectId('111111111111111111111111') }
        }
        const updatingProg = await ProgramSchema.findOneAndUpdate({ _id: id }, updatingProgram, { new: true })

        console.log(updatingProg, "updatedProgram delete-programs-for-users")
        res.json({
            error: false,
            message: 'Đã bỏ liên kết giữa tài khoản và chương trình'
        })
    } catch (error) {
        console.log(error, "error in  catch block /delete-attached-program api")
    }
})

router.delete('/api/delete-program/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params
        console.log(id, "::id delete api::")
        const deletingProgram = await ProgramSchema.findOneAndDelete({
            _id: id
        })
        console.log(deletingProgram, "deletingProgram")
        res.json({
            error: false,
            message: "Xóa thành công chương trình"
        })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/export-excel', async (req, res) => {
    try {
        let workbook = new ExcelJs.Workbook()
        const { id, permission } = req.payload
        let programs = []
        let stt = 0
        if (permission === "Super Admin") {
            programs = await ProgramSchema.find({
                // name: {
                //     $regex: query
                // }
            }).lean()
            console.log(programs, "programs Super Admin /api/export-excel")
        } else {
            programs = await ProgramSchema.find({
                user: {
                    id: new ObjectId(id),
                }
            }).lean()
            console.log(programs, "programs not Super Admin /api/export-excel")
        }

        const aPrograms = programs.map(doc => {
            stt++
            // const id = doc._id.toString()
            
            return {
                ...doc,
                stt: stt,
            }
        })
        console.log(aPrograms, "aPrograms")

        let decisionArrayLenghtArray = []
        aPrograms.forEach(program => {
            let decisionArrayLength = program.decisionsArray.length
            decisionArrayLenghtArray.push(decisionArrayLength)
        })

        console.log(decisionArrayLenghtArray, "decisionArrayLenghtArray /api/export-excel")
        const maxValue = Math.max(...decisionArrayLenghtArray)
        console.log(maxValue, "maxValue /api/export-excel")
        let pushCol = []
        for (let i = 0; i < maxValue; i++) {
            pushCol.push(
                {
                    header: `TÊN QUYẾT ĐỊNH ${i + 1}`,
                    key: `decisionName${i + 1}`,
                    width: 30
                },
                {
                    header: `LINK QUYẾT ĐỊNH ${i + 1}`,
                    key: `decisionLink${i + 1}`,
                    width: 50
                }
            )
        }
        console.log(pushCol, "pushCol /api/export-excel")
        const sheet = workbook.addWorksheet("programs")
        const constCol = [
            {header: "STT", key:"stt", width: 10},
            {header: "NĂM", key:"year", width: 10},
            {header: "TÊN CHƯƠNG TRÌNH", key:"name", width: 30},
            {header: "QUỐC GIA", key:"nation", width: 15},
            {header: "TRƯỜNG ĐỐI TÁC", key:"partnerUni", width: 20},
            {header: "CHUYÊN NGÀNH", key:"major", width: 20},
            {header: "CHỈ TIÊU", key:"quota", width: 10},
            {header: "TRÌNH ĐỘ ĐÀO TẠO", key:"level", width: 15},
            {header: "ĐƠN VỊ QUẢN LÝ", key:"agency", width: 20},
            {header: "SĐT Đ.VỊ QUẢN LÝ", key:"agencyPhoneNumber", width: 15},
            {header: "NGÀY HẾT HẠN", key:"expiry", width: 15},
            {header: "TRẠNG THÁI", key:"status", width: 15},
            // {header: "QUYẾT ĐỊNH PHÊ DUYỆT", key:"decisionArray", width: 20},
        ]

        sheet.columns = constCol.concat(pushCol)

        aPrograms.map((program) => {
            // const decisionArrayCol = sheet.getColumn(13)
            // decisionArrayCol.eachCell((cell) => {
            //     cell.value = {
            //         text: program,
            //         hyperlink: 'http://www.mylink.com',
            //         tooltip: 'www.mylink.com'
            //     }
            // })

            const decisionsArray = program.decisionsArray
            console.log(decisionsArray, "decisionsArray /api/export-excel")

            const addObj = decisionsArray.reduce((acc, decision, i) => {
                acc[`decisionName${i + 1}`] = decision.decisionName;
                acc[`decisionLink${i + 1}`] = decision.decisionLink;
                return acc;
            }, {});
              
            
            console.log(addObj, "addObj /api/export-excel")

            const constObj = {
                stt: program.stt,
                year: program.year,
                name: program.name,
                nation: program.nation,
                partnerUni: program.parterUni,
                major: program.major,
                quota: program.quota,
                level: program.level,
                agency: program.agency,
                agencyPhoneNumber: program.agencyPhoneNumber,
                expiry: program.expiry,
                status: program.status,
                // decisionArray: program.decisionsArray
            }
            const finalObj = { ...constObj, ...addObj }
            sheet.addRow(finalObj)

        })

        
        // console.log(workbook, "workbook /api/export-excel")
        await workbook.xlsx.writeFile(`public/programs-${id}.xlsx`)
        // res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); 
        // res.setHeader("Content-Disposition", "attachment; filename=" + `public/programs-${id}.xlsx`);
        const excelFilePath = process.env.CND_EXCELFILE + `programs-${id}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })

    } catch (error) {
        console.log(error, "/api/export-excel catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

// router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
//     if (error) {
//         console.log(error, "custom error handler")

//         if (error.code === "EMPTY_PROGRAM_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({
//                 error: true,
//                 message: "Hãy điền đẩy đủ form"
//             })
//         }

//         if (error.code === "PROGRAM_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({
//                 error: true,
//                 message: "Hãy điền đúng loại dữ liệu"
//             })
//         }
//     }


// })

module.exports = router