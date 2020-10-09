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
        <youtube
          :video-id="testData.questions[currentQuestion].videoId"
          @ended="videoPlays++"
        />
      </template>
      <template v-else>
        <img :src="testData.questions[currentQuestion].imageUrl" alt="" />
      </template>
    </section>
    <section id="audio-files" :class="{ 'invert-order': randomBool }">
      <audio-component
        @played="incAudioPlays(0)"
        v-model="selectedAudio"
        :audio-index="0"
        :can-select="audioPlays[0] && audioPlays[1]"
        :audio-file="testData.questions[currentQuestion].correctAudioUrl"
      />
      <audio-component
        @played="incAudioPlays(1)"
        v-model="selectedAudio"
        :audio-index="1"
        :can-select="audioPlays[0] && audioPlays[1]"
        :audio-file="testData.questions[currentQuestion].incorrectAudioUrl"
      />
    </section>
    <section id="likert-scale" v-if="selectedAudio > -1">
      <likert-scale
        :scale-size="5"
        v-model="likertCertainty"
        min-text="Quase não existe relação entre texto e som."
        max-text="Existe uma clara relação entre texto e som."
      />
    </section>
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
import LikertScale from "@/components/LikertScale.vue";

export default {
  name: "TestPerSe",
  data() {
    return {
      startTime: new Date(),
      currentQuestion: 0,
      videoPlays: 0,
      audioPlays: [0, 0],
      selectedAudio: -1,
      likertCertainty: -1,
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
      let now = new Date();
      let url = this.collectedData.general_data.animated_smccs_test
        ? `https://youtu.be/${
            this.testData.questions[this.currentQuestion].videoId
          }`
        : this.testData.questions[this.currentQuestion].imageUrl;
      let currentAnswer = {
        question_index: this.currentQuestion,
        start_time: this.startTime,
        end_time: now,
        duration: (now - this.startTime) / 1000,
        play_count: this.videoPlays,
        stanza_code: this.testData.questions[this.currentQuestion].stanzaCode,
        stanza_url: url,
        first_option_audio: this.testData.questions[this.currentQuestion]
          .correctAudioUrl,
        play_count_first_audio: this.audioPlays[0],
        second_option_audio: this.testData.questions[this.currentQuestion]
          .incorrectAudioUrl,
        play_count_second_audio: this.audioPlays[1],
        choice_index: this.selectedAudio,
        likert_certainty: this.likertCertainty,
        chose_the_right_choice: this.selectedAudio == 0
      };
      this.pushAnswer(currentAnswer);
      this.startTime = now;
      this.videoPlays = 0;
      this.audioPlays = [0, 0];
      this.selectedAudio = -1;
      this.likertCertainty = -1;
      this.randomBool = !Math.round(Math.random());
      this.currentQuestion++;
    }
  },
  components: { PageNav, ProgressBar, AudioComponent, LikertScale }
};
</script>

<style lang="scss" scoped>
#audio-files {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
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