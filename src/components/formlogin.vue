<template>
    <div>
      <div class="container">
        <formLogin1 @handleEmit="handleEmit" />
        <formMessage :email="email" :password="password"/>
        
      </div>
        
    </div>
</template>

<script>
import formLogin1 from './formLogin1.vue'
import formMessage from './formMessage.vue' 

export default {
    name:'formLogin',
    data() {
      return {
        email:"",
        password:""
      }
    },
    components: {
      formLogin1,
      formMessage,
    },
    methods: {
      handleEmit(data){
        console.log(data);
        this.email= data.email,
        this.password=data.password
      }
    }
     
}



</script>

<style lang="scss">
    .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
  }
</style>