<template>
  <div id="test-per-se">
    <ProgressBar
      id="test-progress"
      :max="testData.questions.length"
      :value="currentQuestion"
    ></ProgressBar>
    <section id="smcc">
      <template v-if="collectedData.general_data.animated_smccs_test">
        <youtube
          host="https://www.youtube-nocookie.com"
          :video-id="testData.questions[currentQuestion].videoId"
          >Animado?</youtube
        >
      </template>
      <template v-else>
        <img :src="testData.questions[currentQuestion].imageUrl" alt="" />
      </template>
    </section>
    <section id="audio-files" :class="{ 'invert-order': randomBool }">
      <div>
        <audio-component
          :audio-file="testData.questions[currentQuestion].correctAudioUrl"
        />
        <p>Oi oi oi oi</p>
      </div>
      <div>
        <audio-component
          :audio-file="testData.questions[currentQuestion].incorrectAudioUrl"
        />
        <p>Tchau tchau tchau</p>
      </div>
    </section>
    <section id="likert-scale"></section>
    <PageNav @clicked="nextQuestion">Próxima Pergunta</PageNav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { testData } from "@/data.js";
import PageNav from "@/components/PageNav.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import AudioComponent from "@/components/AudioComponent.vue";

export default {
  name: "TestPerSe",
  data() {
    return {
      currentQuestion: 0,
      randomBool: !Math.round(Math.random()),
      testData: testData
    };
  },
  computed: {
    ...mapState(["collectedData"])
  },
  methods: {
    ...mapActions(["pushAnswer"]),
    nextQuestion: function() {
      // submits current answer to firebase
      this.currentQuestion++;
    }
  },
  components: { PageNav, ProgressBar, AudioComponent }
};
</script>

<style lang="scss" scoped>
#audio-files {
  display: grid;
  grid-template-columns: 1fr 1fr;
  &.invert-order {
    :nth-child(1) {
      grid-column: 2;
      grid-row: 1;
    }
    :nth-child(2) {
      grid-column: 1;
      grid-row: 1;
    }
  }
  &:not(.invert-order) {
  }
  .has-played + p {
    color: red;
  }
}
</style>