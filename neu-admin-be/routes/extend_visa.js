const express = require('express')
const router = express.Router()
const ExtendVisaSchema = require('../models/extend_visa')
const { emptyExtendVisaInputsValidation, typeExtendVisaInputsValidation, emptyFileExtendVisaInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initExtendVisaMiddleware } = require('../helpers/init_doc')
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
        const delExtendVisaKey1 = delExtendVisa.suggestUnitLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(delExtendVisaKey1, "delExtendVisaKey1 delete api")
        const newDeleteCommand1 = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${delExtendVisaKey1}`
        })
        
        const delExtendVisaKey2 = delExtendVisa.decisionNumberLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(delExtendVisaKey2, "delExtendVisaKey delete api")
        const newDeleteCommand2 = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${delExtendVisaKey2}`
        })
        const delExtendVisaKey3 = delExtendVisa.attachedFileLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(delExtendVisaKey3, "delExtendVisaKey3 delete api")
        const newDeleteCommand3 = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${delExtendVisaKey3}`
        })
        const result1 = await s3.send(newDeleteCommand1)
        const result2 = await s3.send(newDeleteCommand2)
        const result3 = await s3.send(newDeleteCommand3)
        console.log(result1, result2, result3, ":::result, delete api:::")
        const deletingExtendVisa = await ExtendVisaSchema.findOneAndDelete({ _id: id })
        console.log(deletingExtendVisa, "deletingExtendVisa")
        res.json({ error: false, message: "Xóa thành công" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
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