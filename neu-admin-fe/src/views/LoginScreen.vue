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
          <h2 style="text-align: center; color: white; margin-bottom: 20px; " >PHẦM MỀM CHUYỂN ĐỔI SỐ QUẢN TRỊ DỮ LIỆU PHÒNG HỢP TÁC QUỐC TẾ</h2>
          <div class="card card-md">
            <div class="card-body">
              <h2 class="h2 text-center mb-4">Đăng nhập tài khoản</h2>
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
                  <p style="text-align: center; margin-top: 20px; text-decoration: underline;">
                    <a href="https://docs.google.com/document/d/17tQnRKIb-5iZk-oIm7nOP8p_KNfW2U3OCoxKKpYCfmg/edit" target="_blank">Tài liệu hướng dẫn</a>
                  </p>
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
            console.log(result.data.userInfor.menuManageArray, "result login api")
            localStorage.setItem("menuManageArray", JSON.stringify(result.data.userInfor.menuManageArray))
            // localStorage.setItem("menuManageArray", result.data.userInfor.menuManageArray)
            localStorage.setItem("accessToken", result.data.accessToken)
            localStorage.setItem("refreshToken", result.data.refreshToken)
            localStorage.setItem("permission", result.data.userInfor.permission)
            this.toast.success(result.data.message)
            if (result.data.userInfor.permission === 'Super Admin') {
              location.href = "/"
              // router.push('/')
            } else if ( result.data.userInfor.permission === 'Cấp 2') {
              location.href = "/init-page"
              // router.push('/init-page')
            } else {
              // router.push('/init-program')
              location.href = "/init-program"
            }
            
            
            
            
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