<template>
    <div class="container">
        <div class="leftCol">
            <div class="inputWrap">
                <div class="inputLabel">Họ và tên</div>
                <input type="text" v-model="tempName">
            </div>
            <div class="inputWrap">
                <div class="inputLabel">Ngày sinh</div>
                <input type="text" v-model="tempBirthday">
            </div>
            <div class="inputWrap">
                <div class="inputLabel">Số điện thoại</div>
                <input type="text" v-model="tempPhoneNumber">
            </div>
            <div class="inputWrap">
                <div class="inputLabel">Link facebook</div>
                <input type="text" v-model="tempLinkFb">
            </div>
            <button class="saveButton" @click="saveData">Save</button>
            <button class="clearButton" @click="clearData">Clear</button>
            </div>
            <div class="rightCol">
            <div class="infoWrap">
                <span class="infoLabel">Họ tên: </span>
                <span class="infoValue">{{name}}</span>
            </div>
            <div class="infoWrap">
                <span class="infoLabel">Ngày sinh: </span>
                <span class="infoValue">{{birthday}}</span>
            </div>
            <div class="infoWrap">
                <span class="infoLabel">Số điện thoại: </span>
                <span class="infoValue">{{phoneNumber}}</span>
            </div>
            <div class="infoWrap">
                <span class="infoLabel">Link facebook: </span>
                <a :href="linkFb" target="_blank">
                {{linkFb}}
                </a>
            </div>
        </div>
  </div>
</template>
<script>
export default {
    name : 'Unit01Ex2',
    data () {
        return {
        name: '',
        birthday: '',
        phoneNumber: '',
        linkFb: '',
        tempName: '',
        tempBirthday: '',
        tempPhoneNumber: '',
        tempLinkFb: ''
        }
    },
    methods: {
        saveData () {
        this.name = this.tempName
        this.birthday = this.tempBirthday
        this.phoneNumber = this.tempPhoneNumber
        this.linkFb = this.tempLinkFb
        },
        clearData () {
        this.name = ''
        this.birthday = ''
        this.phoneNumber = ''
        this.linkFb = ''
        this.tempName = ''
        this.tempBirthday = ''
        this.tempPhoneNumber = ''
        this.tempLinkFb = ''
        }
    } 
}
</script>
<style lang="scss" scoped>
    .container {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    .leftCol {
      background: #f5f5f5;
      border: 1px solid #6E6E6E;
      padding: 24px;
      height: 400px;
      width: 400px;

      .inputWrap {
        margin-bottom: 12px;

        .inputLabel {
          font-weight: bold;
          margin-bottom: 8px;
        }

        input {
          width: 100%;
          height: 40px;
        }
      }

      .saveButton {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        border: unset;
        background: #0080dd;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
      }

      .clearButton {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        margin-left: 8px;
        border: unset;
        background: #f54b5e;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
      }
    }

    .rightCol {
      background: #fff;
      border: 1px solid #6E6E6E;
      padding: 24px;
      height: 400px;
      width: 400px;

      .infoLabel {
        font-weight: bold;
        color: #00AAAA;
      }

      .infoValue {
        color: #e95d01;
      }
    }
  }
</style>