<template>
  <div id="app">
    
    <!-- <formlogin/> -->
    <!-- <Unit01Ex1/> -->
    <!-- <Unit01Ex2/> -->
    <!-- <Unit01Ex3/> -->
    <!-- <testEX/>
    <Unit2Ex01/>
    <Unit2Ex02/> -->
    <Ex01Todo/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import formlogin from './components/formlogin.vue'
//import Unit01Ex1 from './components/Unit01Ex1.vue'
//import Unit01Ex2 from './components/Unit01Ex2.vue'
//import Unit01Ex3 from './components/Unit01Ex3.vue'
//import testEX from './components/Unit02/testEx.vue'
//import Unit2Ex01 from './components/Unit02/Unit2Ex01.vue'
//import Unit2Ex02 from './components/Unit02/Unit2Ex02.vue'
import Ex01Todo from './components/Unit03/Ex01Todo.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld,
    //formlogin,
    //Unit01Ex1,
    //Unit01Ex2,
    //Unit01Ex3,
    //testEX,
    //Unit2Ex01,
    //Unit2Ex02,
    Ex01Todo,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
