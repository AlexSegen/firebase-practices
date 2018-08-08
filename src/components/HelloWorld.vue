<template>
  <div class="container">
    <h2>Essential Links</h2>

      <div v-if="editMode" class="editform">
          <p><input type="text" placeholder="Name"  v-model="user.name"></p>
          <p><input type="email" placeholder="Email" v-model="user.email"></p>
          <p><input type="button" value="Update" @click="updateUser(user.id)"> <input type="button" value="Cancel" @click="editMode = false"></p>
      </div>

      <div v-else class="addform">
          <p><input type="text" placeholder="Name"  v-model="user.name"></p>
          <p><input type="email" placeholder="Email" v-model="user.email"></p>
          <p><input type="button" value="Add" @click="addUser()"></p>
      </div>
      
      <hr>
    <ul>
      <li v-for="item in users" :key="item.id">
        [ID {{item.id}}]{{item.name}} <button @click="deleteUser(item.id)">X</button> <button @click="editUser(item)">Edit</button>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      urlAPI: "https://jsonplaceholder.typicode.com/users",
      users: [],
      user: {
        name: "",
        email: ""
      },
      editMode: false
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    addUser() {
      axios
        .post(this.urlAPI, this.user)
        .then(response => {
          this.user = "";
          this.getUsers();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUsers() {
      axios
        .get(this.urlAPI)
        .then(response => {
          this.users = response.data;
          //console.log(this.users);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteUser(id) {
      axios
        .delete(this.urlAPI + "/" + id)
        .then(response => {
          console.log("Registro eliminado");
        })
        .catch(err => {
          console.log(err);
        });
    },
    editUser(item){
      this.editMode = true;
      this.user = item;
    },
    updateUser(id){
      axios.put(this.urlAPI + '/' + id, this.user)
      .then(response => {
        this.user = "";
        this.getUsers();
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 600px;
  margin: 10px auto;
}
h1,
h2 {
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
