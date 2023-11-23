const mongoose = require('mongoose')

const ProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    year: {
        type: Number,
        require: false
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('ProgramSchema', ProgramSchema)