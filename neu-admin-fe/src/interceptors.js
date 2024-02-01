import router from '@/router'
import instance from './instance'
import instance2 from './instance2'


router.beforeEach(async(to, from) => {
    try {
        // phần kiểm tra đăng nhập

        const isAuthenticated = await verifyUser()
        console.log(isAuthenticated)
        if (to.meta.requiresAuth && !isAuthenticated) { // khi người dùng chưa đăng nhập mà vào mấy route cần phải đăng nhập thì sẽ tự chuyển đến trang login
            console.log(to)
            localStorage.clear()
            return { name: 'login' }

        }
        if (!to.meta.requiresAuth && isAuthenticated) { // khi người dùng đã đăng nhập r (đã có token, thì khi vào lại trang login sẽ tự chuyển đến homepage)
            if (to.path === '/login') {
                console.log("khi người dùng đã đăng nhập r")
                return {name: 'programs-manage-page'}
            }
        }
        

        // phần kiểm tra đã tích vào chương trình đào tạo chưa
        const idArr = JSON.parse(localStorage.getItem("idArr"))
        

        if (idArr !== null) {
            if (to.meta.requiresProgramId && idArr.length !== 2) {
                return {name: 'id-array-error-page'}
            } else {

            }
        } else {
            if (to.meta.requiresProgramId) {
                return {name: 'id-array-error-page'}
            } else {

            }
        }

        
    } catch (error) {
        console.log(error, "beforeEach() catch block error")
    }
})

    
    

// axios.interceptors.request.use(async config => {
//     const token = localStorage.getItem('accessToken')
//     console.log(token, "XXXX")
//     config.headers['Authorization'] = `Bearer ${token}`
//     return config
// }, err => {
//     return Promise.reject(err)
// })

// tạo interceptors của instance (interceptors1)
instance.interceptors.request.use(async (config) => {
    // trước khi gửi req lên sv thì các url khác cần thêm header, nhưng url '/login' và '/refresh-token' không cần thêm headers authorizaton vào ('/refresh-token')
    if(config.url.indexOf('/login') >= 0 || config.url.indexOf('/refresh-token') >= 0) { // những route này ko cần auth header
        return config
    }
    const token = localStorage.getItem("accessToken")
    config.headers['Authorization'] = `Bearer ${token}` // thêm auth header trc khi api call lên sv vs mỗi api
    console.log(`Truoc khi req duoc gui len server::: ${token}`)
    return config
}, err => {
    return Promise.reject(err)
})

// dùng phương thức này để tạo ra một interceptors (đóng vai trò như là một middleware) chặn giữa server và client và ở đây (interceptors.response) nó sẽ xử lí res của server trc khi res đến đc client
instance.interceptors.response.use( async (response) => {
    console.log('sau khi server response:::', response.data)
    const config = response.config;
    // trước khi res trả về cho client thì các url khác sẽ phải kiểm tra access token có hết hạn hay lôiĩ gì không để sử lí tương ứng, còn 2 url '/login' (res sẽ trả về access token và refresh token) và '/refresh token' (res sẽ trả về access token mới) không cần việc đó
    if(config.url.indexOf('/login') >= 0 || config.url.indexOf('/refresh-token') >= 0) { // string indexOf() là để check xem trong url có các cụm như là '/login' hay '/refresh-token' hay không (nếu có thì hàm indexOf() sẽ trả về gtrị >= 0, nếu không có thì trả về gtrị -1)
        return response // nếu kết quả biểu thức trong if là true thì sẽ trả về response (không làm thêm bất cứ hành động gì)
    } 
    const {code, message} = response.data
    console.log(code, "res code")
    if (code && code === 1) {
        if (message && message === 'jwt expired') {
            console.log('Truong hop het han:::')
            const result = await refreshAcessToken()
            const newAccessToken = result.newAccessToken
            const newRefreshToken = result.newRefreshToken
            console.log(`da lay access token moi::: ${newAccessToken}`)
            config.headers['Authorization'] = `Bearer ${newAccessToken}` // phải sửa lại headers cho thành access token mới thì các req mà có access token hết hạn mới làm việc bth
            window.localStorage.setItem("accessToken", newAccessToken)
            window.localStorage.setItem("refreshToken", newRefreshToken)
            return instance(config) // trả về config mới
        }
    } else if(code && code === 2 || code === 3 || code === 400) {
        localStorage.clear()
        router.push('/login') // trường hợp access token lỗi hoặc chưa có thì chuyển người dùng về trang đăng nhập 
    }
    return response // cuối cùng trả lại response để nó chạy đến chỗ client
}, err => {
    return Promise.reject(err)
})

