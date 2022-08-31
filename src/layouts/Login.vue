<template>
   <div class="container" :class="{sign_up_mode: transmit}">
      <div class="forms-container">
         <div class="signin-signup">
            <form action="#" class="sign-in-form">
               <img class="avatar-login" src="../assets/images/avatar-login-male.svg" alt="">
               <h2 class="title">Quản lý công việc</h2>
               <div class="input-field">
                  <i class="el-icon-message"></i>
                  <input type="text" placeholder="Email" autocomplete="off" v-model="email"/>
               </div>
               <div class="input-field">
                  <i class="el-icon-lock"></i>
                  <input type="password" placeholder="Mật khẩu" autocomplete="off" @keypress.enter="handleLogin()" v-model="password"/>
               </div>
               <div class="error-text" v-if="errorInfo">{{ errorInfo }}</div>
               <input type="button" value="Đăng nhập" class="btn solid" @click="handleLogin()"/>
            </form>
            <form action="#" class="sign-up-form">
               <img class="avatar-login" src="../assets/images/avatar-login-female.svg" alt="">
               <h2 class="title">Quản lý công việc</h2>
               <div class="input-field">
                  <i class="el-icon-user"></i>
                  <input type="text" placeholder="Họ tên" autocomplete="off" v-model="nameRegister"/>
               </div>
               <div class="error-text" v-if="errorName">{{ errorName }}</div>
               <div class="input-field">
                  <i class="el-icon-message"></i>
                  <input type="email" placeholder="Email" autocomplete="off" v-model="emailRegister"/>
               </div>
               <div class="error-text" v-if="errorEmail">{{ errorEmail }}</div>
               <div class="input-field">
                  <i class="el-icon-lock"></i>
                  <input type="password" placeholder="Mật khẩu" autocomplete="off" v-model="passwordRegister"/>
               </div>
               <div class="error-text" v-if="errorPassword">{{ errorPassword }}</div>
               <input type="button" class="btn" value="Đăng ký" @click="handleRegister()"/>
            </form>
         </div>
      </div>

      <div class="panels-container">
         <div class="panel left-panel">
            <div class="content">
               <h3>Bạn chưa có tài khoản?</h3>
               <p>
                  Hãy đăng ký và trải nghiệm ngay hệ thống của tôi, có rất nhiều điều thú vị đang chờ đợi bạn
               </p>
               <button class="btn transparent" id="sign-up-btn" @click="toggleForm">
                  Đăng ký
               </button>
            </div>
            <img src="../assets/images/log.svg" class="image" alt=""/>
         </div>
         <div class="panel right-panel">
            <div class="content">
               <h3>Bạn đã có tài khoản?</h3>
               <p>
                  Hãy tham gia ngay với tôi, có rất nhiều điều thú vị đang chờ đợi bạn
               </p>
               <button class="btn transparent" id="sign-in-btn" @click="toggleForm">
                  Đăng nhập
               </button>
            </div>
            <img src="../assets/images/register.svg" class="image" alt=""/>
         </div>
      </div>
   </div>
</template>

<script>
import api from '../api/index.js'
import {mapMutations} from 'vuex'

export default {
   name: "LogiN",
   data() {
      return {
         email: '',
         password: '',
         transmit: false,
         nameRegister: '',
         emailRegister: '',
         passwordRegister: '',
         errorName: '',
         errorEmail: '',
         errorPassword: '',
         errorInfo: ''
      }
   },
   methods: {
      ...mapMutations('auth', [
         'updateLoginStatus',
         'updateAccessToken'
      ]),
      toggleForm() {
         this.transmit = !this.transmit
         this.resetData()
      },
      resetData() {
         this.email = ''
         this.password = ''
         this.nameRegister = ''
         this.emailRegister = ''
         this.passwordRegister = ''
         this.errorName = ''
         this.errorEmail = ''
         this.errorPassword = ''
         this.errorInfo = ''
      },
      handleRegister() {
         api.register({
            name: this.nameRegister,
            email: this.emailRegister,
            password: this.passwordRegister
         }).then(() => {
            this.$notify({
               title: 'Thành công',
               message: 'Đăng ký thành công',
               type: 'success'
            });
            this.resetData()
            this.transmit = !this.transmit
         }).catch((res) => {
            let error = res.response.data.error;

            if (error.name !== undefined) {
               this.errorName = error.name[0]
            }
            if (error.email !== undefined) {
               this.errorEmail = error.email[0]
            }
            if (error.password !== undefined) {
               this.errorPassword = error.password[0]
            }
         })
      },
      handleLogin() {
         api.login({
            email: this.email,
            password: this.password
         }).then((res) => {
            this.updateLoginStatus(true)
            this.updateAccessToken(res.data.access_token)
            this.$router.push({
               name: 'WorkFlow'
            })
         }).catch(() => {
            this.errorInfo = 'Thông tin tài khoản không chính xác'
         })
      }
   },
   watch: {
      email() {
         this.errorInfo = ''
      },
      password() {
         this.errorInfo = ''
      },
      nameRegister() {
         this.errorName = ''
      },
      emailRegister() {
         this.errorEmail = ''
      },
      passwordRegister() {
         this.errorPassword = ''
      }
   }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");
@import "../assets/styles/Login";
</style>