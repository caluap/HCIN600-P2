<template>
  <div id="app" :class="{ loading: !ready }">
    <p>Oi, {{ userId }}</p>
    <p>{{ collectedData }}</p>
    <button @click="newAnswer">Nova resposta</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },
  computed: {
    ...mapState(["userId", "collectedData", "ready"])
  },
  methods: {
    ...mapActions(["pushAnswer"]),
    newAnswer() {
      this.pushAnswer({
        number: Math.random() * 5,
        start_time: Math.random() * 5,
        end_time: Math.random() * 5,
        play_count: Math.random() * 5,
        stanza_code: Math.random() * 5,
        stanza_img: Math.random() * 5,
        left_option_code: Math.random() * 5,
        right_option_code: Math.random() * 5,
        chose_the_correct_answer: !Math.round(Math.random())
      });
    }
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
  &.loading {
    background: yellow;
  }
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
