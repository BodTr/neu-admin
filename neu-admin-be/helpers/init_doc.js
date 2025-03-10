const HTQTSchema = require('../models/htqt')
const MoumoaSchema = require('../models/moumoa')
const ExForeignStudentSchema = require('../models/ex_foreign_student')
const ExStudentSchema = require('../models/ex_student')
const ExtendVisaSchema = require('../models/extend_visa')
const DecisionSchema = require('../models/decision')
const CloseDecisionSchema = require('../models/close_decision')
const DocumentSchema = require('../models/document')
const PartnerSchema = require('../models/partner')
const PlanSchema = require('../models/plan')
const EnrollmentSchema = require('../models/enrollment')
const StudentSchema = require('../models/student')

async function initStudentDocMiddleware(req, res, next) {
    try {
        const initDoc = await StudentSchema.create({
            name: 'init name'
        })
        const docId = initDoc._id.toString()
        req.payload = docId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_student_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initEnrollmentDocMiddleware(req, res, next) {
    try {
        const initDoc = await EnrollmentSchema.create({
            year: 0
        })
        const docId = initDoc._id.toString()
        req.payload = docId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_enrollment_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initPlanDocMiddleware(req, res, next) {
    try {
        const initDoc = await PlanSchema.create({
            certName: 'init name'
        })
        const docId = initDoc._id.toString()
        req.payload = docId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_plan_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initCloseDecisionDocMiddleware(req, res, next) {
    try {
        const initDoc = await CloseDecisionSchema.create({
            name: 'init name'
        })
        const docId = initDoc._id.toString()
        req.payload = docId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_close_decision_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initDocumentMiddleware(req, res, next) {
    try {
        const initDoc = await DocumentSchema.create({
            name: 'init name'
        })
        const docId = initDoc._id.toString()
        req.payload = docId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_document :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initDecisionDocMiddleware(req, res, next) {
    try {
        const initDoc = await DecisionSchema.create({
            name: 'init name'
        })
        const docId = initDoc._id.toString()
        req.payload = docId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_decision_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

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
        console.log(error, "::: middleware init_ex_f_student_doc :::")
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
        console.log(error, "::: middleware init_ex_student_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initExtendVisaMiddleware(req, res, next) {
    try {
        const initDoc = await ExtendVisaSchema.create({
            name: 'init name'
        })

        const extendVisaId = initDoc._id.toString()
        req.payload = extendVisaId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_ex_visa_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

async function initPartnerMiddleware(req, res, next) {
    try {
        const initDoc = await PartnerSchema.create({
            vn_name: 'init name'
        })

        const partnerId = initDoc._id.toString()
        req.payload = partnerId
        next()
    } catch (error) {
        console.log(error, "::: middleware init_partner_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

module.exports = {
    initMoumoaDocMiddleware,
    initHTQTDocMiddleware,
    initexForeignStudentDocMiddleware,
    initExStudentMiddleware,
    initExtendVisaMiddleware,
    initDecisionDocMiddleware,
    initCloseDecisionDocMiddleware,
    initDocumentMiddleware,
    initPartnerMiddleware,
    initPlanDocMiddleware,
    initEnrollmentDocMiddleware,
    initStudentDocMiddleware,
}