<template>
  <div id="app">
    <div class="container" style="text-align:center;">
      <router-link to='/login'>Login</router-link>
      <router-link to='/join'>Register</router-link>
      <router-link to='/hello'>Hello</router-link>
      <router-link to='/fruits'>Fruits</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      user:''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  max-width: 800px;
  margin: 40px auto;
}
</style>
