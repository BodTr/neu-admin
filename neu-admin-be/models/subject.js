const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    lecturer: {
        type: String,
        require: false
    },
    teachingAssistant: {
        type: String,
        require: false
    },
    timeFrom: {
        type: String,
        require: false
    },
    timeTo: {
        type: String,
        require: false
    },
    year: {
        type: String,
        require: false
    },
    subjectCode: {
        type: String,
        require: false
    },
    review: {
        type: String,
        require: false
    },

    program: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProgramSchema',
            require: true
        }
    }

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('SubjectSchema', SubjectSchema)