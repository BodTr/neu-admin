const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const UserSchema = require('../models/user')
const RefreshTokenSchema = require('../models/refreshToken')
const {signAccessToken, signRefreshToken, authenticateAccessToken, authenticateRefreshToken} = require('../helpers/jwt_services')


const ObjectId = require("mongodb").ObjectId

// api check access token
router.get('/api/verifiedUser', authenticateAccessToken, (req, res) => {
    res.json({message: 'verified'})
})

// api login
router.post('/api/login', async (req, res, next) => {
    try {
        const { username, password } = req.body

        const user = await UserSchema.findOne({ username })

        if (!user) {
            return res.json({ error: true, message: 'Tài khoản chưa đăng kí' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ error: true, message: 'Mật khẩu không chính xác'})
        }
        const accessToken = await signAccessToken(user._id)   
        const refreshToken = await signRefreshToken(user._id) 
        const userPermission = user.permission
        
        // khi tạo được refresh token rồi thì ta sẽ lưu refresh token đó vào db
        const savedRefreshToken = new RefreshTokenSchema ({
            token: refreshToken,
            user: {
                id: user._id
            },
            expireAt: new Date(Date.now() + 365*24*60*60*1000),
            
        })
        await savedRefreshToken.save()

        console.log(savedRefreshToken, "savedRefreshToken")

        const userInfor = {
            menuManageArray: user.menuManageArray,
            permission: userPermission
        }
        
        
        res.json({ accessToken, refreshToken, userInfor, error: false,  message: 'Đăng nhập thành công' })
        

    } catch (error) {
        console.log(error, "login api catch block error")
        
    }
 
})

// api dùng để lấy lại access token (và refresh token) đã hết hạn
router.post('/api/refresh-token', authenticateRefreshToken,  async (req, res) =>{
    try {

        const { id } = req.payload 
        const newAccessToken = await signAccessToken(id) 
        const newRefreshToken = await signRefreshToken(id)
        const savedRefreshToken = new RefreshTokenSchema ({
            token: newRefreshToken,
            user: {
                id: id
            },
            expireAt: new Date(Date.now() + 7*24*60*60*1000),
            
        })
        await savedRefreshToken.save()
   
        
        res.json({ newAccessToken, newRefreshToken, error: false, message: 'Làm mới token thành công' })

    } catch (error) {
        console.log(error, "refresh token api catch block error")
        
    }
})


router.post('/api/logout', authenticateAccessToken, authenticateRefreshToken, async (req, res) =>{ 
    
    try {
        
        const { id } = req.payload
        
        console.log(req.payload, "api logout req.payload")
        const deletedRToken = await RefreshTokenSchema.deleteMany({user: {id: new ObjectId(id)}})
        console.log(deletedRToken, "deletedRToken")
        req.payload = ""
        res.json({
            error: false,
            message:'Đăng xuất thành công!'
         })
        
    } catch (error) {
        console.log(error, "logout api catch block error")
    }

    
})

module.exports = router
