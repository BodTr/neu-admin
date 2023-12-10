const HTQTSchema = require('../models/htqt')
const MoumoaSchema = require('../models/moumoa')

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

module.exports = {
    initMoumoaDocMiddleware,
    initHTQTDocMiddleware
}