const express = require('express')
const router = express.Router()
const StudentSchema = require('../models/student')
const ExcelJs = require("exceljs")
const { emptyStudentInputsValidation, typeStudentInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { initStudentDocMiddleware } = require('../helpers/init_doc')
const { upload, uploadToServer } = require('../helpers/multer_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const ObjectId = require("mongodb").ObjectId

const config = {
    // credential
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
            if (!doc.birthday) {
                doc.birthday = ""
            } else {
                let birthday = ""
                birthday = doc.birthday
                let a_birthday = birthday.split("-")
                doc.birthday = a_birthday[2] + "/" + a_birthday[1] + "/" + a_birthday[0]
            }

            if (!doc.bgdReceiveDate) {
                doc.bgdReceiveDate = ""
            } else {
                let bgdReceiveDate = ""
                bgdReceiveDate = doc.bgdReceiveDate
                let a_bgdReceiveDate = bgdReceiveDate.split("-")
                doc.bgdReceiveDate = a_bgdReceiveDate[2] + "/" + a_bgdReceiveDate[1] + "/" + a_bgdReceiveDate[0]
            }
            

            if (!doc.neuReceiveDate) {
                doc.neuReceiveDate = ""
            } else {
                let neuReceiveDate = ""
                neuReceiveDate = doc.neuReceiveDate
                let a_neuReceiveDate = neuReceiveDate.split("-")
                doc.neuReceiveDate = a_neuReceiveDate[2] + "/" + a_neuReceiveDate[1] + "/" + a_neuReceiveDate[0]
            }

            if (!doc.decisionDate) {
                doc.decisionDate = ""
            } else {
                let decisionDate = ""
                decisionDate = doc.decisionDate
                let a_decisionDate = decisionDate.split("-")
                doc.decisionDate = a_decisionDate[2] + "/" + a_decisionDate[1] + "/" + a_decisionDate[0]
            }
            
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
            if (attachedDocLink === "" || attachedDocLink === undefined) {
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
        if (attachedDocLink === "" || attachedDocLink === undefined) {
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

router.get('/api/export-excel-students', async (req, res) => {
    try {
        const students = await StudentSchema.find().lean()
        let stt = 0
        const aStudents = students.map(doc => {
            stt++
            return {
                ...doc,
                stt: stt
            }
        })
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("students")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "HỌ VÀ TÊN", key:"name", width: 30},//
            {header: "MSSV", key:"studentCode", width: 15},//
            {header: "NGÀY SINH", key:"birthday", width: 20},//
            {header: "GIỚI TÍNH", key:"sex", width: 15},//
            {header: "QUỐC TỊCH", key:"nation", width: 20},//
            {header: "KHÓA", key:"schoolYear", width: 20},//
            {header: "NƠI Ở", key:"tempResidence", width: 30},//
            {header: "DIỆN", key:"dien", width: 20},//
            {header: "SỐ QĐTN CỦA BGD&ĐT", key:"bgdReceiveNumber", width: 20},//
            {header: "NGÀY QĐTN CỦA BGD&ĐT", key:"bgdReceiveDate", width: 20},//
            {header: "SỐ QĐTN CỦA TRƯỜNG", key:"neuReceiveNumber", width: 20},//
            {header: "NGÀY QĐTN CỦA TRƯỜNG", key:"neuReceiveDate", width: 20},//
            {header: "KHÓA HỌC", key:"courseDuration", width: 10},//
            {header: "CHUYÊN NGÀNH", key:"major", width: 10},//
            {header: "SỐ THÁNG", key:"monthCount", width: 10},//
            {header: "CHI THƯỜNG XUYÊN", key:"expenses", width: 20},//
            {header: "SHP", key:"shp", width: 20},//
            {header: "KPCK", key:"kpck", width: 20},//
            {header: "TIỀN QUỐC KHÁNH", key:"nationalDayExpenses", width: 20},//
            {header: "TIỀN TẾT VN", key:"tetVnExpenses", width: 20},//
            {header: "TIỀN TẾT LÀO, CAM", key:"tetLaoCamExpenses", width: 20},//
            {header: "TIỀN ĐI LẠI", key:"travelExpenses", width: 20},//
            {header: "TRANG CẤP BAN ĐẦU", key:"initExpenses", width: 20},//
            {header: "SỐ QĐ GIA HẠN", key:"decisionNumber", width: 20},//
            {header: "NGÀY GIA HẠN", key:"decisionDate", width: 20},//
            {header: "THỜI GIAN GIA HẠN", key:"decisionTime", width: 20},//
            {header: "TÊN QUYẾT ĐỊNH GIA HẠN", key:"attachedDocName", width: 20},//
            {header: "LINK QUYẾT ĐỊNH GIA HẠN", key:"attachedDocLink", width: 20},//
        ]
        aStudents.map(student => {
            sheet.addRow({
                stt: student.stt,
                name: student.name,
                studentCode: student.studentCode,
                birthday: student.birthday,
                sex: student.sex,
                nation: student.nation,
                schoolYear: student.schoolYear,
                tempResidence: student.tempResidence,
                dien: student.dien,
                bgdReceiveNumber: student.bgdReceiveNumber,
                bgdReceiveDate: student.bgdReceiveDate,
                neuReceiveNumber: student.neuReceiveNumber,
                neuReceiveDate: student.neuReceiveDate,
                courseDuration: student.courseDuration,
                major: student.major,
                monthCount: student.monthCount,
                expenses: student.expenses,
                shp: student.shp,
                kpck: student.kpck,
                nationalDayExpenses: student.nationalDayExpenses,
                tetVnExpenses: student.tetVnExpenses,
                tetLaoCamExpenses: student.tetLaoCamExpenses,
                travelExpenses: student.travelExpenses,
                initExpenses: student.initExpenses,
                decisionNumber: student.decisionNumber,
                decisionDate: student.decisionDate,
                decisionTime: student.decisionTime,
                attachedDocName: student.attachedDocName,
                attachedDocLink: student.attachedDocLink
            })
        })
        await workbook.xlsx.writeFile(`public/Quản lý lưu học sinh.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Quản lý lưu học sinh.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-students catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-students-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-quan-ly-luu-sinh-vien.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-students-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-students-data', uploadToServer.single("students-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-students-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importStudentsArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            // console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importStudentsArr.push({
                    name: row.values[2],
                    studentCode: row.values[3],
                    birthday: row.values[4],
                    sex: row.values[5],
                    nation: row.values[6],
                    schoolYear: row.values[7],
                    tempResidence: row.values[8],
                    dien: row.values[9],
                    bgdReceiveNumber: row.values[10],
                    bgdReceiveDate: row.values[11],
                    neuReceiveNumber: row.values[12],
                    neuReceiveDate: row.values[13],
                    courseDuration: row.values[14],
                    major: row.values[15],
                    monthCount: row.values[16],
                    expenses: row.values[17],
                    shp: row.values[18],
                    kpck: row.values[19],
                    nationalDayExpenses: row.values[20],
                    tetVnExpenses: row.values[21],
                    tetLaoCamExpenses: row.values[22],
                    travelExpenses: row.values[23],
                    initExpenses: row.values[24],
                    decisionNumber: row.values[25],
                    decisionDate: row.values[26],
                    decisionTime: row.values[27],
                    attachedDocName: row.values[28],
                    attachedDocLink: row.values[29],
                    program: {
                        id: programId
                    }
                })
            }
            
        })
        console.log(importStudentsArr, "importStudentsArr /api/import-students-data")
        const savedImportStudents = await StudentSchema.insertMany(importStudentsArr)
        console.log(savedImportStudents, "savedImportStudents /api/import-students-data")
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