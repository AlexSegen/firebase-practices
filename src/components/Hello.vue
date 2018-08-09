<template>
    <div>
        <h1>{{msg}}</h1>
        <button @click="logout">Logout</button>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "hello",
  data() {
    return {
      msg: "Hello Page"
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/login");
        });
    }
  }
};
</script>

