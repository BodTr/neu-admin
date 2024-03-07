const mongoose = require('mongoose')

const YearSchema = new mongoose.Schema({
    yearsArray: [{
        type: Number,
        require: false
    }]
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('YearSchema', YearSchema)