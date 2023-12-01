const express = require('express')
const router = express.Router()
const PartnerSchema = require('../models/partner')
const { emptyPartnerInputsValidation, typePartnerInputsValidation } = require('../helpers/input_validate_middleware')

const ObjectId = require("mongodb").ObjectId

router.get('/api/get-all-partners', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const partners = await PartnerSchema.find({
            program: { id: new ObjectId(id) }
            ,name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await PartnerSchema.estimatedDocumentCount()
        let stt = 0
        const aPartners = partners.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aPartners, "aPartners")
        res.json({ data: aPartners, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-partner', emptyPartnerInputsValidation, typePartnerInputsValidation, async (req, res) => {
    try {
        const { programId, name, test, testDetail, address, website } = req.body
        console.log(req.body, "req.body post api")
        
        const existedPartner = await PartnerSchema.findOne({ name: name })
        if (existedPartner) {
            res.json({ error: true, message: "Đối tác đã tồn tại" })
        } else {
            
            const newPartner = await PartnerSchema.create({
                name: name,
                test: test,
                testDetail: testDetail,
                address: address,
                website: website,
                program: {
                    id: programId
                }
            })
            console.log(newPartner, "newPartner")
            res.json({ error: false, message: 'Lưu thành công đối tác' })
        }
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-partner/:id', emptyPartnerInputsValidation, typePartnerInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { name, test, testDetail, address, website } = req.body
        console.log(id, "::put api id::")
        const updatingPartner = {
            name: name,
            test: test,
            testDetail: testDetail,
            address: address,
            website: website
        }
        console.log(req.body, "put api req.body")
        const updatedPartner = await PartnerSchema.findOneAndUpdate({ _id: id }, updatingPartner, {new: true})
        console.log(updatedPartner, "updatedPartner")
        res.json({ error: false, message: "Đối tác đã được sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-partner/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingPartner = await PartnerSchema.findOneAndDelete({ _id: id })
        console.log(deletingPartner, "deletingPartner")
        res.json({ error: false, message: "Xóa thành công đối tác" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_PARTNER_INPUTS_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "PARTNER_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router