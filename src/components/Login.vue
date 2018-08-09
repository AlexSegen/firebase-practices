<template>
    <div class="login">
      <h3>Sign In</h3>
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <button type="button" @click="signIn()">Login</button>
        <p>Don't have an account? <router-link to="/join">Sign Up</router-link></p>
    </div>
</template>
<script>
import firebase from "firebase";

export default {
  naeme: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("hello");
          },
          err => {
            alert("Oops, " + err.message);
          }
        );
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  max-width: 300px;
  margin: 50px auto;
  text-align: center;
  input {
    width: 80%;
    display: block;
    padding: 10px;
    margin: 10px auto;
  }
  button {
    background: #eee;
    border: 1px solid #ccc;
    padding: 10px 25px;
    width: 80%;
    display: block;
    margin: 10px auto;
  }
  p {
    margin: 15px 0;
    a {
      color: #333;
    }
  }
}
</style>

