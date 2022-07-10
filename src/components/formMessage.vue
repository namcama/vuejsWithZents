<template >
    <div class="infoWrap">
        <div class="infoLabel">
            Xin chào : {{email}}
            <br>
            MK : {{password}}
            
        </div>
    </div>
</template>
<script>
export default {
    name : 'formMessage',
    props: ['email', 'password']
    
    
}
</script>
<style lang="scss">
    .infoWrap {
      background: #fff;
      border: 1px solid #6E6E6E;
      padding: 24px;
      height: 250px;
      width: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 24px;

      .infoLabel {
        font-weight: bold;
        color: #00AAAA;
      }
    }
</style>