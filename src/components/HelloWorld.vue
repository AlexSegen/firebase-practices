<template>
  <div class="container">
    <h2>Essential Links</h2>

    <p><input type="text" placeholder="Name"></p>
    <p><input type="number" placeholder="Age"></p>
    <p><input type="button" value="Add"></p>

    <ul>
      <li v-for="item in users" :key="item.id">
        [ID {{item.id}}]{{item.name}} <button>X</button> 
      </li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      urlAPI:'https://jsonplaceholder.typicode.com/users',
      users:[],
      user:{}
    }
  },
  created(){
    this.getUsers();
  },
  methods:{
    getUsers(){
      axios.get(this.urlAPI).then(response => {
        this.users = response.data
        console.log(this.users);
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  max-width: 600px;
  margin: 10px auto;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
li {
  margin: 10px 0;
}
a {
  color: #42b983;
}
</style>
