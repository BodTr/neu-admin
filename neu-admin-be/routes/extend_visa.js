const express = require('express')
const router = express.Router()
const ExtendVisaSchema = require('../models/extend_visa')
const ExcelJs = require("exceljs")
const { emptyExtendVisaInputsValidation, typeExtendVisaInputsValidation, emptyFileExtendVisaInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initExtendVisaMiddleware } = require('../helpers/init_doc')
const { upload, uploadToServer } = require('../helpers/multer_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')

const ObjectId = require("mongodb").ObjectId

const config = {
    // credential
}

const s3 = new S3Client(config)

const uploadFileFields = upload.fields([
    {name: 'suggestUnit', maxCount: 1},
    {name: 'decisionNumber', maxCount: 1},
    {name: 'attachedFile', maxCount: 1}
])

const uploadFileFields1 = upload.fields([
    {name: 'suggestUnit1', maxCount: 1},
    {name: 'decisionNumber1', maxCount: 1},
    {name: 'attachedFile1', maxCount: 1}
])

router.use(authenticateAccessToken)

router.get('/api/get-all-extend-visas', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const extendVisas = await ExtendVisaSchema.find({
            visaEndDay: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await ExtendVisaSchema.estimatedDocumentCount()
        let stt = 0
        
        const aExtendVisas = extendVisas.map( doc => {
            stt++
            let avisaEndDay = doc.visaEndDay
            let a_visaEndDay = avisaEndDay.split("-")
            
            // const id = doc._id.toString()
            const visaEndDay = new Date(doc.visaEndDay)
            const timeNow = new Date()
            let status = 1 // 1 là còn hạn, 2 là sắp hết hạn, 3 là hết hạn
            if (timeNow > visaEndDay) {
                status = 3 // Trường hợp hết hạn
            } else if (visaEndDay - timeNow <= 2592000000) { // visaEndDay - timeNow sẽ ra thời gian chênh lệch theo mili giây, 2592000000ms = 30 ngày
                status = 2 // Trường hợp sắp hết hạn
            } else {
                status = 1 // Trường hợp còn hạn
            }
            doc.visaEndDay = a_visaEndDay[2] + "/" + a_visaEndDay[1] + "/" + a_visaEndDay[0]
            return {
                ...doc,
                stt: stt,
                status: status
            }
        })
        console.log(aExtendVisas, "aExtendVisas")
        res.json({ data: aExtendVisas, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-extend-visa', initExtendVisaMiddleware, uploadFileFields, emptyFileExtendVisaInputValidation, async (req, res, next) => {
    try {
        const { name, birthday, sex, nationality, visaCode, phoneNumber, purpose, job, studentCode, workPermit, visaType, address, visaBeginDay, visaEndDay } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        const extendVisaId = req.payload
        console.log(extendVisaId, "extendVisaId post api")
        const suggestUnitArr = req.files['suggestUnit']
        const decisionNumberArr = req.files['decisionNumber']
        const attachedFileArr = req.files['attachedFile']
        const suggestUnit = suggestUnitArr[0]
        const decisionNumber = decisionNumberArr[0]
        const attachedFile = attachedFileArr[0]
        console.log(suggestUnit, "suggestUnit, post api")
        console.log(decisionNumber, "decisionNumber, post api")
        console.log(attachedFile, "attachedFile, post api")
        const suggestUnitLink = suggestUnit.location
        const suggestUnitName = suggestUnit.originalname
        const decisionNumberLink = decisionNumber.location
        const decisionNumberName = decisionNumber.originalname
        const attachedFileLink = attachedFile.location
        const attachedFileName = attachedFile.originalname

        const newExtendVisa = {
            name: name,
            birthday: birthday,
            sex: sex,
            nationality: nationality,
            visaCode: visaCode,
            phoneNumber: phoneNumber,
            purpose: purpose,
            job: job,
            studentCode: studentCode,
            workPermit: workPermit,
            visaType: visaType,
            address: address,
            visaBeginDay: visaBeginDay,
            visaEndDay: visaEndDay,
            suggestUnitLink: suggestUnitLink,
            decisionNumberLink: decisionNumberLink,
            attachedFileLink: attachedFileLink,
            suggestUnitName: suggestUnitName,
            decisionNumberName: decisionNumberName,
            attachedFileName: attachedFileName,
        }
        console.log(newExtendVisa, "newExtendVisa")
        const storingExtendVisa = await ExtendVisaSchema.findOneAndUpdate({ _id: extendVisaId }, newExtendVisa, {new: true})
        console.log(storingExtendVisa, "storingExtendVisa")
        res.json({ error: false, message: 'Lưu thành công thông tinh visa' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        // res.json({ error: true, message: "something went wrong" })
        next(error)
    }
})

router.put('/api/edit-extend-visa/:id', uploadFileFields1, async(req, res) => {
    try {
        const { id } = req.params
        const { name, birthday, sex, nationality, visaCode, phoneNumber, purpose, job, studentCode, workPermit, visaType, address, visaBeginDay, visaEndDay, suggestUnitName, decisionNumberName, fileName, suggestUnitLink, decisionNumberLink, fileLink } = req.body
        console.log(req.files, "req.file put api")
        console.log(req.body, "req.body put api")
        const suggestUnitArr = req.files['suggestUnit1']
        const decisionNumberArr = req.files['decisionNumber1']
        const attachedFileArr = req.files['attachedFile1']
        
        // const attachedScoreDoc = attachedScoreDocArr[0]
        let newSuggestUnitLink = ''
        let newDecisionNumberLink = ''
        let newFileLink = ''

        if (suggestUnitArr) {
            const suggestUnit = suggestUnitArr[0]
            const oldExFileKey = suggestUnitLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(oldExFileKey, "suggestUnitLink put api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${oldExFileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, put api:::")
            newSuggestUnitLink = suggestUnit.location

        } else {
            newSuggestUnitLink = suggestUnitLink
        }

        if (decisionNumberArr) {
            const decisionNumber = decisionNumberArr[0]
            const oldExFileKey = decisionNumberLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(oldExFileKey, "decisionNumberLink put api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${oldExFileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, put api:::")
            newDecisionNumberLink = decisionNumber.location

        } else {
            newDecisionNumberLink = decisionNumberLink
        }

        if (attachedFileArr) {
            const attachedFile = attachedFileArr[0]
            const oldExFileKey = fileLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(oldExFileKey, "fileLink put api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${oldExFileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, put api:::")
            newFileLink = attachedFile.location

        } else {
            newFileLink = fileLink
        }

        console.log(id, "::put api id::")
        const updatingExtendVisa = {
            name: name,
            birthday: birthday,
            sex: sex,
            nationality: nationality,
            visaCode: visaCode,
            phoneNumber: phoneNumber,
            purpose: purpose,
            job: job,
            studentCode: studentCode,
            workPermit: workPermit,
            visaType: visaType,
            address: address,
            visaBeginDay: visaBeginDay,
            visaEndDay: visaEndDay,
            suggestUnitLink: newSuggestUnitLink,
            decisionNumberLink: newDecisionNumberLink,
            attachedFileLink: newFileLink,
            suggestUnitName: suggestUnitName,
            decisionNumberName: decisionNumberName,
            attachedFileName: fileName,
        }
        const updatedExtendVisa = await ExtendVisaSchema.findOneAndUpdate({ _id: id }, updatingExtendVisa, {new: true})
        console.log(updatedExtendVisa, "updatedExtendVisa")
        res.json({ error: false, message: "Thông tin học sinh sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-extend-visa/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const delExtendVisa = await ExtendVisaSchema.findOne({ _id: id })
        const suggestUnitLink = delExtendVisa.suggestUnitLink
        const decisionNumberLink = delExtendVisa.decisionNumberLink
        const attachedFileLink = delExtendVisa.attachedFileLink
        if (suggestUnitLink === '' || suggestUnitLink === undefined) {
            console.log('ko có suggestUnitLink delete-decision api')
        } else {
            const delExtendVisaKey1 = suggestUnitLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delExtendVisaKey1, "delExtendVisaKey1 delete api")
            const newDeleteCommand1 = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delExtendVisaKey1}`
            })
            const result1 = await s3.send(newDeleteCommand1)
            console.log(result1, "result1 /api/delete-extend-visa/")
        }

        if (decisionNumberLink === '' || decisionNumberLink === undefined) {
            console.log('ko có decisionNumberLink delete-decision api')
        } else {
            const delExtendVisaKey2 = decisionNumberLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delExtendVisaKey2, "delExtendVisaKey delete api")
            const newDeleteCommand2 = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delExtendVisaKey2}`
            })
            const result2 = await s3.send(newDeleteCommand2)
            console.log(result2, "result2 /api/delete-extend-visa/")
        }

        if (attachedFileLink === '' || attachedFileLink === undefined) {
            console.log('ko có attachedFileLink delete-decision api')
        } else {
            const delExtendVisaKey3 = attachedFileLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delExtendVisaKey3, "delExtendVisaKey3 delete api")
            const newDeleteCommand3 = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delExtendVisaKey3}`
            })
            const result3 = await s3.send(newDeleteCommand3)
            console.log(result3, "result3 /api/delete-extend-visa/")
        }


        // console.log(result1, result2, result3, ":::result, delete api:::")
        const deletingExtendVisa = await ExtendVisaSchema.findOneAndDelete({ _id: id })
        console.log(deletingExtendVisa, "deletingExtendVisa")
        res.json({ error: false, message: "Xóa thành công" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.get('/api/export-excel-extend-visas', async (req, res) => {
    try {
        const visas = await ExtendVisaSchema.find().lean()
        let stt = 0
        const aVisas = visas.map(doc => {
            stt++
            let avisaEndDay = doc.visaEndDay
            let abirthday = doc.birthday
            let avisaBeginDay = doc.visaBeginDay
            let a_visaEndDay = avisaEndDay.split("-")
            let a_birthday = abirthday.split("-")
            let a_visaBeginDay = avisaBeginDay.split("-")
            
            // const id = doc._id.toString()
            const visaEndDay = new Date(doc.visaEndDay)
            const timeNow = new Date()
            let status = '' // 1 là còn hạn, 2 là sắp hết hạn, 3 là hết hạn
            if (timeNow > visaEndDay) {
                status = 'Hết hạn' // Trường hợp hết hạn
            } else if (visaEndDay - timeNow <= 2592000000) { // visaEndDay - timeNow sẽ ra thời gian chênh lệch theo mili giây, 2592000000ms = 30 ngày
                status = 'Sắp hết hạn' // Trường hợp sắp hết hạn
            } else {
                status = 'Còn hạn' // Trường hợp còn hạn
            }
            doc.visaEndDay = a_visaEndDay[2] + "/" + a_visaEndDay[1] + "/" + a_visaEndDay[0]
            doc.birthday = a_birthday[2] + "/" + a_birthday[1] + "/" + a_birthday[0]
            doc.visaBeginDay = a_visaBeginDay[2] + "/" + a_visaBeginDay[1] + "/" + a_visaBeginDay[0]
            return {
                ...doc,
                stt: stt,
                status: status
            }
        })
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("visas")
        sheet.columns = [
            {header: "STT", key:"stt", width: 10},
            {header: "HỌ VÀ TÊN", key:"name", width: 30},//
            {header: "NGÀY SINH", key:"birthday", width: 30},//
            {header: "GIỚI TÍNH", key:"sex", width: 30},//
            {header: "MỤC ĐÍCH", key:"purpose", width: 20},//
            {header: "QUỐC TỊCH", key:"nationality", width: 20},//
            {header: "SỐ HỘ CHIẾU", key:"visaCode", width: 10},//
            {header: "LOẠI HỘ CHIẾU", key:"visaType", width: 10},//
            {header: "SỐ ĐIỆN THOẠI", key:"phoneNumber", width: 10},//
            {header: "NGHỀ NGHIỆP", key:"job", width: 15},//
            {header: "SỐ GIẤY PHÉP LAO ĐỘNG", key:"workPermit", width: 10},//
            {header: "MÃ SỐ SINH VIÊN", key:"studentCode", width: 10},//
            {header: "NGÀY BẮT ĐẦU", key:"visaBeginDay", width: 30},//
            {header: "NGÀY HẾT HẠN", key:"visaEndDay", width: 30},//
            {header: "ĐỊA CHỈ TẠM TRÚ", key:"address", width: 30},//
            // {header: "TRẠNG THÁI", key:"status", width: 20},//
            {header: "TÊN VĂN BẢN ĐƠN VỊ ĐỀ NGHỊ", key:"suggestUnitName", width: 40},//
            {header: "LINK VĂN BẢN ĐƠN VỊ ĐỀ NGHỊ", key:"suggestUnitLink", width: 40},//
            {header: "TÊN VĂN BẢN SỐ QUYẾT ĐỊNH", key:"decisionNumberName", width: 40},//
            {header: "LINK VĂN BẢN SỐ QUYẾT ĐỊNH", key:"decisionNumberLink", width: 40},//
            {header: "TÊN ẢNH HOẶC FILE PFD", key:"attachedFileName", width: 40},//
            {header: "LINK ẢNH HOẶC FILE PFD", key:"attachedFileLink", width: 40},//
        ]

        aVisas.map(visa => {
            sheet.addRow({
                stt: visa.stt,
                name: visa.name,
                birthday: visa.birthday,
                sex: visa.sex,
                purpose: visa.purpose,
                nationality: visa.nationality,
                visaCode: visa.visaCode,
                visaType: visa.visaType,
                phoneNumber: visa.phoneNumber,
                job: visa.job,
                workPermit: visa.workPermit,
                studentCode: visa.studentCode,
                visaBeginDay: visa.visaBeginDay,
                visaEndDay: visa.visaEndDay,
                address: visa.address,
                // status: visa.status,
                suggestUnitName: visa.suggestUnitName,
                suggestUnitLink: visa.suggestUnitLink,
                decisionNumberName: visa.decisionNumberName,
                decisionNumberLink: visa.decisionNumberLink,
                attachedFileName: visa.attachedFileName,
                attachedFileLink: visa.attachedFileLink,

            })
        })
        await workbook.xlsx.writeFile(`public/Cấp-gia hạn visa.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Cấp-gia hạn visa.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-extend-visas catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-visas-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-cap-gia-han-visa.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-visas-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-visas-data', uploadToServer.single("visas-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-visas-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importVisasArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            // console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importVisasArr.push({
                    name: row.values[2],
                    birthday: row.values[3],
                    sex: row.values[4],
                    purpose: row.values[5],
                    nationality: row.values[6],
                    visaCode: row.values[7],
                    visaType: row.values[8],
                    phoneNumber: row.values[9],
                    job: row.values[10],
                    workPermit: row.values[11],
                    studentCode: row.values[12],
                    visaBeginDay: row.values[13],
                    visaEndDay: row.values[14],
                    address: row.values[15],
                    
                    program: {
                        id: programId
                    }
                })
            }
            
        })
        console.log(importVisasArr, "importVisasArr /api/import-visas-data")
        const savedImportVisas = await ExtendVisaSchema.insertMany(importVisasArr)
        console.log(savedImportVisas, "savedImportVisas /api/import-visas-data")
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