// tạo interceptors của instance2 (interceptors2)

instance2.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    console.log('Truoc khi req duoc gui len server::::')
    console.log(accessToken)
    console.log(refreshToken)
    return config
}, err => {
    return Promise.reject(err)
})
// dùng intrerceptor cho instance2 để check và refresh access token khi thay đổi router, refresh trang... (instance2 để cho hàm verifyUser, vì hàm này đc gọi trên phần beforeEach() nên sẽ cần phải check hàm này mỗi lần refresh trang, đổi route)
instance2.interceptors.response.use(async (response) => {
    console.log('sau khi server response::::', response.data)
    const config = response.config
    const { code, message } = response.data
    if (code && code === 1) {
        if (message && message === 'jwt expired') {
            console.log('Truong hop het han::::')
            const { newAccessToken, newRefreshToken } = await refreshAccessToken2()
            console.log('da lay token moi::::')
            console.log(newAccessToken)
            console.log(newRefreshToken)
            config.headers['Authorization'] = `Bearer ${newAccessToken}`
            config.data = { refresh_token: newRefreshToken }
            window.localStorage.setItem("accessToken", newAccessToken)
            window.localStorage.setItem("refreshToken", newRefreshToken)
            return instance2(config)
        }
    }
    return response
}, err => {
    return Promise.reject(err)
})

// router.beforeEach(async (to, from) => {
//     try {
//         const isAuthenticated = await verifyUser()
//         console.log(isAuthenticated)
//         if (to.meta.requiresAuth && !isAuthenticated) { // khi người dùng chưa đăng nhập mà vào mấy route cần phải đăng nhập thì sẽ tự chuyển đến trang login
//             console.log(to)
//             localStorage.clear()
//             return { name: 'login' }

//         }
//         if (!to.meta.requiresAuth && isAuthenticated) { // khi người dùng đã đăng nhập r (đã có token, thì khi vào lại trang login sẽ tự chuyển đến homepage)
//             if (to.path === '/login') {
//                 return {name: 'programs-manage-page'}
//             }
//         }
//         // const user_role = localStorage.getItem("user_role")
//         // if (user_role === "admin") {
//         //     if (to.path === '/user-homepage' || to.path === '/user-homepage/view-book'){
//         //         return {name: 'admin1-homepage'}
//         //     }
//         // }
//         // if (user_role === "user") {
//         //     if (to.path === '/admin' || to.path === '/admin1-homepage') {
//         //         return {name: 'user-homepage'}
//         //     }
//         // }
//     } catch (error) {
//         console.log(error)
//     }
// })

//FUNCTION


// gọi api /refresh-token làm mới access token
async function refreshAcessToken() {
    const data = { refresh_token: localStorage.getItem("refreshToken") }
    try {
        const result = await instance.post('/api/refresh-token', data)
        if (result.data.error === false) {
            
            return result.data

        }
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

async function refreshAccessToken2() {
    const data = { refresh_token: localStorage.getItem("refreshToken") }
    try {
        const result = await instance2.post('/api/refresh-token', data)
        if (result.data.error === false) {
            return result.data
        }
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

async function verifyUser() {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    try {
        const data = { refresh_token: refreshToken }
        const result = await instance2.post('/api/verifiedUser', data,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            )
        if (result.data.message === "verified") {
            return true
        } else {
            return false // các trường hợp không có token, token sai, hết hạn,...
        }
    } catch (error) {
        console.log(error)
        throw(error)
    }
}
