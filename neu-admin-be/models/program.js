const mongoose = require('mongoose')

const ProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    year: {
        type: Number,
        require: false
    },
    nation: {
        type: String,
        require: false
    },
    parterUni: {
        type: String,
        require: false
    },
    major: {
        type: String,
        require: false
    },
    quota: {
        type: Number,
        require: false
    },
    level: {
        type: String,
        require: false
    },
    agency: {
        type: String,
        require: false
    },
    agencyPhoneNumber: {
        type: Number,
        require: false
    },
    expiry: {
        type: String,
        require: false
    },
    status: {
        type: String,
        require: false
    },

    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserSchema',
            require: true
        }
    }
    
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('ProgramSchema', ProgramSchema)