router.use('/api/create-extend-visa', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const extendVisaId = req.payload
        const suggestUnitArr = req.files['suggestUnit']
        const decisionNumberDocArr = req.files['decisionNumber']
        const attachedFileArr = req.files['attachedFile']
        const delInitStudent = await ExtendVisaSchema.deleteOne({ _id: extendVisaId })
        console.log(delInitStudent, "deleted delInitStudent")
        if (!suggestUnitArr && !decisionNumberDocArr && !attachedFileArr) {
            next(error)
        } else {
            if (suggestUnitArr) {
                const suggestUnitKey = suggestUnitArr[0].key
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${suggestUnitKey}`
                })
                const result1 = await s3.send(newDeleteCommand)
                console.log(result1, "xóa file suggestUnit khi post api lỗi")
            }
            if (decisionNumberDocArr) {
                const decisionNumberDocKey = decisionNumberDocArr[0].key
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${decisionNumberDocKey}`
                })
                const result2 = await s3.send(newDeleteCommand)
                console.log(result2, "xóa file decisionNumber khi post api lỗi")
            }
            if (attachedFileArr) {
                const attachedFileKey = attachedFileArr[0].key
                const newDeleteCommand = new DeleteObjectCommand({
                    Bucket: 'acvnapps',
                    Key: `${attachedFileKey}`
                })
                const result3 = await s3.send(newDeleteCommand)
                console.log(result3, "xóa file attachedFile khi post api lỗi")
            }
            next(error)
        }
    } catch (error) {
        console.log(error, "post error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' }) // nếu có lỗi gì xảy ra ở try block owr treen thì lỗi đc xử lí ở đây
    }
})

router.use('/api/edit-extend-visa/:id', async(error, req, res, next) => {
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

        if (error.code === "EMPTY_EV_FILE_INPUT_ERROR") {
            console.log(error.code, "empty file input error")
            return res.json({ error: true, message: "Chưa chọn file nào" })
        }

    }
    

})

module.exports = router