import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const instance2 = axios.create({
    timeout: 5 * 1000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance2