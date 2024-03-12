const mongoose = require('mongoose')

const ExStudentSchema = new mongoose.Schema({
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
    department: {
        type: String,
        require: false
    },
    academicYear: {
        type: String,
        require: false
    },
    major: {
        type: String,
        require: false
    },
    studentCode: {
        type: String,
        require: false
    },
    exchangeTime: {
        type: String,
        require: false
    },
    exchangeYear: {
        type: String,
        require: false
    },
    receivingCountry: {
        type: String,
        require: false
    },
    partnerUni: {
        type: String,
        require: false
    },
    subject: {
        type: String,
        require: false
    },
    result: {
        type: String,
        require: false
    },
    exchangeDecision: {
        type: String,
        require: false
    },
    convertedScore: {
        type: String,
        require: false
    },
    attachedExDocLink: {
        type: String,
        require: false
    },
    attachedExDocName: {
        type: String,
        require: false
    },
    attachedScoreDocLink: {
        type: String,
        require: false
    },
    attachedScoreDocName: {
        type: String,
        require: false
    },
    results: [{
        type: Object,
        require: false
    }],

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('ExStudentSchema', ExStudentSchema)