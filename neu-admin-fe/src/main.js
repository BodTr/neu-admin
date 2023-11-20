import './assets/tabler/css/tabler.min.css'
import './assets/tabler/css/tabler-flags.min.css'
import './assets/tabler/css/tabler-payments.min.css'
import './assets/tabler/css/tabler-vendors.min.css'
import './assets/tabler/css/demo.min.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import "vue-toastification/dist/index.css"

import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import { ServerTable } from 'v-tables-3'
import Toast from "vue-toastification"
window.axios = axios
// window.axios.defaults.baseURL = import.meta.env.VUE_APP_API_URL


const app = createApp(App)

app.use(router)
app.use(ServerTable)
app.use(Toast, {
    position: "top-center",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
})

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'