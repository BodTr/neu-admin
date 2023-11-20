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
})

module.exports = mongoose.model('ProgramSchema', ProgramSchema)