const express = require('express')
const router = express.Router()
const ProgramSchema = require('../models/program')

const ObjectId = require("mongodb").ObjectId

router.get('/api/get-all-programs', async (req, res) => {
    try {
        let { page, limit, query } = req.query
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const programs = await ProgramSchema.find({
            name: {$regex: query}
        }).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await ProgramSchema.estimatedDocumentCount()
        let stt = 0
        const aPrograms = programs.map( doc => {
            stt++
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt
            }
        })
        console.log(aPrograms, "aPrograms")
        res.json({ data: aPrograms, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-program', async (req, res, next) => {
    try {
        const { name, year } = req.body
        console.log(req.body, "req.body post api")
        
    } catch (error) {
        
    }
})

module.exports = router