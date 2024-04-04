const mongoose = require('mongoose')

const EnrollmentSchema = new mongoose.Schema({
    year: { //*
        type: Number,
        require: false
    },
    enrollmentCount: { //*
        type: Number,
        require: false
    },
    admissionCount: { //*
        type: Number,
        require: false
    },
    transferStudents: { //*
        type: Number,
        require: false 
    },
    graduatedCount: { //*
        type: Number,
        require: false
    },
    admittedStudents: { //*
        type: Number,
        require: false
    },
    applicantsCount: { //*
        type: Number,
        require: false
    },
    dropoutCount: { //*
        type: Number,
        require: false
    },
    reservedStudents: { //*
        type: Number,
        require: false
    },
    trainingStudents: { //*
        type: Number,
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

module.exports = mongoose.model('EnrollmentSchema', EnrollmentSchema)