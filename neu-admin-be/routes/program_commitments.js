const express = require('express')
const router = express.Router()
const ProgramCommitmentSchema = require('../models/program_commitment')
const { emptyProgramCommitmentInputValidation, typeProgramCommitmentInputValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const ObjectId = require("mongodb").ObjectId

router.use(authenticateAccessToken)
router.get('/api/get-all-commitments', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const commitment = await ProgramCommitmentSchema.find({
            program: { id: new ObjectId(id) }
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await ProgramCommitmentSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        let stt = 0
        const aCommitment = commitment.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aCommitment, "aCommitment")
        res.json({ data: aCommitment, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-commitment', async (req, res) => {
    try {
        const { neuCommitment, responsibilityToStudents, partnerCommitment, riskManagement, minStudents, securityRegulation, intellectualPropertyRegulation, programId } = req.body
        console.log(req.body, "req.body post api")
        const newCommitment = await ProgramCommitmentSchema.create({
            neuCommitment: neuCommitment,
            responsibilityToStudents: responsibilityToStudents,
            partnerCommitment: partnerCommitment,
            riskManagement: riskManagement,
            minStudents: minStudents,
            securityRegulation: securityRegulation,
            intellectualPropertyRegulation: intellectualPropertyRegulation,
            program: {
                id: programId
            }
        })
        console.log(newCommitment, "newCommitment")
        res.json({ error: false, message: 'Lưu thành công' })
        
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-commitment/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { neuCommitment, responsibilityToStudents, partnerCommitment, riskManagement, minStudents, securityRegulation, intellectualPropertyRegulation } = req.body
        console.log(id, "::put api id::")
        const updatingCommitment = {
            neuCommitment: neuCommitment,
            responsibilityToStudents: responsibilityToStudents,
            partnerCommitment: partnerCommitment,
            riskManagement: riskManagement,
            minStudents: minStudents,
            securityRegulation: securityRegulation,
            intellectualPropertyRegulation: intellectualPropertyRegulation
        }
        console.log(req.body, "put api req.body")
        const updatedCommitment = await ProgramCommitmentSchema.findOneAndUpdate({ _id: id }, updatingCommitment, {new: true})
        console.log(updatedCommitment, "updatedCommitment")
        res.json({ error: false, message: "Sửa thành công" })
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-commitment/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        const deletingCommitment = await ProgramCommitmentSchema.findOneAndDelete({ _id: id })
        console.log(deletingCommitment, "deletingCommitment")
        res.json({ error: false, message: "Xóa thành công" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

// router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
//     if (error) {
//         console.log(error, "custom error handler")

//         if (error.code === "EMPTY_PROGRAM_COMMITMENT_INPUTS_ERROR") {
//             console.log(error.code, "empty input error")
//             return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
//         }
    
//         if (error.code === "PROGRAM_COMMITMENT_INPUTS_TYPE_ERROR") {
//             console.log("input type error")
//             return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
//         }
//     }
    

// })

module.exports = router