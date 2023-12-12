const express = require('express')
const router = express.Router()
const ExForeignStudentSchema = require('../models/ex_foreign_student')
const { emptyExForeignStudentInputsValidation, typeExForeignStudentInputsValidation, emptyFileExForeignStudentInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initexForeignStudentDocMiddleware } = require('../helpers/init_doc')
const { upload } = require('../helpers/multer_middleware')


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

router.get('/api/get-all-ex-f-students', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const students = await ExForeignStudentSchema.find({
            program: { id: new ObjectId(id) }
            
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await ExForeignStudentSchema.estimatedDocumentCount()
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

router.post('/api/create-ex-f-student', initexForeignStudentDocMiddleware, upload.single("attachedExFStuDoc"), emptyFileExForeignStudentInputValidation, emptyExForeignStudentInputsValidation, typeExForeignStudentInputsValidation, async (req, res, next) => {
    try {
        const { programId ,name, studentCode, position, educationLevel, receptionTime, receptionYear, birthday, sex, major, unit, receptionDecision, subject, result } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file post api")
        const studentId = req.payload
        const attachedDoc = req.file
        console.log(attachedDoc, "attachedDoc, post api")
        const attachedDocLink = attachedDoc.location
        const attachedDocName = attachedDoc.originalname
        const newStudent = {
            name: name,
            studentCode: studentCode,
            position: position,
            educationLevel: educationLevel,
            receptionTime: receptionTime,
            birthday: birthday,
            sex: sex,
            receptionYear: receptionYear,
            major: major,
            unit: unit,
            receptionDecision: receptionDecision,
            subject: subject,
            result: result,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
            program: {
                id: programId
            }
        }
        const storingStudent = await ExForeignStudentSchema.findOneAndUpdate({ _id: studentId }, newStudent, {new: true})
        console.log(storingStudent, "storingStudent")
        res.json({ error: false, message: 'Lưu thành công chương trình' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        // res.json({ error: true, message: "something went wrong" })
        next(error)
    }
})

router.put('/api/edit-ex-f-student/:id', upload.single("attachedExFStuDoc1"), emptyExForeignStudentInputsValidation, typeExForeignStudentInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, studentCode, position, educationLevel, receptionTime, receptionYear, birthday, sex, major, unit, receptionDecision, subject, result, attachedDocLink, attachedDocName } = req.body
        const attachedDoc1 = req.file
        console.log(req.file, "req.file put api")
        console.log(req.body, "req.body put api")
        let newAttachedDocLink = ''
        if (attachedDoc1) {
            const oldFileKey = attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(oldFileKey, "oldFileKey put api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${oldFileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, put api:::")
            newAttachedDocLink = attachedDoc1.location

        } else {
            newAttachedDocLink = attachedDocLink
        }

        console.log(id, "::put api id::")
        const updatingStudent = {
            name: name,
            studentCode: studentCode,
            position: position,
            educationLevel: educationLevel,
            receptionTime: receptionTime,
            receptionYear: receptionYear,
            birthday: birthday,
            sex: sex,
            major: major,
            unit: unit,
            receptionDecision: receptionDecision,
            subject: subject,
            result: result,
            attachedDocLink: newAttachedDocLink,
            attachedDocName: attachedDocName
        }
        console.log(req.body, "put api req.body")
        const updatedStudent = await ExForeignStudentSchema.findOneAndUpdate({ _id: id }, updatingStudent, {new: true})
        console.log(updatedStudent, "updatedStudent")
        res.json({ error: false, message: "Thông tin học sinh sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-ex-f-student/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const delStudent = await ExForeignStudentSchema.findOne({ _id: id })
        const delStudentKey = delStudent.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(delStudentKey, "delStudentKey delete api")
        const newDeleteCommand = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${delStudentKey}`
        })
        const result = await s3.send(newDeleteCommand)
        console.log(result, ":::result, delete api:::")
        const deletingStudent = await ExForeignStudentSchema.findOneAndDelete({ _id: id })
        console.log(deletingStudent, "deletingStudent")
        res.json({ error: false, message: "Xóa thành công thông tin học sinh" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use('/api/create-ex-f-student', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const studentId = req.payload
        const docFile = req.file
        const delInitStudent = await ExForeignStudentSchema.deleteOne({ _id: studentId })
        console.log(delInitStudent, "deleted delInitStudent")
        if (!docFile) {
            next(error)
        } else {
            console.log('POST api error!! So, delete images just uploaded')
            const fileKey = docFile.Key
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${fileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, "::: s3 file deleted result, post api:::")
            next(error)
        }
    } catch (error) {
        console.log(error, "post error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' }) // nếu có lỗi gì xảy ra ở try block owr treen thì lỗi đc xử lí ở đây
    }
})

router.use('/api/edit-ex-f-student/:id', async(error, req, res, next) => {
    try {
        console.log(error, "error handle put api middleware")
        const { id } = req.params
        const docFile = req.file
        if (!docFile) {
            next(error)
        } else {
            const fileKey = docFile.Key
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${fileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, post api:::")
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

        if (error.code === "EMPTY_EFS_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        } else if (error.code === "EFS_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        } else if (error.code === "EMPTY_EFS_FILE_INPUT_ERROR") {
            console.log(error.code, "empty file input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        } else {
            return res.json({ error: true, message: "Something went wrong" })
        }

    }
    

})

module.exports = router