import router from '@/router'
import instance from './instance'
import instance2 from './instance2'
import axios from 'axios'

router.beforeEach(async(to, from) => {
    try {
        const routeName = to.name
        console.log(routeName, "phần kiểm tra đăng nhập")
        
        // phần kiểm tra đăng nhập

        const isAuthenticated = await verifyUser(routeName)
        // console.log(isAuthenticated)
        if (to.meta.requiresAuth && !isAuthenticated) { // khi người dùng chưa đăng nhập mà vào mấy route cần phải đăng nhập thì sẽ tự chuyển đến trang login
            
            localStorage.clear()
            return { name: 'login' }

        }
        if (!to.meta.requiresAuth && isAuthenticated) { // khi người dùng đã đăng nhập r (đã có token, thì khi vào lại trang login sẽ tự chuyển đến homepage)
            if (to.path === '/login') {
                // console.log("khi người dùng đã đăng nhập r")
                return {name: 'empty-page'}
            }
        }
        

        // phần kiểm tra đã tích vào chương trình đào tạo chưa


        
    } catch (error) {
        console.log(error, "beforeEach() catch block error")
    }
})

    
    
// tạo interceptor cho axios, dùng axios cho các get req
axios.interceptors.request.use(async config => {
    if(config.url.indexOf('/refresh-token') >= 0) { // những route này ko cần auth header
        return config
    }
    const token = localStorage.getItem('accessToken')
    console.log(`Truoc khi req duoc gui len server (axios req interceptor):::`)
    console.log(token, "axios.interceptors.request")

    config.headers['Authorization'] = `Bearer ${token}`
    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use( async (response) => {
    console.log('sau khi server response (axios res interceptor) :::', response.data)
    const config = response.config;
    
    const {code, message} = response.data
    console.log(code, "res code")
    if (code && code === 1) {
        console.log('Truong hop het han:::')
        const result = await refreshAcessToken3()
        console.log(result, "newAccessToken và newRefreshToken")
        if (result === false) { // trường hợp ko lấy lại đc access token vì refresh token hết hạn hoặc sai
            console.log("Trường hợp ko lấy lại đc access token vì refresh token hết hạn hoặc sai")
            localStorage.clear()
            router.push('/login')
        } else {
            const newAccessToken = result.newAccessToken
            const newRefreshToken = result.newRefreshToken
            console.log(`da lay access token moi::: ${newAccessToken}`)
            window.localStorage.setItem("accessToken", newAccessToken)
            window.localStorage.setItem("refreshToken", newRefreshToken)
            return axios(config) // trả về config mới
        }
        
    } else if(code && code === 2 || code === 3 || code === 400) {
        localStorage.clear()
        router.push('/login') // trường hợp access token lỗi hoặc chưa có thì chuyển người dùng về trang đăng nhập 
    }
    return response // cuối cùng trả lại response để nó chạy đến chỗ client
}, err => {
    return Promise.reject(err)
})




// tạo interceptors của instance
// instance dùng trong tất cả các api trừ các api có phương thức get

instance.interceptors.request.use(async (config) => {
    // trước khi gửi req lên sv thì các url khác cần thêm header, nhưng url '/login' và '/refresh-token' không cần thêm headers authorizaton vào ('/refresh-token')
    if(config.url.indexOf('/login') >= 0 || config.url.indexOf('/refresh-token') >= 0) { // những route này ko cần auth header
        // console.log("api login hoặc api refresh token instance interceptors req")
        return config
    }
    // console.log(`Truoc khi req duoc gui len server (instance req interceptor):::`)
    const token = localStorage.getItem("accessToken")
    config.headers['Authorization'] = `Bearer ${token}` // thêm auth header trc khi api call lên sv vs mỗi api
    console.log(`Truoc khi req duoc gui len server (instace req interceptor):::`)
    return config
}, err => {
    return Promise.reject(err)
})


// dùng phương thức này để tạo ra một interceptors (đóng vai trò như là một middleware) chặn giữa server và client và ở đây (interceptors.response) nó sẽ xử lí res của server trc khi res đến đc client
instance.interceptors.response.use( async (response) => {
    console.log('sau khi server response (instace res interceptor):::', response.data)
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
            if (result === false) { // trường hợp ko lấy lại đc access token vì refresh token hết hạn hoặc sai
                console.log("Trường hợp ko lấy lại đc access token vì refresh token hết hạn hoặc sai")
                localStorage.clear()
                router.push('/login')
            } else {
                const newAccessToken = result.newAccessToken
                const newRefreshToken = result.newRefreshToken
                console.log(`da lay access token moi::: ${newAccessToken}`)
                config.headers['Authorization'] = `Bearer ${newAccessToken}` // phải sửa lại headers cho thành access token mới thì các req mà có access token hết hạn mới làm việc bth
                window.localStorage.setItem("accessToken", newAccessToken)
                window.localStorage.setItem("refreshToken", newRefreshToken)
                return instance(config) // trả về config mới
            }
            
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
// dùng intrerceptor cho instance2 để check và refresh access token khi thay đổi router, refresh trang... (instance2 để cho hàm verifyUser, vì hàm này đc gọi trên phần beforeEach() nên sẽ cần phải check hàm này mỗi lần refresh trang, đổi route)

instance2.interceptors.request.use(async (config) => {

    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    console.log('Truoc khi req duoc gui len server (instace2 req interceptor)::::')
    // console.log(accessToken)
    // console.log(refreshToken)
    return config
}, err => {
    return Promise.reject(err)
})

instance2.interceptors.response.use(async (response) => {
    console.log('sau khi server response (instace2 res interceptor)::::', response.data)
    const config = response.config
    const { code, message } = response.data
    if (code && code === 1) {
        if (message && message === 'jwt expired') {
            console.log('Truong hop het han::::')
            const result = await refreshAccessToken2()
            // console.log(result, "instance2 interceptors response")
            if (result === false) { // trường hợp ko lấy lại đc access token vì refresh token hết hạn hoặc sai
                console.log("Trường hợp ko lấy lại đc access token vì refresh token hết hạn hoặc sai")
                localStorage.clear()
                router.push('/login')
            } else {
                const newAccessToken = result.newAccessToken
                const newRefreshToken = result.newRefreshToken
                console.log('da lay token moi::::')
                // console.log(newAccessToken)
                // console.log(newRefreshToken)
                config.headers['Authorization'] = `Bearer ${newAccessToken}`
                config.data = { refresh_token: newRefreshToken }
                window.localStorage.setItem("accessToken", newAccessToken)
                window.localStorage.setItem("refreshToken", newRefreshToken)
                return instance2(config)
            }
            // const newAccessToken = result.newAccessToken
            // const newRefreshToken = result.newRefreshToken
            // console.log('da lay token moi::::')
            // console.log(newAccessToken)
            // console.log(newRefreshToken)
            // config.headers['Authorization'] = `Bearer ${newAccessToken}`
            // config.data = { refresh_token: newRefreshToken }
            // window.localStorage.setItem("accessToken", newAccessToken)
            // window.localStorage.setItem("refreshToken", newRefreshToken)
            
        }
    }
    return response
}, err => {
    return Promise.reject(err)
})



//FUNCTION


// gọi api /refresh-token làm mới access token
async function refreshAcessToken3() {
    const data = { refresh_token: localStorage.getItem("refreshToken") }
    try {
        const result = await axios.post('/api/refresh-token', data)
        if (result.data.error === false) {
            
            return result.data

        } else {
            return false
        }
    } catch (error) {
        console.log(error, "refreshAcessToken3 catch block error")
    }
}

async function refreshAcessToken() {
    const data = { refresh_token: localStorage.getItem("refreshToken") }
    try {
        const result = await instance.post('/api/refresh-token', data)
        if (result.data.error === false) {
            
            return result.data

        } else {
            return false
        }
    } catch (error) {
        console.log(error, "refreshAcessToken catch block error")
    }
}

async function refreshAccessToken2() {
    const data = { refresh_token: localStorage.getItem("refreshToken") }
    // console.log(data, "refreshAccessToken2 data")
    try {
        const result = await instance2.post('/api/refresh-token', data)
        if (result.data.error === false) {
            // console.log(result.data ,"refreshAccessToken2 result data if error === false")
            return result.data
        } else {
            // console.log(result.data ,"refreshAccessToken2 result data if error === true")
            return false
        }
    } catch (error) {
        console.log(error, "refreshAcessToken2 catch block error")
        
    }
}

async function verifyUser(routeName) {
    const accessToken = localStorage.getItem('accessToken')
    
    try {
        console.log(routeName, "routeName verifyUser()")
        const queryParams = { routeName: routeName }
        const result = await instance2.get('/api/verifiedUser',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: queryParams
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
