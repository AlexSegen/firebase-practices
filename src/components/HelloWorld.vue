<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <div>
      <p><input type="text" v-model="text"/></p>
      <p><input type="text" v-model="text2"/></p>
      <p><button @click="addTodo()">Add</button></p>
      <p v-if="empty">Campo requerido</p>
      
      <ul>
        <li v-for="(todo,index) in todos">
          <p>{{ index }} | {{ todo.text }} y {{todo.text2}} <button type="button" @click="removeTodo(index)">X</button></p>
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      text: null,
      text2:null,
      todos: [],
      empty:false,
      /* todo:{
        'text':'',
        'text2':''
      } */
    };
  },
  mounted() {
    const todos = JSON.parse(this.$localStorage.get("todos"));
    if (todos) {
      this.todos = todos;
    }
  },
  methods: {
    addTodo() {
     /*  if(this.text == ''){
        this.empty = true;
      }else if(this.text == null){
        this.empty = true;
      } else {
        this.empty = false;
        this.todos.push(this.text);
        this.text = null;
        this.$localStorage.set("todos", JSON.stringify(this.todos));
      } */

        this.todos.push({
          text: this.text,
          text2: this.text2
        });
        this.text = '';
        this.text2 = '';
        this.$localStorage.set("todos", JSON.stringify(this.todos));

    },
    removeTodo(index){
      this.todos.splice(index, 1);
      this.$localStorage.set("todos", JSON.stringify(this.todos));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
