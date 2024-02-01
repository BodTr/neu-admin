const mongoose = require('mongoose')

const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserSchema',
          required: true,
        }
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60*60*365 }
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
module.exports = mongoose.model("RefreshTokenSchema", RefreshTokenSchema)