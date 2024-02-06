const mongoose = require('mongoose')

const DecisionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    detail: {
        type: String,
        require: false
    },
    number: {
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
    signDate: {
        type: String,
        require: false
    },
    expireIn: {
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

module.exports = mongoose.model('DecisionSchema', DecisionSchema)