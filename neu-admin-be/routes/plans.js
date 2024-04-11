const express = require('express')
const router = express.Router()
const PlanSchema = require('../models/plan')
const { emptyPlanlInputsValidation, typePlanInputsValidation, emptyFilePlanInputValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { initPlanDocMiddleware } = require('../helpers/init_doc')
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

router.get('/api/get-all-plans', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const plans = await PlanSchema.find({
            program: { id: new ObjectId(id) },
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await PlanSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aPlans = plans.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aPlans, "aPlans")
        res.json({ data: aPlans, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-plan', initPlanDocMiddleware, upload.single("planDoc"), emptyFilePlanInputValidation, emptyPlanlInputsValidation, typePlanInputsValidation, async (req, res) => {
    try {
        const { programId, qualifiedLecturer, qualifiedStudent, planStructure, tuition, infraCondition, language, ecoManage, } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file post api")
        const planId = req.payload
        const attachedDoc = req.file
        const attachedDocLink = attachedDoc.location
        const attachedDocName = attachedDoc.originalname
        const newPLan = {
            qualifiedLecturer: qualifiedLecturer,
            qualifiedStudent: qualifiedStudent,
            planStructure: planStructure,
            tuition: tuition,
            infraCondition: infraCondition,
            language: language,
            ecoManage: ecoManage,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
            program: {
                id: programId
            }
        }
        console.log(newPLan, "newPLan post api")
        const storingPlan = await PlanSchema.findOneAndUpdate({ _id: planId }, newPLan, { new: true })
        console.log(storingPlan, "storingPlan post api")
        res.json({ error: false, message: 'Lưu thành công đề án' })
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-plan/:id', upload.single("planDoc1"), emptyPlanlInputsValidation, typePlanInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { qualifiedLecturer, qualifiedStudent, planStructure, tuition, infraCondition, language, ecoManage, attachedDocName, attachedDocLink } = req.body
        console.log(id, "::put api id::")
        const attachedDoc = req.file 
        console.log(attachedDoc, "attachedDoc put api")
        let newAttachedDocLink = ''
        if (attachedDoc) {
            const oldFileKey = attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(oldFileKey, "oldFileKey put api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${oldFileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, newDeleteCommand put api:::")
            newAttachedDocLink = attachedDoc.location

        } else {
            newAttachedDocLink = attachedDocLink
        }
        const updatingPlan = {
            qualifiedLecturer: qualifiedLecturer,
            qualifiedStudent: qualifiedStudent,
            planStructure: planStructure,
            tuition: tuition,
            infraCondition: infraCondition,
            language: language,
            ecoManage: ecoManage,
            attachedDocLink: newAttachedDocLink,
            attachedDocName: attachedDocName
        }
        console.log(req.body, "put api req.body")
        const updatedPlan = await PlanSchema.findOneAndUpdate({ _id: id }, updatingPlan, {new: true})
        console.log(updatedPlan, "updatedPlan")
        res.json({ error: false, message: "Mục tiêu đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-plan/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingPlan = await PlanSchema.findOne({ _id: id })
        console.log(deletingPlan, "deletingPlan")
        const deletingPlanDocKey = deletingPlan.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
        console.log(deletingPlanDocKey, "deletingPlanDocKey delete api")
        const newDeleteCommand = new DeleteObjectCommand({
            Bucket: 'acvnapps',
            Key: `${deletingPlanDocKey}`
        })
        const result = await s3.send(newDeleteCommand)
        console.log(result, ":::result, delete api:::")
        const delPlan = await PlanSchema.findOneAndDelete({ _id: id })
        console.log(delPlan, "delPlan delete api")
        res.json({ error: false, message: "Xóa thành công mục tiêu" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use('/api/create-plan', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const planId = req.payload
        const docFile = req.file
        const delInitPlan = await PlanSchema.deleteOne({ _id: planId })
        console.log(delInitPlan, "delInitPlan error handle post api midddleware")
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
            console.log(result, "::: s3 file deleted result, post api error handle midddleware:::")
            next(error)
        }
    } catch (error) {
        console.log(error, "post error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' }) 
    }
})

router.use('/api/edit-plan/:id', async (error, req, res, next) => {
    try {
        console.log(error, "error handle edit api middleware")
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
        }
    } catch (error) {
        console.log(error, "put error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' })
    }
})


router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_PLAN_INPUTS_ERROR" || error.code === "EMPTY_PLAN_FILE_INPUT_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "PLAN_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})


module.exports = router