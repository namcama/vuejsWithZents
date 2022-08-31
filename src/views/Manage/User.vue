<template>
   <div class="user-wrap">
      <img class="bg-user" src="../../assets/images/bg-user.svg" alt="">
      <div class="user-box">
         <form action="">
            <h3>Thông tin tài khoản</h3>

            <div class="info" v-if="active">
               <div class="avatar">
                  <div class="bor-avatar">
                     <img :src="avatar" alt="">
                  </div>
                  <div class="change-avatar">
                     <label>Ảnh đại diện</label>
                     <label>
                        <span class="glyphicon glyphicon-folder-open" aria-hidden="true">
                           <i class="el-icon-edit btn-edit-avatar"></i>
                        </span>
                        <input type="file" ref="avatar" accept="image/*" @change="onChangeAvatar" style="display:none">
                     </label>
                  </div>
               </div>

               <div class="user-name">
                  <p>Họ và tên</p>
                  <el-input placeholder="Nhập họ tên" v-model="name"></el-input>
                  <div v-if="errorName" class="error-text">{{ errorName }}</div>
               </div>
            </div>

            <div class="password" v-if="!active">
               <p>Mật khẩu mới</p>
               <el-input placeholder="Nhập mật khẩu mới" v-model="password" show-password></el-input>
               <div v-if="errorPassword" class="error-text">{{ errorPassword }}</div>
               <p>Xác nhận mật khẩu</p>
               <el-input placeholder="Xác nhận khẩu mới" v-model="passwordConfirm" show-password></el-input>
               <div v-if="errorPasswordConfirm" class="error-text">{{ errorPasswordConfirm }}</div>
            </div>

            <div class="concat">
               <el-button type="primary" size="medium" @click="convert()" plain>{{ nameConvert }}</el-button>
               <el-button type="primary" size="medium" @click="handleUpdateUser()">Lưu</el-button>
            </div>
         </form>
      </div>
   </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import api from '../../api'

export default {
   name: "UseR",
   data() {
      return {
         avatar: '',
         avatarFile: '',
         name: '',
         errorName: '',
         password: '',
         errorPassword: '',
         passwordConfirm: '',
         errorPasswordConfirm: '',
         nameConvert: 'Thay đổi mật khẩu',
         active: true
      };
   },
   computed: {
      ...mapState('auth', [
         'authUser'
      ])
   },
   methods: {
      ...mapMutations('auth', [
         'updateAuthUser',
      ]),
      convert() {
         this.active = !this.active
         this.resetData()
      },
      resetData() {
         this.password = ''
         this.passwordConfirm = ''
      },
      handleUpdateUser() {
         if (this.active) {
            //Thay đổi tên và ảnh đại diện
            if (this.isValidInfo()) {
               let data = new FormData();
               data.append('name', this.name);
               if (typeof this.avatarFile === 'object') {
                  data.append('avatar', this.avatarFile);
               }
               api.updateUserInfo(data).then(() => {
                  this.resetData()
                  api.getAuthUser().then((res) => {
                     if (res.data.avatar !== null) {
                        res.data.avatar = `http://vuecourse.zent.edu.vn/storage/users/${res.data.avatar}`
                     } else {
                        res.data.avatar = '../assets/images/avatar-login.svg'
                     }
                     this.updateAuthUser(res.data)
                  })
                  this.$notify({
                     title: 'Hệ thống',
                     message: 'Thay đổi thông tin thành công',
                     type: 'success'
                  });
               }).catch(() => {
                  this.$notify.error({
                     title: 'Hệ thống',
                     message: 'Thay đổi thông tin thất bại'
                  });
               })
            }
         } else {
            if (this.isValidPassword()) {
               //Thay đổi mật khẩu
               api.updateUserPassword({
                  password: this.password,
                  password_confirmation: this.passwordConfirm
               }).then(() => {
                  this.resetData()
                  this.$notify({
                     title: 'Hệ thống',
                     message: 'Thay đổi mật khẩu thành công',
                     type: 'success'
                  });
               }).catch(() => {
                  this.$notify.error({
                     title: 'Hệ thống',
                     message: 'Thay đổi mật khẩu thất bại'
                  });
               })
            }
         }
      },
      isValidPassword() {
         let error = false;
         if (this.password.length === 0) {
            error = true;
            this.errorPassword = "Mật khẩu không được để trống";
         }
         if (this.password && this.password.length < 6) {
            error = true;
            this.errorPassword = "Mật khẩu phải lớn hơn 6 ký tự";
         }
         if (this.passwordConfirm.length === 0) {
            error = true;
            this.errorPasswordConfirm = "Mật khẩu xác nhận không được để trống";
         }
         if (this.passwordConfirm && this.password && this.passwordConfirm !== this.password) {
            error = true;
            this.errorPasswordConfirm = "Mật khẩu xác nhận không chính xác";
         }
         return !error;
      },
      isValidInfo() {
         let error = false;
         if (this.name.length === 0) {
            error = true;
            this.errorName = "Họ và tên không được để trống";
         }
         if (this.name && this.name.length < 2) {
            error = true;
            this.errorName = "Họ và tên không được nhỏ hơn 2 ký tự";
         }

         return !error;
      },
      onChangeAvatar(e) {
         let avatar = e.target.files[0]
         this.avatar = URL.createObjectURL(avatar)
         this.avatarFile = avatar
      }
   },
   watch: {
      active(value) {
         (value === true) ? this.nameConvert = 'Thay đổi mật khẩu' : this.nameConvert = 'Thay đổi thông tin'
      },
      name() {
         this.errorName = ''
      },
      password() {
         this.errorPassword = ''
      },
      passwordConfirm() {
         this.errorPasswordConfirm = ''
      }
   },
   mounted() {
      this.name = this.authUser.name
      if (this.authUser.avatar !== null) {
         this.avatar = this.authUser.avatar
      } else {
         this.avatar = '../../assets/images/avatar-login.svg'
      }
   }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/User";
</style>