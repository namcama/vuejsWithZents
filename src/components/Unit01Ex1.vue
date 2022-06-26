<template>
    <div class="container">
        <div class="leftPanel">
        <div class="inputWrap">
            <div class="inputLabel">Nhập tiêu đề</div>
            <input type="text" placeholder="Tiêu đề bài viết" v-model="title">
        </div>
        <div class="inputWrap">
            <div class="inputLabel">Nhập nội dung</div>
            <textarea v-model="content" rows="10" placeholder="Nội dung bài viết chứa HTML"></textarea>
        </div>
        </div>
        <div class="rightPanel">
        <div class="title">{{title}}</div>
        <div class="content" v-html="content"></div>
        </div>
    </div>
</template>
<script>
export default {
    name :'Unit01Ex1',
     data () {
        return {
            title: 'Zent Coding School',
            content: 'Happy class',
        }
    },
}
</script>
<style lang="scss">
    .container {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    .leftPanel {
      background: #ffffff;
      border: 1px solid #000000;
      padding: 24px;
      border-radius: 10px;
      height: 300px;
      width: 300px;

      .inputWrap {
        margin-bottom: 10px;

        .inputLabel {
          font-weight: bold;
          margin-bottom: 8px;
        }

        input {
          height: 40px;
          width: 100%
        }

        textarea {
          width: 100%;
          resize: none;
        }
      }
    }

    .rightPanel {
      background: #ffffff;
      border: 1px dashed #000000;
      padding: 24px;
      border-radius: 10px;
      height: 300px;
      width: 500px;
      margin-left: 80px;

      .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .content {
        font-size: 14px;
      }
    }
  }
</style>