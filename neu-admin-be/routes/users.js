const express = require('express')
const router = express.Router()
const UserSchema = require('../models/user')
const ProgramSchema = require('../models/program')
const bcrypt = require('bcrypt')
const ObjectId = require("mongodb").ObjectId
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { emptyUserInputsValidation, typeUserInputsValidation, emptyUserPasswordInputValidation, emptyUserInputsValidation1 } = require('../helpers/input_validate_middleware')

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
        console.log(error, "get-all-users catch block error api")
        res.json({ error: true, message: "ERROR::" })
        throw error
    }
})

router.get('/api/get-all-program-years', async(req, res) => {
    try {
    
    } catch (error) {
        
    }
})

router.get('/api/getMenus', async (req, res) => {
    //Dnh sách menu đầy đủ
    var menus =[
        {
            title: "Quản lý CTLK",
            url: "/"
        },
        {
            title: "CTLKĐT với nước ngoài",
            url: "",
            childs: [
                {
                    title: "Thông tin chung",
                    url: "",
                    childs: [
                        {
                            title: "TT chương trình liên kết",
                            url: "/general-infor/trans-program"
                        },
                        {
                            title: "TT chương trình liên kết",
                            url: "/general-infor/trans-program"
                        }
                    ]
                }
            ]
        }

    ]

    //Lấy danh sách menu mà user đượ sử dụng

    //Join 2 bảng thỏa mãn với nhau


    res.json({ data:menus, error: false })
})

router.post('/api/create-user', emptyUserInputsValidation, typeUserInputsValidation, async (req, res) => {
    const { name, username, password, phoneNumber, permission } = req.body
    console.log(req.body, "post api")
    const encryptedPassword = await bcrypt.hash(password, 10)
    try {
        const savedUsername = await UserSchema.findOne({ username: username })
        if (savedUsername) {
            return res.json({ error: true, message: "User already existed" })
            
        } else {
            let menuManageArray = []
            if (permission === 'Super Admin') {
                menuManageArray = [
                    {name :'programs-manage-page', stt: 1, title: 'Quản lý chương trình liên kết'},
                    {name :'trans-programs-manage-page', stt: 2, title: 'TT chương trình liên kết'},
                    {name :'approval-decision-manage-page', stt: 3, title: 'Các quyết định phê duyệt'},
                    {name :'close-decision-manage-page', stt: 4, title: '<span>Các quyết định đóng <br /> chương trình</span>'},
                    {name :'documents-manage-page', stt: 5, title: 'Quản lý văn bản liên kết'},
                    {name :'partners-manage-page', stt: 6, title: 'Quản lý đối tác'},
                    {name :'agencies-manage-page', stt: 7, title: 'Quản lý đơn vị thực hiện'},
                    {name :'goals-manage-page', stt: 8, title: 'Mục tiêu chương trình'},
                    {name :'plans-manage-page', stt: 9, title: 'Quản lý nội dung đề án'},
                    {name :'edu-quality-manage-page', stt: 10, title: '<span>Đảm bảo chất lượng<br /> đào tạo</span>'},
                    {name :'curriculums-manage-page', stt: 11, title: '<span>Thông tin khung<br /> chương trình</span>'},
                    {name :'enrollment-manage-page', stt: 12, title: 'Quản lý tuyển sinh'},
                    {name :'lecturers-manage-page', stt: 13, title: 'Quản lý giảng viên'},
                    {name :'units-manage-page', stt: 14, title: 'Quản lý đơn vị công tác'},
                    {name :'subjects-manage-page', stt: 15, title: 'Quản lý môn học'},
                    {name :'moumoa-manage-page', stt: 16, title: 'Quản lý MOU.MOA'},
                    {name :'htqt-manage-page', stt: 17, title: 'Quản lý các dự án HTQT'},
                    {name :'ex-f-student-manage-page', stt: 18, title: '<span>Sinh viên nước ngoài đến<br /> trao đổi</span>'},
                    {name :'ex-student-manage-page', stt: 19, title: '<span>Sinh viên đi nước ngoài<br /> trao đổi</span>'},
                    {name :'student-manage-page', stt: 20, title: 'Quản lý lưu sinh viên'},
                    {name :'extend-visa-manage-page', stt: 21, title: 'Cấp/Gia hạn VISA'},
                    {name :'admin', stt: 22, title: 'Quản lý tài khoản'},

                ]
            } else {
                menuManageArray = []
            }
            const saving_user = await UserSchema.create({
                name: name,
                phoneNumber:phoneNumber,
                username: username,
                permission: permission,
                password: encryptedPassword,
                menuManageArray: menuManageArray,
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



router.put('/api/edit-user/:id', emptyUserInputsValidation1, typeUserInputsValidation, async (req, res) => {
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
            const permission = checkedUser.permission
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
            console.log(updatedPasswordUser, "updatedPasswordUser edit-user-password api ")
            res.json({ error: false, message: "Mật khẩu được sửa thành công" })
        }
    } catch (error) {
        console.log(error, "edit-user-password api patch api catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.patch('/api/add-menu/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { menuArray } = req.body
        const addedMenuUser = await UserSchema.findByIdAndUpdate({_id: id}, {menuManageArray: menuArray})
        console.log(addedMenuUser, "addedMenuUser add-menu api")
        res.json({ error: false, message: "Phân quyền menu cho người dùng thành công" })
    } catch (error) {
        console.log(error, "add-menu api patch api catch block error")
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
        if (error.code === "EMPTY_USER_INPUTS_ERROR" || error.code === "EMPTY_USER_PASSWORD_INPUT_ERROR" || error.code === "EMPTY_USER_INPUTS1_ERROR") {
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