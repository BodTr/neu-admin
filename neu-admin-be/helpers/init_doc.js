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
        console.log(error, "::: middleware news create_news_doc :::")
        res.json({ error: true, message: "Something went wrong!!" })
    }
}

module.exports = {
    initMoumoaDocMiddleware
}