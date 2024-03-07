const YearSchema = require('../models/years')
const ProgramSchema = require('../models/program')
async function initYear() { // getyearsArray
    try {
        const initYearsArray = await YearSchema.create({
            yearsArray: [1]
        })
        const id = initYearsArray._id.toString()
        return id
    } catch (error) {
        console.log("initYear function catch block error")
        return false
    }
}

module.exports = {
    initYear
}