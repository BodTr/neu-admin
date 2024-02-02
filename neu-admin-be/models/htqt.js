const mongoose = require('mongoose')

const HTQTSchema = new mongoose.Schema({
    nation: {
        type: String,
        require: false
    },
    partnerUni: {
        type: String,
        require: false
    },
    funding: {
        type: String,
        require: false
    },
    planDetail: {
        type: String,
        require: false
    },
    attachedDocLink: {
        type: String,
        require: false
    },
    attachedDocName: {
        type: String,
        require: false
    },
    signingTime: {
        type: String,
        require: false
    },
    expireTime: {
        type: String,
        require: false
    },
    note: {
        type: String,
        require: false
    },

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('HTQTSchema', HTQTSchema)