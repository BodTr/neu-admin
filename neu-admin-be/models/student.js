const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    studentCode: {
        type: String,
        require: false
    },
    nation: {
        type: String,
        require: false
    },
    schoolYear: {
        type: String,
        require: false
    },
    tempResidence: {
        type: String,
        require: false
    },
    dien: {
        type: String,
        require: false
    },
    birthday: {
        type: String,
        require: false
    },
    sex: {
        type: String,
        require: false
    },
    major: {
        type: String,
        require: false
    },
    courseDuration: {
        type: String,
        require: false
    },
    monthCount: {
        type: String,
        require: false
    },
    bgdReceiveNumber: {
        type: String,
        require: false
    },
    bgdReceiveDate: {
        type: String,
        require: false
    },
    neuReceiveNumber: {
        type: String,
        require: false
    },
    neuReceiveDate: {
        type: String,
        require: false
    },
    expenses: {
        type: String,
        require: false
    },
    shp: {
        type: String,
        require: false
    },
    kpck: {
        type: String,
        require: false
    },
    nationalDayExpenses: {
        type: String,
        require: false
    },
    tetVnExpenses: {
        type: String,
        require: false
    },
    tetLaoCamExpenses: {
        type: String,
        require: false
    },
    travelExpenses: {
        type: String,
        require: false
    },
    initExpenses: {
        type: String,
        require: false
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

module.exports = mongoose.model('StudentSchema', StudentSchema)