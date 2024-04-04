const mongoose = require('mongoose')

const AgencySchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    unit: {
        type: String,
        require: false
    },

    progLeaderName: {
        type: String,
        require: false
    },
    progLeaderPosition: {
        type: String,
        require: false
    },
    progLeaderPhoneNumber: {
        type: String,
        require: false
    },
    progLeaderEmail: {
        type: String,
        require: false
    },
    progLeaderUnit: {
        type: String,
        require: false
    },

    progManagementName: {
        type: String,
        require: false
    },
    progManagementPosition: {
        type: String,
        require: false
    },
    progManagementPhoneNumber: {
        type: String,
        require: false
    },
    progManagementEmail: {
        type: String,
        require: false
    },
    progManagementUnit: {
        type: String,
        require: false
    },

    coordinatorName: {
        type: String,
        require: false
    },
    coordinatorPosition: {
        type: String,
        require: false
    },
    coordinatorPhoneNumber: {
        type: String,
        require: false
    },
    coordinatorEmail: {
        type: String,
        require: false
    },
    coordinatorUnit: {
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