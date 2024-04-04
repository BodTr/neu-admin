const mongoose = require('mongoose')

const LecturerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    nationality: {
        type: String,
        require: false
    },
    unit: {
        type: String,
        require: false
    },
    contractStatus: {
        type: String,
        require: false
    },
    birthyear: {
        type: Number,
        require: false
    },
    level: {
        type: String,
        require: false
    },
    subject: {
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

module.exports = mongoose.model('LecturerSchema', LecturerSchema)