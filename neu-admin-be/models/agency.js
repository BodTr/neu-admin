const mongoose = require('mongoose')

const AgencySchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: false
    },
    phoneNumber: {
        type: String,
        require: false
    },
    unit: {
        type: String,
        require: false
    },
    content: {
        type: String,
        require: false
    },
    position: {
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

module.exports = mongoose.model('AgencySchema', AgencySchema)