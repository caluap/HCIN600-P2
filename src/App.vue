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
        start_time: new Date(),
        end_time: new Date(),
        play_count: Math.round(Math.random() * 5),
        stanza_code: `#${Math.round(Math.random() * 9999)}`,
        stanza_url: "http://www.example.com/",
        first_option_audio: `/audio/audio-${Math.round(
          Math.random() * 50
        )}.mp3`,
        play_count_first_audio: Math.round(Math.random() * 5),
        second_option_audio: `/audio/audio-${Math.round(
          Math.random() * 50
        )}.mp3`,
        play_count_second_audio: Math.round(Math.random() * 5),
        choice_index: Math.round(Math.random()),
        likert_certainty: Math.round(Math.random() * 5),
        chose_the_right_choice: !Math.round(Math.random())
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
