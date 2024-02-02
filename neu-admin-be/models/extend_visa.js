const mongoose = require('mongoose')

const ExtendVisaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    birthday: {
        type: String,
        require: false
    },
    sex: {
        type: String,
        require: false
    },
    nationality: {
        type: String,
        require: false
    },
    visaCode: {
        type: String,
        require: false
    },
    phoneNumber: {
        type: String,
        require: false
    },
    purpose: {
        type: String,
        require: false
    },
    job: {
        type: String,
        require: false
    },
    studentCode: {
        type: String,
        require: false
    },
    workPermit: {
        type: String,
        require: false
    },
    visaType: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    visaBeginDay: {
        type: String,
        require: false
    },
    visaEndDay: {
        type: String,
        require: false
    },
    suggestUnitLink: {
        type: String,
        require: false
    },
    decisionNumberLink: {
        type: String,
        require: false
    },
    attachedFileLink: {
        type: String,
        require: false
    },
    suggestUnitName: {
        type: String,
        require: false
    },
    decisionNumberName: {
        type: String,
        require: false
    },
    attachedFileName: {
        type: String,
        require: false
    },

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('ExtendVisaSchema', ExtendVisaSchema)