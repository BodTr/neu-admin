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
    executionTime: {
        type: String,
        require: false
    },
    year: {
        type: Number,
        require: false
    },
    creditsCount: {
        type: Number,
        require: false
    },
    note: {
        type: String,
        require: false
    },
    studentsCount: {
        type: Number,
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