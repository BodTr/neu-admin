const express = require('express')
const router = express.Router()
const ExStudentSchema = require('../models/ex_student')
const { emptyExStudentInputsValidation, typeExStudentInputsValidation, emptyFileExStudentInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initExStudentMiddleware } = require('../helpers/init_doc')
const { upload } = require('../helpers/multer_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')

const ObjectId = require("mongodb").ObjectId

const config = {
    version: 'latest',
    region: 'ap-southeast-1',
    endpoint: 'https://s3.ap-southeast-1.amazonaws.com',
    credentials: {
        accessKeyId: 'AKIAJWV2UWBGOU7M53TA',
        secretAccessKey: '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',
    },
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

router.post('/api/create-ex-student', initExStudentMiddleware, uploadFileFields, emptyFileExStudentInputValidation, async (req, res, next) => {
    try {
        const { name, birthday, sex, department, academicYear, major, studentCode, exchangeTime, exchangeYear, receivingCountry, partnerUni, subject, result, exchangeDecision, convertedScore, results } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        const studentId = req.payload
        const resultsArr = JSON.parse(results)
        const attachedExchangeDocArr = req.files['attachedExchangeDoc']
        const attachedScoreDocArr = req.files['attachedScoreDoc']
        const attachedExchangeDoc = attachedExchangeDocArr[0]
        const attachedScoreDoc = attachedScoreDocArr[0]
        console.log(attachedExchangeDoc, "attachedExchangeDoc, post api")
        console.log(attachedScoreDoc, "attachedScoreDoc, post api")
        const attachedExDocLink = attachedExchangeDoc.location
        const attachedExDocName = attachedExchangeDoc.originalname
        const attachedScoreDocLink = attachedScoreDoc.location
        const attachedScoreDocName = attachedScoreDoc.originalname
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
            const attachedExchangeDoc = attachedExchangeDocArr[0]
            const oldExFileKey = attachedExDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(oldExFileKey, "oldExFileKey put api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${oldExFileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, put api:::")
            newAttachedExDocLink = attachedExchangeDoc.location

        } else {
            newAttachedExDocLink = attachedExDocLink
        }

        if (attachedScoreDocArr) {
            const attachedScoreDoc = attachedScoreDocArr[0]
            const oldExFileKey = attachedScoreDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(oldExFileKey, "oldExFileKey put api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${oldExFileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, put api:::")
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
        const delStudentKey1 = delStudent.attachedExDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(delStudentKey1, "delStudentKey delete api")
        const newDeleteCommand1 = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${delStudentKey1}`
        })
        const result1 = await s3.send(newDeleteCommand1)
        const delStudentKey2 = delStudent.attachedScoreDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(delStudentKey2, "delStudentKey delete api")
        const newDeleteCommand2 = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${delStudentKey2}`
        })
        const result2 = await s3.send(newDeleteCommand2)
        console.log(result1, result2,  ":::result, delete api:::")
        const deletingStudent = await ExStudentSchema.findOneAndDelete({ _id: id })
        console.log(deletingStudent, "deletingStudent")
        res.json({ error: false, message: "Xóa thành công thông tin học sinh" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
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

        if (error.code === "EMPTY_ES_FILE_INPUT_ERROR") {
            console.log(error.code, "empty file input error")
            return res.json({ error: true, message: "Chưa chọn file nào" })
        }

    }
    

})

module.exports = router