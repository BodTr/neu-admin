import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const instance = axios.create({
    timeout: 5 * 1000, // 5s sau khi req gửi đi mà không nhận được phản hồi là bị báo lỗi timeout (thời gian tối đa chờ res của server)
    headers: {
        'Content-Type': 'application/json'
    }
})



export default instance

// tạo riêng instance ra một file vì phải truyền instance này vào các component khác thì interceptors mới hoạt động 