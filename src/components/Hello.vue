<template>
    <div class="container">
        <h1>{{msg}}</h1>
        <ul>
          <li>Name: {{ user.displayName }}</li>
          <li>Email: {{user.email}}</li>
          <li>uID Token: {{ user.uid }}</li>
        </ul>
<!--         <pre>
          {{user}}
        </pre> -->
        <button @click="logout">Logout</button>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "hello",
  data() {
    return {
      msg: "Hello Page",
      user: firebase.auth().currentUser
    };
  },
  created() {},
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

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
}
button {
  background: #eee;
  border: 1px solid #ccc;
  padding: 10px 25px;
  margin: 10px auto;
  cursor: pointer;
}
</style>
