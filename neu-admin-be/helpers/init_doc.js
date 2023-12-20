const HTQTSchema = require('../models/htqt')
const MoumoaSchema = require('../models/moumoa')
const ExForeignStudentSchema = require('../models/ex_foreign_student')
const ExStudentSchema = require('../models/ex_student')
const ExtendVisaSchema = require('../models/extend_visa')

async function initMoumoaDocMiddleware(req, res, next) {
    try {
        const initDoc = await MoumoaSchema.create({
            nation: 'init nation'
        })

        const nationId = initDoc._id.toString()
        req.payload = nationId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_moumoa_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initHTQTDocMiddleware(req, res, next) {
    try {
        const initDoc = await HTQTSchema.create({
            nation: 'init nation'
        })

        const nationId = initDoc._id.toString()
        req.payload = nationId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_htqt_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initexForeignStudentDocMiddleware(req, res, next) {
    try {
        const initDoc = await ExForeignStudentSchema.create({
            name: 'init nation'
        })

        const studentId = initDoc._id.toString()
        req.payload = studentId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_htqt_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initExStudentMiddleware(req, res, next) {
    try {
        const initDoc = await ExStudentSchema.create({
            name: 'init name'
        })

        const exStudentId = initDoc._id.toString()
        req.payload = exStudentId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_moumoa_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initExtendVisaMiddleware(req, res, next) {
    try {
        const initDoc = await ExStudentSchema.create({
            name: 'init name'
        })

        const extendVisaId = initDoc._id.toString()
        req.payload = extendVisaId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_moumoa_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}
module.exports = {
    initMoumoaDocMiddleware,
    initHTQTDocMiddleware,
    initexForeignStudentDocMiddleware,
    initExStudentMiddleware,
    initExtendVisaMiddleware
}