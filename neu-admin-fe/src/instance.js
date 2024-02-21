import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const instance = axios.create({
    // timeout: 15 * 1000, // 5s sau khi req gửi đi mà không nhận được phản hồi là bị báo lỗi timeout (thời gian tối đa chờ res của server)
})



export default instance

// tạo riêng instance ra một file vì phải truyền instance này vào các component khác thì interceptors mới hoạt động 
// không để headers vì để loại headers mặc định sẽ khiến nhiều khi sau khi đi qua interceptors req bị đổi loại header (vd: req đang có header là multipart/formdata nhưng khi đi qua interceptor nó đổi lại header của req thành application/json (nếu để header của instance là kiểu này))