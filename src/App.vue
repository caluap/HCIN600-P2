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
        duration: new Date(),
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
#nav {
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  &.loading {
    // transition: all 1s ease;
  }
}
</style>
