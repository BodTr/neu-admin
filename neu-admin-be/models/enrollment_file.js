const mongoose = require('mongoose')

const EnrollmentDocsSchema = new mongoose.Schema({
    docLink: {
        type: String,
        require: false
    },

    docName: {
        type: String,
        require: false
    },

    docSize: {
        type: Number,
        require: false
    },

    docType: {
        type: String,
        require: false
    },

    program: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProgramSchema',
            require: false
        }
    },

    enrollment: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EnrollmentSchema',
            require: false
        }
    }
})

module.exports = mongoose.model('EnrollmentDocsSchema', EnrollmentDocsSchema)