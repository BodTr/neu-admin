const express = require('express')
const router = express.Router()
const UserSchema = require('../models/user')
const bcrypt = require('bcrypt')
const ObjectId = require("mongodb").ObjectId
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { emptyUserInputsValidation, typeUserInputsValidation, emptyUserPasswordInputValidation } = require('../helpers/input_validate_middleware')

router.use(authenticateAccessToken)

router.get('/api/get-all-users', async (req, res) => {
    try {

        let page = req.query.page
        let limit = req.query.limit
        let skip = (parseInt(page) - 1) * parseInt(limit)
        const users = await UserSchema.find({
            username:  { $regex: req.query.query}
            
        }).lean().sort({_id:-1}).skip(skip).limit(limit);
        console.log(users)
        let count = await UserSchema.estimatedDocumentCount()
        console.log(count, "get api count")
        let stt = 0
        const aUsers = users.map( doc => {
            stt++
            
            return {
                ...doc,
                stt: stt
            }
        })
        res.json({ data: aUsers, count:count, error: false })
    } catch (error) {
        console.log(error)
        res.json({ error: true, message: "ERROR::" })
        throw error
    }
})

router.post('/api/create-user', emptyUserInputsValidation, typeUserInputsValidation, async (req, res) => {
    const { name, username, password, phoneNumber } = req.body
    console.log(req.body, "post api")
    const encryptedPassword = await bcrypt.hash(password, 10)
    try {
        const savedUsername = await UserSchema.findOne({ username: username })
        if (savedUsername) {
            return res.json({ error: true, message: "User already existed" })
            
        } else {
            const saving_user = await UserSchema.create({
                name: name,
                phoneNumber:phoneNumber,
                username: username,
                password: encryptedPassword
            })
            console.log('User saved successfully', saving_user)
            res.json({ error: false, message: 'user saved successfully' })
            const userId = saving_user._id.toString()
            console.log(userId)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
})

router.put('/api/edit-user/:id', emptyUserInputsValidation, typeUserInputsValidation, async (req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id::")
        console.log(req.body, "req.body put api")
        const { name, userName, phoneNumber } = req.body
        const checkedUser = await UserSchema.findOne({ _id: id })
        if (!checkedUser) {
            console.log(checkedUser, "Db error put api")
            res.json({error: true, message: "something went wrong!"})
        } else {
            const updatingUser = {
                name: name,
                userName: userName,
                phoneNumber: phoneNumber,
            }
            const updatedUser = await UserSchema.findOneAndUpdate({ _id: id }, updatingUser, { new: true })
            console.log(updatedUser, "updatedUser")
            res.json({error: false, message: "user has been updated"})
        }
    } catch (error) {
        
    }
})

router.patch('/api/edit-user-password/:id', emptyUserPasswordInputValidation, async (req, res, next) => {
    try {
        const { id } = req.params
        const { editedPassword } = req.body
        console.log(editedPassword, "editedPassword")
        console.log(id, "::id patch api::")
        const editPasswordUser = await UserSchema.findOne({ _id: id })
        if (!editPasswordUser) {
            console.log(editPasswordUser, "Db error patch api")
            res.json({error: true, message: "something went wrong!"})
        } else {
            const hashededitedPassword = await bcrypt.hash(editedPassword, 10)
            const updatedPasswordUser = await UserSchema.findOneAndUpdate({ _id: id }, {password: hashededitedPassword}, {new: true})
            console.log(updatedPasswordUser, "updatedPasswordUser")
            res.json({ error: false, message: "Password has been updated" })
        }
    } catch (error) {
        console.log(error, "patch api catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.delete('/api/delete-user/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        const deleteUser = await UserSchema.findOne({_id :id })

        if (!deleteUser) {
            console.log('User not found')
            return res.json({ error: true, message: 'User not found' })
        }

        const delUser= await UserSchema.deleteOne({_id :id })
        console.log(delUser)
        console.log('User has been deleted')
        res.json({ error: false, message: 'User has been deleted' })
    } catch (error) {
        console.log(error)
        res.json({ error: true, message: 'Some thing went wrong' })
    }
})

router.use((error, req, res, next) => {
    if (error) {
        console.log(error, "custom error handler")
        if (error.code === "EMPTY_USER_INPUTS_ERROR" || error.code === "EMPTY_USER_PASSWORD_INPUT_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({error: true, message: "Hãy điền đầy đủ form"})
        }

        if (error.code === "USER_INPUTS_TYPE_ERROR") {
            console.log(error.code, "input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }

    }
})



module.exports = router