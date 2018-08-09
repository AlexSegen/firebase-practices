<template>
<div class="container">
    <h1>Fruits</h1>
    <p>{{ currentUser.email }}</p>
    <p class="link" @click="showForm">Add new</p>
    <div class="form-area" v-if="fruitForm">
        <form @submit.prevent="addFruit">
            <label for="name">
                <input type="text" id="name" v-model="fruit.name" placeholder="Name">
            </label>
            <label for="price">
                <input type="number" id="price" v-model="fruit.price" placeholder="Price">
            </label>
            <br>
            <button type="submit" class="btn">Save</button> <button @click="fruitForm = false" type="button"  class="btn">Cancel</button>
        </form>
    </div>
    <div v-if="fruits.length < 1">
    No hay registros
    </div>

    <ol v-else class="MyList">
        <li v-for="fruit of fruits">
            <div v-if="fruit.edit" class="inline-edit">
                <input type="text" placeholder="Name" v-model="fruit.name"> <input type="number" placeholder="Price" v-model="fruit.price">
                <input type="button" value="Update" class="save" @click="updatefruit(fruit)"> <input type="button" value="Cancel" class="cancel" @click="noEditMode(fruit)">
            </div>
            <div v-else class="fruit-details">
                {{fruit.name}}, CPL {{fruit.price}} | <button class="delete" @click="deletefruit(fruit)">X</button> <button class="edit" @click="editMode(fruit)">Edit</button>
            </div>
        </li>
    </ol>
</div>
</div>


</template>
<script>
import firebase from 'firebase'
import { db } from "@/firebase";

export default {
  data() {
    return {
      currentUser: firebase.auth().currentUser,
      fruits: {},
      fruit: { name: "", price: "", edit: null || false },
      fruitForm: false
    };
  },
  firebase: {
    fruits: {
      source: db.ref("fruits"),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  methods: {
    showForm() {
      this.fruitForm = true;
    },
    addFruit() {
      this.$firebaseRefs.fruits
        .push({
          name: this.fruit.name,
          price: this.fruit.price,
          edit: this.fruit.edit
        })
        .then(
          (this.fruit.name = ""),
          (this.fruit.price = ""),
          (this.fruit.edit = false),
          (this.fruitForm = false)
        );
    },
    editMode(fruit){
        this.$firebaseRefs.fruits.child(fruit['.key']).child('edit').set(true);
    },
    noEditMode(fruit){
        this.$firebaseRefs.fruits.child(fruit['.key']).child('edit').set(false);
    },
    updatefruit(fruit){
        const copy = {...fruit}
        // remove the .key attribute
        delete copy['.key']
        
        this.$firebaseRefs.fruits.child(fruit['.key']).set(copy)
        
        this.$firebaseRefs.fruits.child(fruit['.key']).child('edit').set(false);
    },
    deletefruit(fruit) {
      this.$firebaseRefs.fruits.child(fruit[".key"]).remove();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 800px;
  height: auto;
  display: block;
  margin: 0 auto;
}
.MyList {
  text-align: left;
  > li {
    margin-bottom: 10px;
  }
}
a {
  color: #42b983;
}
.link {
  color: #42b983;
  margin-bottom: 15px;
  display: block;
  cursor: pointer;
}
.form-area {
  max-width: 300px;
  margin: 10px auto;
  input {
    margin: 10px 0;
    padding: 5px;
  }
}
.btn {
  color: #eee;
  background: #42b983;
  border: 1px solid #42b983;
  padding: 5px 25px;
  border-radius: 2px;
  vertical-align: middle;
  margin: 3px;
  cursor: pointer;
}
.edit,
.delete,
.save,
.cancel {
  background: #fff;
  border: 1px solid #ddd;
  margin-left: 15px;
  cursor: pointer;
}

.inline-edit {
  input {
    margin-right: 5px;
  }
}
</style>