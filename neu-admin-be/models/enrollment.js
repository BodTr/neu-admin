const mongoose = require('mongoose')

const EnrollmentSchema = new mongoose.Schema({
    year: {
        type: Number,
        require: false
    },
    admissionCount: {
        type: Number,
        require: false
    },
    graduatedCount: {
        type: Number,
        require: false
    },
    tuitionSum: {
        type: Number,
        require: false
    },
    applicantsCount: {
        type: Number,
        require: false
    },
    dropoutCount: {
        type: Number,
        require: false
    },
    graduatedPercentage: {
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

module.exports = mongoose.model('EnrollmentSchema', EnrollmentSchema)