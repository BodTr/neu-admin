const mongoose = require('mongoose')

const ProgramCommitmentSchema = new mongoose.Schema({
    neuCommitment: {
        type: String,
        require: false
    },
    responsibilityToStudents: {
        type: String,
        require: false
    },
    partnerCommitment: {
        type: String,
        require: false
    },
    riskManagement: {
        type: String,
        require: false
    },
    minStudents: {
        type: Number,
        require: false
    },
    securityRegulation: {
        type: String,
        require: false
    },
    intellectualPropertyRegulation: {
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

module.exports = mongoose.model('ProgramCommitmentSchema', ProgramCommitmentSchema)