const mongoose = require('mongoose')

const ExForeignStudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    studentCode: {
        type: String,
        require: false
    },
    position: {
        type: String,
        require: false
    },
    educationLevel: {
        type: String,
        require: false
    },
    receptionTimeFrom: {
        type: String,
        require: false
    },
    receptionTimeTo: {
        type: String,
        require: false
    },
    receptionYear: {
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
    passportCode: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: false
    },
    neuAccount: {
        type: String,
        require: false
    },
    major: {
        type: String,
        require: false
    },
    unit: {
        type: String,
        require: false
    },
    receptionDecision: {
        type: String,
        require: false
    },
    results: [{
        type: Object,
        require: false
    }],
    attachedDocLink: {
        type: String,
        require: false
    },
    attachedDocName: {
        type: String,
        require: false
    },

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('ExForeignStudentSchema', ExForeignStudentSchema)