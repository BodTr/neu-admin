const mongoose = require('mongoose')

const ExForeignStudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    studentCode: {
        type: Number,
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
    receptionTime: {
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
    subject: {
        type: String,
        require: false
    },
    result: {
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

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('ExForeignStudentSchema', ExForeignStudentSchema)