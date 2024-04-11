const mongoose = require('mongoose')

const ProcessSchema = new mongoose.Schema({
    evaluationForm: {
        type: String,
        require: false
    },
    evaluateProgramQuality: {
        type: String,
        require: false
    },
    processes: [{
        type: Object,
        require: false
    }],
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

module.exports = mongoose.model('ProcessSchema', ProcessSchema)