const mongoose = require('mongoose')

const PlanSchema = new mongoose.Schema({
    year: {
        type: Number,
        require: false
    },
    qualifiedLecturer: {
        type: String,
        require: false
    },
    qualifiedStudent: {
        type: String,
        require: false
    },
    planStructure: {
        type: String,
        require: false
    },
    tuition: {
        type: String,
        require: false
    },
    infraCondition: {
        type: String,
        require: false
    },
    language: {
        type: String,
        require: false
    },
    ecoManage: {
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
    diploma: {
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

module.exports = mongoose.model('PlanSchema', PlanSchema)