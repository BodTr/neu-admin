const mongoose = require('mongoose')

const DecisionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    detail: {
        type: String,
        require: false
    },
    number: {
        type: String,
        require: false
    },
    signDate: {
        type: String,
        require: false
    },
    expireIn: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model('DecisionSchema', DecisionSchema)