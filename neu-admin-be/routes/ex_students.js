const express = require('express')
const router = express.Router()
const ExStudentSchema = require('../models/ex_student')
const { emptyExStudentInputsValidation, typeExStudentInputsValidation, emptyFileExStudentInputValidation } = require('../helpers/input_validate_middleware')
const ExcelJs = require("exceljs")
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initExStudentMiddleware } = require('../helpers/init_doc')
const { upload, uploadToServer } = require('../helpers/multer_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')

const ObjectId = require("mongodb").ObjectId

const config = {
    // credential
}

const s3 = new S3Client(config)

const uploadFileFields = upload.fields([
    {name: 'attachedExchangeDoc', maxCount: 1},
    {name: 'attachedScoreDoc', maxCount: 1}
])

const uploadFileFields1 = upload.fields([
    {name: 'attachedExchangeDoc1', maxCount: 1},
    {name: 'attachedScoreDoc1', maxCount: 1}
])

router.use(authenticateAccessToken)
router.get('/api/get-all-ex-students', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const students = await ExStudentSchema.find({
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await ExStudentSchema.estimatedDocumentCount()
        let stt = 0
        const aStudents = students.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aStudents, "aStudents")
        res.json({ data: aStudents, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-ex-student', initExStudentMiddleware, uploadFileFields, async (req, res, next) => {
    try {
        const { name, birthday, sex, department, academicYear, major, studentCode, exchangeTime, exchangeYear, receivingCountry, partnerUni, subject, result, exchangeDecision, convertedScore, results } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        const studentId = req.payload
        const resultsArr = JSON.parse(results)





        let attachedScoreDocLink = ""
        let attachedScoreDocName = ""
        let attachedExDocName = ""
        let attachedExDocLink = ""
         

        if (!req.files['attachedExchangeDoc']) {
            attachedExDocLink = ""
            attachedExDocName = ""
        } else {
            const attachedExchangeDocArr = req.files['attachedExchangeDoc']
            const attachedExchangeDoc = attachedExchangeDocArr[0]
            console.log(attachedExchangeDoc, "attachedExchangeDoc, post api")
            attachedExDocLink = attachedExchangeDoc.location
            attachedExDocName = attachedExchangeDoc.originalname
        }
        if (!req.files['attachedScoreDoc']) {
            attachedScoreDocLink = ""
            attachedScoreDocName = ""
        } else {
            const attachedScoreDocArr = req.files['attachedScoreDoc']
            const attachedScoreDoc = attachedScoreDocArr[0]
            console.log(attachedScoreDoc, "attachedScoreDoc, post api")
            attachedScoreDocLink = attachedScoreDoc.location
            attachedScoreDocName = attachedScoreDoc.originalname
        }

        const newStudent = {
            name: name,
            studentCode: studentCode,
            department: department,
            academicYear: academicYear,
            exchangeYear: exchangeYear,
            birthday: birthday,
            sex: sex,
            exchangeTime: exchangeTime,
            major: major,
            receivingCountry: receivingCountry,
            partnerUni: partnerUni,
            subject: subject,
            result: result,
            exchangeDecision: exchangeDecision,
            convertedScore: convertedScore,
            attachedExDocLink: attachedExDocLink,
            attachedExDocName: attachedExDocName,
            attachedScoreDocLink: attachedScoreDocLink,
            attachedScoreDocName: attachedScoreDocName,
            results: resultsArr
        }
        console.log(newStudent, "newStudent")
        const storingStudent = await ExStudentSchema.findOneAndUpdate({ _id: studentId }, newStudent, {new: true})
        console.log(storingStudent, "storingStudent")
        res.json({ error: false, message: 'Lưu thành công thông tinh sinh viên' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        // res.json({ error: true, message: "something went wrong" })
        next(error)
    }
})

router.put('/api/edit-ex-student/:id', uploadFileFields1, async(req, res) => {
    try {
        const { id } = req.params
        const { name, birthday, sex, results, department, academicYear, major, studentCode, exchangeTime, exchangeYear, receivingCountry, partnerUni, subject, result, exchangeDecision, convertedScore, attachedExDocLink, attachedScoreDocLink, attachedExDocName, attachedScoreDocName } = req.body
        console.log(req.files, "req.file put api")
        console.log(req.body, "req.body put api")
        
        const resultArr = JSON.parse(results)
        const attachedExchangeDocArr = req.files['attachedExchangeDoc1']
        const attachedScoreDocArr = req.files['attachedScoreDoc1']
        
        // const attachedScoreDoc = attachedScoreDocArr[0]
        let newAttachedExDocLink = ''
        let newAttachedScoreDocLink = ''
        if (attachedExchangeDocArr) {
            if (attachedExDocLink === "" || attachedExDocLink === undefined) {
                console.log('ko có link ảnh cũ edit-ex-student api')
            } else {
                const oldExFileKey = attachedExDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
                console.log(oldExFileKey, "oldExFileKey put api")
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${oldExFileKey}`
                })
                const result = await s3.send(newDeleteCommand)
                console.log(result, ":::result, put api:::")
            }

            const attachedExchangeDoc = attachedExchangeDocArr[0]
            newAttachedExDocLink = attachedExchangeDoc.location

        } else {
            newAttachedExDocLink = attachedExDocLink
        }

        if (attachedScoreDocArr) {
            if (attachedScoreDocLink === "" || attachedScoreDocLink === undefined) {
                console.log('ko có link ảnh cũ edit-ex-student api')
            } else {
                const oldExFileKey = attachedScoreDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
                console.log(oldExFileKey, "oldExFileKey put api")
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${oldExFileKey}`
                })
                const result = await s3.send(newDeleteCommand)
                console.log(result, ":::result, put api:::")
            }

            const attachedScoreDoc = attachedScoreDocArr[0]
            newAttachedScoreDocLink = attachedScoreDoc.location

        } else {
            newAttachedScoreDocLink = attachedScoreDocLink
        }

        console.log(id, "::put api id::")
        const updatingStudent = {
            name: name,
            studentCode: studentCode,
            department: department,
            academicYear: academicYear,
            exchangeYear: exchangeYear,
            birthday: birthday,
            sex: sex,
            exchangeTime: exchangeTime,
            major: major,
            receivingCountry: receivingCountry,
            partnerUni: partnerUni,
            subject: subject,
            result: result,
            exchangeDecision: exchangeDecision,
            convertedScore: convertedScore,
            attachedExDocLink: newAttachedExDocLink,
            attachedExDocName: attachedExDocName,
            attachedScoreDocLink: newAttachedScoreDocLink,
            attachedScoreDocName: attachedScoreDocName,
            results: resultArr

        }
        const updatedStudent = await ExStudentSchema.findOneAndUpdate({ _id: id }, updatingStudent, {new: true})
        console.log(updatedStudent, "updatedStudent")
        res.json({ error: false, message: "Thông tin học sinh sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-ex-student/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const delStudent = await ExStudentSchema.findOne({ _id: id })
        const attachedScoreDocLink = delStudent.attachedScoreDocLink
        const attachedExDocLink = delStudent.attachedExDocLink
        if (attachedScoreDocLink === "" || attachedScoreDocLink === undefined) {
            console.log('ko có link ảnh attachedScoreDocLink cũ delete-ex-student api')
        } else {
            const delStudentKey2 = delStudent.attachedScoreDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delStudentKey2, "delStudentKey delete api")
            const newDeleteCommand2 = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delStudentKey2}`
            })
            const result2 = await s3.send(newDeleteCommand2)
            console.log(result2,  ":::result2, delete api:::")
        }

        if (attachedExDocLink === "" || attachedExDocLink === undefined) {
            console.log('ko có link ảnh attachedExDocLink cũ delete-ex-student api')
        } else {
            const delStudentKey1 = delStudent.attachedExDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delStudentKey1, "delStudentKey delete api")
            const newDeleteCommand1 = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delStudentKey1}`
            })
            const result1 = await s3.send(newDeleteCommand1)
            console.log(result1,  ":::result1, delete api:::")
        }
        
        const deletingStudent = await ExStudentSchema.findOneAndDelete({ _id: id })
        console.log(deletingStudent, "deletingStudent")
        res.json({ error: false, message: "Xóa thành công thông tin học sinh" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-exstudents', async (req, res) => {
    try {
        const { id } = req.query // id: program id
        const exstudents = await ExStudentSchema.find({}).lean()
        let stt = 0
        const aExstudents = exstudents.map(doc => {

            stt++
            return {
                ...doc,
                stt: stt,
            }
        })

        let resultsArrayLengthArray = []
        aExstudents.forEach(exstudent => {
            let resultsArrayLength = exstudent.results.length
            resultsArrayLengthArray.push(resultsArrayLength)
        })

        console.log(resultsArrayLengthArray, "resultsArrayLengthArray /api/export-excel-exstudents")

        const maxValue = Math.max(...resultsArrayLengthArray)
        console.log(maxValue, "maxValue /api/export-excel-exstudents")
        let pushCol = []
        for (let i = 0; i < maxValue; i++) {
            pushCol.push(
                {
                    header: `TÊN MÔN HỌC ${i + 1}`,
                    key: `subjectName${i + 1}`,
                    width: 50
                },
                {
                    header: `SỐ TÍN CHỈ ${i + 1}`,
                    key: `creditsCount${i + 1}`,
                    width: 30
                },
                {
                    header: `ĐIỂM QUY ĐỔI ${i + 1}`,
                    key: `point${i + 1}`,
                    width: 30
                }
            )
        }
        console.log(pushCol, "pushCol /api/export-excel-exstudents")
        const constCol = [
            {header: "STT", key:"stt", width: 10},
            {header: "HỌ VÀ TÊN", key:"name", width: 40},
            {header: "NGÀY SINH", key:"birthday", width: 40},
            {header: "GIỚI TÍNH", key:"sex", width: 30},
            {header: "MSSV", key:"studentCode", width: 30},
            {header: "KHOA/VIỆN ĐÀO TẠO", key:"department", width: 40},
            {header: "KHÓA", key:"academicYear", width: 30},
            {header: "LỚP CHUYÊN NGÀNH", key:"major", width: 30},
            {header: "NĂM HỌC TRAO ĐỔI", key:"exchangeYear", width: 40},
            {header: "THỜI GIAN TRAO ĐỔI", key:"exchangeTime", width: 40},
            {header: "QUỐC GIA TIẾP NHẬN", key:"receivingCountry", width: 40},
            {header: "TRƯỜNG ĐỐI TÁC", key:"partnerUni", width: 40}, //subject
            {header: "MÔN HỌC TẠI TRƯỜNG ĐỐI TÁC", key:"subject", width: 40},
            {header: "KẾT QUẢ HỌC TẬP", key:"result", width: 40}, //exchangeDecision
            {header: "QUYẾT ĐỊNH CỬ ĐI", key:"exchangeDecision", width: 40},
            {header: "ĐIỂM SỐ ĐƯỢC QUY ĐỔI", key:"convertedScore", width: 40},
            {header: "TÊN QUYẾT ĐỊNH CỬ ĐI ĐÍNH KÈM", key:"attachedExDocName", width: 40},
            {header: "LINK QUYẾT ĐỊNH CỬ ĐI ĐÍNH KÈM", key:"attachedExDocLink", width: 40}, //attachedScoreDocLink
            {header: "TÊN QUYẾT ĐỊNH QUY ĐỔI ĐIỂM SỐ", key:"attachedScoreDocName", width: 40},
            {header: "LINK QUYẾT ĐỊNH QUY ĐỔI ĐIỂM SỐ", key:"attachedScoreDocLink", width: 40},

        ]


        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("exstudents")
        sheet.columns = constCol.concat(pushCol)
        console.log(aExstudents, "aExstudents /api/export-excel-exstudents 3")
        aExstudents.map(student => {
            const resultsArr= student.results
            console.log(resultsArr, "resultsArr 2 /api/export-excel-exstudents")
            let addObj = {}
            if (resultsArr.length === 0) {
                console.log("resultsArr.length === 0")
                addObj = {}
            } else {
                console.log(resultsArr, "resultsArr 3 /api/export-excel-exstudents")
                addObj = resultsArr.reduce((acc, result, i) => {
                    acc[`subjectName${i + 1}`] = result.subjectName;
                    acc[`creditsCount${i + 1}`] = result.creditsCount;
                    acc[`point${i + 1}`] = result.point;
                    return acc;
                }, {})
                console.log(addObj, "addObj /api/export-excel-exstudents 1")
            }

            console.log(addObj, "addObj /api/export-excel-exstudents")
            const constObj = {
                stt: student.stt,
                name: student.name,
                birthday: student.birthday,
                sex: student.sex,
                studentCode: student.studentCode,
                department: student.department,
                academicYear: student.academicYear,
                major: student.major,
                exchangeYear: student.exchangeYear,
                exchangeTime: student.exchangeTime,
                receivingCountry: student.receivingCountry,
                partnerUni: student.partnerUni,
                subject: student.subject,
                result: student.result,
                exchangeDecision: student.exchangeDecision,
                convertedScore: student.convertedScore,
                attachedExDocName: student.attachedExDocName,
                attachedExDocLink: student.attachedExDocLink,
                attachedScoreDocName: student.attachedScoreDocName,
                attachedScoreDocLink: student.attachedScoreDocLink,
            }
            const finalObj = { ...constObj, ...addObj }
            sheet.addRow(finalObj)
        })
        await workbook.xlsx.writeFile(`public/Sinh viên đi nước ngoài trao đổi.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Sinh viên đi nước ngoài trao đổi.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-exstudents catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-exstudents-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-sinh-vien-di-nuoc-ngoai-trao-doi.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-exstudents-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-exstudents-data', uploadToServer.single("exstudents-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-exstudents-data")
        const file = req.file
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importDecisionArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importDecisionArr.push({
                    name: row.values[2],
                    birthday: row.values[3],
                    sex: row.values[4],
                    studentCode: row.values[5],
                    department: row.values[6],
                    academicYear: row.values[7],
                    major: row.values[8],
                    exchangeYear: row.values[9],
                    exchangeTime: row.values[10],
                    receivingCountry: row.values[11],
                    partnerUni: row.values[12],
                    subject: row.values[13],
                    result: row.values[14],
                    exchangeDecision: row.values[15],
                    convertedScore: row.values[16],

                })
            }
            
        })
        console.log(importDecisionArr, "importDecisionArr /api/import-exstudents-data")
        const savedImportExstudents = await ExStudentSchema.insertMany(importDecisionArr)
        console.log(savedImportExstudents, "savedImportExstudents /api/import-exstudents-data")

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

router.use('/api/create-ex-student', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const studentId = req.payload
        const attachedExchangeDocArr = req.files['attachedExchangeDoc']
        const attachedScoreDocArr = req.files['attachedScoreDoc']
        const delInitStudent = await ExStudentSchema.deleteOne({ _id: studentId })
        console.log(delInitStudent, "deleted delInitStudent")
        if (!attachedExchangeDocArr && !attachedScoreDocArr) {
            next(error)
        } else {
            if (attachedExchangeDocArr) {
                const attachedExchangeDocKey = attachedExchangeDocArr[0].key
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${attachedExchangeDocKey}`
                })
                const result1 = await s3.send(newDeleteCommand)
                console.log(result1, "xóa file exchangeDoc khi post api lỗi")
            }
            if (attachedScoreDocArr) {
                const attachedScoreDocKey = attachedScoreDocArr[0].key
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${attachedScoreDocKey}`
                })
                const result2 = await s3.send(newDeleteCommand)
                console.log(result2, "xóa file ScoreDoc khi post api lỗi")
            }
            next(error)
        }
    } catch (error) {
        console.log(error, "post error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' }) // nếu có lỗi gì xảy ra ở try block owr treen thì lỗi đc xử lí ở đây
    }
})

router.use('/api/edit-ex-student/:id', async(error, req, res, next) => {
    try {
        console.log(error, "error handle put api middleware")
        const { id } = req.params
        const attachedExchangeDocArr = req.files['attachedExchangeDoc1']
        const attachedScoreDocArr = req.files['attachedScoreDoc1']
        if (!attachedExchangeDocArr && !attachedScoreDocArr) {
            next(error)
        } else {
            if (attachedExchangeDocArr) {
                const attachedExchangeDocKey = attachedExchangeDocArr[0].key
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${attachedExchangeDocKey}`
                })
                const result1 = await s3.send(newDeleteCommand)
                console.log(result1, "xóa file exchangeDoc khi put api lỗi")
            }
            if (attachedScoreDocArr) {
                const attachedScoreDocKey = attachedScoreDocArr[0].key
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${attachedScoreDocKey}`
                })
                const result2 = await s3.send(newDeleteCommand)
                console.log(result2, "xóa file ScoreDoc khi put api lỗi")
            }
            next(error)
        }
    } catch (error) {
        console.log(error, "put error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' })
    }
})


router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        // if (error.code === "EMPTY_ES_FILE_INPUT_ERROR") {
        //     console.log(error.code, "empty file input error")
        //     return res.json({ error: true, message: "Chưa chọn file nào" })
        // }

    }
    

})

module.exports = router