const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    content: {
        type: String,
        require: false
    },
    effDate: {
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

module.exports = mongoose.model('DocumentSchema', DocumentSchema)