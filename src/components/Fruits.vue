<template>
<div class="container">
<h1>{{msg}}</h1>
<div>
    <input type="text" placeholder="Fruit">
    <input type="number" placeholder="Value">
    <button type="button">Add</button>
</div>
<ul>
    <li>Naranja, CLP 21</li>
</ul>
</div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      msg: "Fruits",
      fruits: []
    };
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
}
</style>

