<template>
    <div class="signup">
      <h3>Sign Up</h3>
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <button type="button" @click="signUp()">Register</button>
        <p>Already have an account? <router-link to="/login">Sign In</router-link></p>
    </div>
</template>
<script>
import firebase from "firebase";

export default {
  naeme: "signup",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
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
.signup {
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

