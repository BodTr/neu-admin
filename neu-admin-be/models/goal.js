const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    programGoal: {
        type: String,
        require: false
    },
    testDetail: {
        type: String,
        require: false
    },
    goalFrom: {
        type: String,
        
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

module.exports = mongoose.model('GoalSchema', GoalSchema)