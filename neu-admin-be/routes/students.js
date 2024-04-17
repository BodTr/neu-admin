const express = require('express')
const router = express.Router()
const StudentSchema = require('../models/student')
const { emptyStudentInputsValidation, typeStudentInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { initStudentDocMiddleware } = require('../helpers/init_doc')
const { upload } = require('../helpers/multer_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
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

router.use(authenticateAccessToken)
router.get('/api/get-all-students', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const students = await StudentSchema.find({
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await StudentSchema.estimatedDocumentCount()
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

router.post('/api/create-student', initStudentDocMiddleware, upload.single("decisionDoc"), async (req, res) => {
    try {
        const { name, studentCode, birthday, sex, nation, schoolYear, tempResidence, dien, major, courseDuration, monthCount, bgdReceiveNumber, bgdReceiveDate, neuReceiveNumber, neuReceiveDate, expenses, shp, kpck, nationalDayExpenses, tetVnExpenses, tetLaoCamExpenses, travelExpenses, initExpenses, decisionNumber, decisionDate, decisionTime } = req.body;
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file create-student api")
        const studentId = req.payload
        const attachedDoc = req.file
        let attachedDocLink = ""
        let attachedDocName = ""
        if (!attachedDoc) {
            attachedDocLink = ""
            attachedDocName = ""
        } else {
            attachedDocLink = attachedDoc.location
            attachedDocName = attachedDoc.originalname
        }

        const newStudent = {
            name: name,
            studentCode: studentCode,
            birthday: birthday,
            sex: sex,
            nation: nation,
            schoolYear: schoolYear,
            tempResidence: tempResidence,
            dien: dien,
            major: major,
            courseDuration: courseDuration,
            monthCount: monthCount,
            bgdReceiveNumber: bgdReceiveNumber,
            bgdReceiveDate: bgdReceiveDate,
            neuReceiveNumber: neuReceiveNumber,
            neuReceiveDate: neuReceiveDate,
            expenses: expenses,
            shp: shp,
            kpck: kpck,
            nationalDayExpenses: nationalDayExpenses,
            tetVnExpenses: tetVnExpenses,
            tetLaoCamExpenses: tetLaoCamExpenses,
            travelExpenses: travelExpenses,
            initExpenses: initExpenses,
            decisionNumber: decisionNumber,
            decisionDate: decisionDate,
            decisionTime: decisionTime,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
        }
        const storingStudent = await StudentSchema.findOneAndUpdate({ _id: studentId }, newStudent, {new: true})
        console.log(storingStudent, "newStudent post api")
        res.json({ error: false, message: 'Lưu thành công' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
        // next(error)
    }
})

router.put('/api/edit-student/:id', upload.single("decisionDoc1"), async(req, res) => {
    try {
        const { id } = req.params
        const { name, studentCode, birthday, sex, nation, schoolYear, tempResidence, dien, major, courseDuration, monthCount, bgdReceiveNumber, bgdReceiveDate, neuReceiveNumber, neuReceiveDate, expenses, shp, kpck, nationalDayExpenses, tetVnExpenses, tetLaoCamExpenses, travelExpenses, initExpenses, decisionNumber, decisionDate, decisionTime, attachedDocLink, attachedDocName} = req.body;
        console.log(req.body, "req.body edit-student api")
        console.log(req.file, "req.file edit-student api")
        const attachedDoc = req.file
        let newAttachedDocLink = ''
        if (attachedDoc) {
            if (attachedDocLink === "") {
                console.log('ko có link ảnh cũ edit-student api')
            } else {
                const oldFileKey = attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
                console.log(oldFileKey, "oldFileKey put api")
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${oldFileKey}`
                })
                const result = await s3.send(newDeleteCommand)
                console.log(result, ":::result, newDeleteCommand put api:::")
            }
            newAttachedDocLink = attachedDoc.location
        } else {
            newAttachedDocLink = attachedDocLink
        }
        const updatingStudent = ({
            name: name,
            studentCode: studentCode,
            birthday: birthday,
            sex: sex,
            nation: nation,
            schoolYear: schoolYear,
            tempResidence: tempResidence,
            dien: dien,
            major: major,
            courseDuration: courseDuration,
            monthCount: monthCount,
            bgdReceiveNumber: bgdReceiveNumber,
            bgdReceiveDate: bgdReceiveDate,
            neuReceiveNumber: neuReceiveNumber,
            neuReceiveDate: neuReceiveDate,
            expenses: expenses,
            shp: shp,
            kpck: kpck,
            nationalDayExpenses: nationalDayExpenses,
            tetVnExpenses: tetVnExpenses,
            tetLaoCamExpenses: tetLaoCamExpenses,
            travelExpenses: travelExpenses,
            initExpenses: initExpenses,
            decisionNumber: decisionNumber,  
            decisionDate: decisionDate,
            decisionTime: decisionTime,
            attachedDocLink: newAttachedDocLink,
            attachedDocName: attachedDocName

        })
        const updatedStudent = await StudentSchema.findOneAndUpdate({ _id: id }, updatingStudent, {new: true})
        console.log(updatedStudent, "updatedStudent put api")
        res.json({ error: false, message: "Thông tin học sinh sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-student/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingStudent = await StudentSchema.findOneAndDelete({ _id: id })
        const attachedDocLink = deletingStudent.attachedDocLink
        if (attachedDocLink === "") {
            console.log('ko có link ảnh cũ delete-student api')
        } else {
            const delDecisionKey = deletingStudent.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delDecisionKey, "delDecisionKey delete-student api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delDecisionKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, "newDeleteCommand result delete api")

        }
        console.log(deletingStudent, "deletingStudent")
        res.json({ error: false, message: "Xóa thành công thông tin học sinh" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use('/api/create-student', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const decisionId = req.payload
        const docFile = req.file
        const delInitDecision = await StudentSchema.deleteOne({ _id: decisionId })
        console.log(delInitDecision, "deleted delInitDecision")
        if (!docFile) {
            next(error)
        } else {
            console.log('POST api error!! So, delete image just uploaded')
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

router.use('/api/edit-student/:id', async(error, req, res, next) => {
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
            console.log(result, ":::result, error handle put api middleware:::")
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

        // if (error.code === "EMPTY_STUDENT_INPUTS_ERROR") {
        //     console.log(error.code, "empty input error")
        //     return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        // } else if (error.code === "STUDENT_INPUTS_TYPE_ERROR") {
        //     console.log("input type error")
        //     return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        // } else {
        //     return res.json({ error: true, message: "Something went wrong" })
        // }

    }
    

})

module.exports = router