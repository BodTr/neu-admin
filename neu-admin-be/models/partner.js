const mongoose = require('mongoose')

const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    name_en: {
        type: String,
        require: false
    },
    rank: {
        type: String,
        require: false
    },

    contact: {
        type: Object,
        require: false
    },

    leader_school: {
        type: Object,
        require: false
    },

    leader_org: {
        type: Object,
        require: false
    },
    
    represent_foreign: {
        type: Object,
        require: false
    },

    charge:{
        type: Object,
        require: false
    },

    test: {
        type: String,
        require: false
    },
    testDetail: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    website: {
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

module.exports = mongoose.model('PartnerSchema', PartnerSchema)