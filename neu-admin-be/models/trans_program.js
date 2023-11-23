const mongoose = require('mongoose')

const TransProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    language: {
        type: String,
        require: false
    },
    degreeName: {
        type: String,
        require: false
    },
    degreeType: {
        type: String,
        require: false
    },
    issuedBy: {
        type: String,
        require: false
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('TransProgramSchema', TransProgramSchema)