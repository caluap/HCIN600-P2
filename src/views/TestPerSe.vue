<template>
  <div
    id="test-per-se"
    v-if="ready && collectedData && collectedData.general_data !== undefined"
  >
    <ProgressBar
      id="test-progress"
      :max="testData.questions.length"
      :value="currentQuestion"
    ></ProgressBar>
    <section id="smcc">
      <template v-if="collectedData.general_data.animated_smccs_test">
        <youtube :video-id="testData.questions[currentQuestion].videoId" />
      </template>
      <template v-else>
        <img :src="testData.questions[currentQuestion].imageUrl" alt="" />
      </template>
    </section>
    <section id="audio-files" :class="{ 'invert-order': randomBool }">
      <audio-component
        @played="incAudioPlays(0)"
        @selected="selectedAudio = 0"
        :can-select="audioPlays[0] && audioPlays[1]"
        :audio-file="testData.questions[currentQuestion].correctAudioUrl"
      />
      <audio-component
        @played="incAudioPlays(1)"
        @selected="selectedAudio = 1"
        :can-select="audioPlays[0] && audioPlays[1]"
        :audio-file="testData.questions[currentQuestion].incorrectAudioUrl"
      />
    </section>
    <section id="likert-scale"></section>
    <PageNav :disabled-button="likertCertainty == -1" @clicked="nextQuestion"
      >Próxima Pergunta</PageNav
    >
  </div>
  <div v-else>
    Carregando
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
      audioPlays: [0, 0],
      selectedAudio: null,
      randomBool: !Math.round(Math.random()),
      testData: testData
    };
  },
  computed: {
    ...mapState(["collectedData", "ready"])
  },
  methods: {
    ...mapActions(["pushAnswer"]),
    incAudioPlays: function(i) {
      this.$set(this.audioPlays, i, this.audioPlays[i] + 1);
    },
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
  grid-gap: 2rem;
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
}
</style>