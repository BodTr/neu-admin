const mongoose = require('mongoose')

const PartnerSchema = new mongoose.Schema({
    vn_name: {
        type: String,
        require: false
    },
    en_name: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    internationalRanking: {
        type: String,
        require: false
    },
    website: {
        type: String,
        require: false
    },

    contacterName: {
        type: String,
        require: false
    },

    contacterPosition: {
        type: String,
        require: false
    },

    contacterEmail: {
        type: String,
        require: false
    },

    contacterUnit: {
        type: String,
        require: false
    },

    uniLeaderName: {
        type: String,
        require: false
    },

    uniLeaderPosition: {
        type: String,
        require: false,
    },

    uniLeaderEmail: {
        type: String,
        require: false,
    },
    uniLeaderUnit: {
        type: String,
        require: false,
    },

    unitLeaderName: {
        type: String,
        require: false,
    },

    unitLeaderPosition: {
        type: String,
        require: false,
    },

    unitLeaderEmail: {
        type: String,
        require: false,
    },
    unitLeaderUnit: {
        type: String,
        require: false,
    },

    farName: {
        type: String,
        require: false,
    },

    farPosition: {
        type: String,
        require: false,
    },

    farEmail: {
        type: String,
        require: false,
    },

    farUnit: {
        type: String,
        require: false,
    },

    progManagerName: {
        type: String,
        require: false,
    },

    progManagerPosition: {
        type: String,
        require: false,
    },

    progManagerEmail: {
        type: String,
        require: false,
    },

    progManagerUnit: {
        type: String,
        require: false,
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