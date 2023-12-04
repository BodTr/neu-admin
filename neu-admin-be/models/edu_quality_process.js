const mongoose = require('mongoose')

const ProcessSchema = new mongoose.Schema({
    mechanism: {
        type: String,
        require: false
    },
    detail: {
        type: String,
        require: false
    },
    hasProcess: {
        type: String,
        
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

module.exports = mongoose.model('ProcessSchema', ProcessSchema)