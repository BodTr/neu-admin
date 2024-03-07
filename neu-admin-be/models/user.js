const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false,
    },
    username: {
        type: String,
        require: false,
        unique: true
    },
    password: {
        type: String,
        require: false
    },
    phoneNumber: {
        type: String,
        require: false
    },
    menuManageArray: [{
        type: String,
        require: false
    }],
    permission: {
        type: String,
        require: false
    }
    
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

module.exports = mongoose.model('UserSchema', UserSchema)