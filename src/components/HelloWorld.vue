<template>
  <div class="container">
    <h2>Usuarios</h2>  
    <hr>
    <div class="row">
      <div class="col-md-3">
        <div class="card"  style="position: sticky;top:50px;">
          <div class="card-body">
            <div v-if="editMode" class="editform">
                <p><input type="text" placeholder="Name"  v-model="user.name"></p>
                <p><input type="email" placeholder="Email" v-model="user.email"></p>
                <p><input type="file" placeholder="Photo"></p>
                <p><button class="btn btn-sm btn-info" type="button" value="Update" @click="updateUser(user.id)"><i class="icon-refresh icons"></i> Update</button> 
                <input class="btn btn-link btn-sm" type="button" value="Cancel" @click="editMode = false"></p>
            </div>

            <div v-else class="addform">

                 <p>Select an image</p>
                 
                <file-base64
                  v-bind:multiple="true"
                  v-bind:done="getFiles">
                </file-base64>

                <p><input type="text" placeholder="Name"  v-model="user.name"></p>
                <p><input type="email" placeholder="Email" v-model="user.email"></p>
                <p><button class="btn btn-sm btn-success" type="button" @click="addUser()"><i class="icon-plus icons"></i> Add</button></p>
            </div>
          </div>
        </div>
      </div>
      <div class="div col-md-5">
        <ul class="list-unstyled">
          <li class="media" v-for="(item,index) in users" :key="item.id">
            <img class="mr-3" :src="item.photo" width="64" height="64" :alt="item.name">
            <div class="media-body">
              <h5 class="mt-0 mb-1">{{item.name}}</h5>
               <i class="icon-envelope icons"></i> {{item.email}} <button class="btn btn-link btn-sm text-danger" @click="deleteUser(item.id,index)"><i class="icon-trash icons"></i></button> <button class="btn btn-link btn-sm" @click="editUser(item)"><i class="icon-pencil icons"></i></button>
            </div>
          </li>
        </ul>
      </div>
      <div class="div col-md-4 text-left">
        <h5>JSON</h5>
        <pre style="opacity:.7">
          {{this.users[0]}}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import fileBase64 from 'vue-file-base64'

export default {
  name: "HelloWorld",
  components: { fileBase64 },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      urlAPI: "http://localhost:3000/users",
      users: [],
      user: {
        name: "",
        email: "",
        photo:"" || 'http://airlinecycles.com/wp-content/uploads/2017/12/default_bio_600x600.jpg'
      },
      editMode: false
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    addUser() {
      if(this.user.name =='' || this.user.email == ''){
        alert('Fill all fields');
      }else{
      axios.post(this.urlAPI, this.user)
        .then(response => {
          this.user = "";
          this.getUsers();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    getUsers() {
      axios.get(this.urlAPI)
      .then(response => {
        this.users = response.data.reverse();
        //console.log(this.users);
      })
      .catch(err => {
        console.log(err);
      });     
    },
    deleteUser(id,index) {

    if(confirm('Are you sure?')){
      axios.delete(this.urlAPI + "/" + id)
      .then(response => {
        this.users.splice(index, 1);
      })
      .catch(err => {
        console.log(err);
      });
    }

    },
    editUser(item) {
      this.editMode = true;
      this.user = item;
    },
    updateUser(id) {
      if(this.user.name =='' || this.user.email == ''){
        alert('Fill all fields');
      }else{
        axios.put(this.urlAPI + "/" + id, this.user).then(response => {
          this.user = "";
          this.editMode = false;
          this.getUsers();
        });
      }
    },
    getFiles(files){
        this.user.photo = files[0].base64;
        console.log(this.user.photo)
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
  text-align: left;
}
li {
  margin: 10px 0;
}
a {
  color: #42b983;
}
</style>
