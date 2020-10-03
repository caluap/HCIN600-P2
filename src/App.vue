<template>
  <div id="app">
    {{ userId }}
    <p>Oi</p>
    {{ testData }}
    <button @click="submit()">Add</button>
  </div>
</template>

<script>
import { db } from "./db";
export default {
  name: "app",
  data() {
    return {
      testData: []
    };
  },
  methods: {
    submit() {
      // db.collection("test_data").add({
      //   hello: "world"
      // });
      db.collection("test_data")
        .doc("test")
        .set({ yes: "no", maybe: "yes!" });
    }
  },

  firestore: {
    testData: db.collection("test_data")
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
