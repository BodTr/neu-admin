const express = require('express')
const router = express.Router()
const CloseDecisionSchema = require('../models/close_decision')
const { emptyCloseDecisionInputsValidation, typeCloseDecisionInputsValidation, emptyFileCloseDecisionInputValidation } = require('../helpers/input_validate_middleware')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { initCloseDecisionDocMiddleware } = require('../helpers/init_doc')
const { authenticateAccessToken } = require('../helpers/jwt_services')
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

router.use(authenticateAccessToken)
router.get('/api/get-all-close-decisions', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const decisions = await CloseDecisionSchema.find({
            program: { id: new ObjectId(id) },
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await CloseDecisionSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aDecisions = decisions.map( doc => {
            stt++
            let signDate = doc.signDate
            let a_signDate = signDate.split("-")
            doc.signDate = a_signDate[2] + "/" + a_signDate[1] + "/" + a_signDate[0]
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aDecisions, "aDecisions")
        res.json({ data: aDecisions, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-close-decision', initCloseDecisionDocMiddleware, upload.single("closeDecisionDoc"), async (req, res) => {
    try {
        const { programId, name, detail, number, signDate, expireIn } = req.body
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload post api")
        console.log(req.file, "req.file create-close-decision api")
        const closeDecisionId = req.payload
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
        const newCloseDecision = {
            name: name,
            detail: detail,
            number: number,
            attachedDocLink: attachedDocLink,
            attachedDocName: attachedDocName,
            signDate: signDate,
            expireIn: expireIn,
            program: {
                id: programId
            }
        }

        const storingCloseDecision = await CloseDecisionSchema.findOneAndUpdate({ _id: closeDecisionId }, newCloseDecision, {new: true})
        console.log(storingCloseDecision, "storingCloseDecision")
        res.json({ error: false, message: 'Lưu thành công quyết định' })
        
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-close-decision/:id',  upload.single("closeDecisionDoc1"), async(req, res) => {
    try {
        const { id } = req.params
        const { name, detail, number, signDate, expireIn, attachedDocLink, attachedDocName} = req.body
        console.log(id, "::put api id::")
        const closeDecisionDoc1 = req.file
        console.log(closeDecisionDoc1, "closeDecisionDoc1 put api")
        let newAttachedDocLink = ''
        if(closeDecisionDoc1) {
            if (attachedDocLink === "") {
                console.log('ko có link ảnh cũ edit-close-decision api')
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
            newAttachedDocLink = closeDecisionDoc1.location
        } else {
            newAttachedDocLink = attachedDocLink
        }


        const updatingDecision = {
            name: name,
            detail: detail,
            number: number,
            attachedDocLink: newAttachedDocLink,
            attachedDocName: attachedDocName,
            signDate: signDate,
            expireIn: expireIn
        }
        console.log(req.body, "put api req.body")
        const updatedDecision = await CloseDecisionSchema.findOneAndUpdate({ _id: id }, updatingDecision, {new: true})
        console.log(updatedDecision, "updatedDecision")
        res.json({ error: false, message: "Quyết định đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-close-decision/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingDecision = await CloseDecisionSchema.findOne({ _id: id })
        console.log(deletingDecision, "deletingDecision")
        const attachedDocLink = deletingDecision.attachedDocLink
        if (attachedDocLink === "") {
            console.log('ko có link ảnh cũ delete-close-decision api')
        } else {
            const delDecisionKey = deletingDecision.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delDecisionKey, "delDecisionKey delete-close-decision api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delDecisionKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, "newDeleteCommand result delete api")
        }

        const delDecision = await CloseDecisionSchema.findOneAndDelete({ _id: id })
        console.log(delDecision, "delDecision")
        res.json({ error: false, message: "Xóa thành công quyết định" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use('/api/create-close-decision', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const decisionId = req.payload
        const docFile = req.file
        const delInitDecision = await CloseDecisionSchema.deleteOne({ _id: decisionId })
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

router.use('/api/edit-close-decision/:id', async(error, req, res, next) => {
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

        // if (error.code === "EMPTY_CLOSE_DECISION_FILE_INPUT_ERROR") {
        //     console.log(error.code, "empty input error")
        //     return res.json({ error: true, message: "Chưa chọn file nào" })
        // }
    
        // if (error.code === "DECISION_INPUTS_TYPE_ERROR") {
        //     console.log("input type error")
        //     return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        // }
    }
    

})

module.exports = router