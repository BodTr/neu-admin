<template>
    <div class="page page-center">
      <div class="container container-tight py-4">
          <div class="text-center mb-4">
            <a href="." class="navbar-brand navbar-brand-autodark">
              <img
                src="../assets/Logo-NEU.png"
                width="100"
                height="100"
                alt="neu-logo"
                class="navbar-brand-image-xl"
              />
            </a>
          </div>
          <div class="card card-md">
            <div class="card-body">
              <h2 class="h2 text-center mb-4">Đăng nhập</h2>
              <form method="post" @submit.prevent="Login">
                <div class="mb-3">
                  <label class="form-label">Tên đăng nhập</label>
                  <input type="text" class="form-control" placeholder="Nhập tên đăng nhập" v-model="username">
                </div>
                <div class="mb-2">
                  <label class="form-label">
                    Mật khẩu
                  </label>
                  <div class="input-group input-group-flat">
                    <input type="password" class="form-control" placeholder="Nhập mật khẩu" v-model="password" autocomplete="off">
                  </div>
                </div>
                <div class="form-footer">
                  <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
    </div>
  </template>
  
  <script>
  import { useToast } from "vue-toastification"
  import router from '@/router'
  import instance from '../instance'
  //import { mapMutations } from 'vuex'
  export default {
    name: 'LoginScreen',
    data() {
      return {
        username: "",
        password: "",
        error: false,
        accessToken: ""
      }
    },
    setup() {
      const toast = useToast()
      return { toast }
    },
    methods:{
  
  
      async Login() {
        

        const data = {
          username: this.username,
          password: this.password,
        }
        try {
          const result = await instance.post('/api/login', data)
          console.log(result)
          if( result.data.error === false ) {
            // alert('Success')
            console.log(result.data.accessToken, ".accessToken")
            localStorage.setItem("accessToken", result.data.accessToken)
            localStorage.setItem("refreshToken", result.data.refreshToken)
            this.toast.success(result.data.message)
            router.push('/')
            
            
            
          } else {
            this.toast.error(result.data.message)
          }
        } catch (error) {
          console.log(error, "login api result catch block error")
        }
      },
      // ...mapMutations(["tokens/updateAccessToken"]),
      // // saveAcesstoken(){
      // //   this.updateAccessToken(this.accessToken)
        
      // // }
    }
  }
  </script>
  <style scoped></style>