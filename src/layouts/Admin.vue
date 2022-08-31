<template>
   <div class="container">
      <div class="header">
         <div class="logo">
            <i class="el-icon-eleme"></i>
            <span @click="handlePush('Workflow')">Penguin</span>
         </div>
         <div class="user">
            <el-dropdown trigger="click">
               <img :src="authUser.avatar" alt="">
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                     <div class="item-mng" @click="handlePush('User')">
                        <i class="el-icon-setting"></i>
                        Tài khoản
                     </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                     <div class="item-mng" @click="handleLogout()">
                        <i class="el-icon-switch-button"></i>
                        Đăng xuất
                     </div>
                  </el-dropdown-item>
               </el-dropdown-menu>
            </el-dropdown>
         </div>
      </div>
      <div class="content">
         <el-row>
            <el-col :span="24">
               <div>
                  <router-view/>
               </div>
            </el-col>
         </el-row>
      </div>
   </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import api from '../api'

export default {
   name: "AdMin",
   computed: {
      ...mapState('auth', [
         'authUser'
      ])
   },
   methods: {
      ...mapMutations('auth', [
         'updateAuthUser',
         'updateLoginStatus',
         'updateAccessToken'
      ]),
      handleLogout() {
         this.updateAuthUser({})
         this.updateLoginStatus(false)
         this.updateAccessToken('')
         this.handlePush('Login')
      },
      handlePush(value) {
         this.$router.push({name: `${value}`})
      }
   },
   mounted() {
      api.getAuthUser().then((res) => {
         if (res.data.avatar !== null) {
            res.data.avatar = `http://vuecourse.zent.edu.vn/storage/users/${res.data.avatar}`
         } else {
            res.data.avatar = '/img/avatar-login.d15a598a.svg'
         }
         this.updateAuthUser(res.data)
      })
   }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
@import "../assets/styles/Admin";
</style>