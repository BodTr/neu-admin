const mongoose = require('mongoose')

const CurriculumSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    year: {
        type: Number,
        require: false
    },
    location: {
        type: String,
        require: false
    },
    subjectType: {
        type: String,
        require: false
    },
    creditsCount: {
        type: Number,
        require: false
    },
    trainingUni: {
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

module.exports = mongoose.model('CurriculumSchema', CurriculumSchema)