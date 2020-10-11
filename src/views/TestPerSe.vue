<template>
  <div
    id="test-per-se"
    :class="{ 'animated-test': collectedData.general_data.animated_smccs_test }"
    v-if="ready && collectedData && collectedData.general_data !== undefined"
  >
    <!-- {{ testData.questions[currentQuestion].videoId }} -->
    <section id="smcc">
      <h2 :class="{ done: videoPlays > 0, 'current-step': videoPlays == 0 }">
        <template v-if="collectedData.general_data.animated_smccs_test">
          Assista ao vídeo abaixo:</template
        >
        <template v-else>Observe a imagem abaixo:</template>
      </h2>
      <div v-if="collectedData.general_data.animated_smccs_test">
        <youtube
          :video-id="testData.questions[currentQuestion].videoId"
          @ended="videoPlays++"
        />
      </div>
      <div v-else>
        <img :src="testData.questions[currentQuestion].imageUrl" alt="" />
      </div>
    </section>
    <section
      id="audio-files"
      v-show="videoPlays > 0"
      :class="{ 'invert-order': randomBool }"
    >
      <h2
        :class="{
          done: selectedAudio != -1,
          'current-step': videoPlays > 0 && selectedAudio == -1
        }"
      >
        Ouça os dois arquivos de áudio abaixo e marque aquele que se relaciona
        com o texto acima:
      </h2>
      <audio-component
        @played="incAudioPlays(0)"
        v-model="selectedAudio"
        :disabled="videoPlays == 0"
        :audio-index="0"
        :can-select="!!audioPlays[0] && !!audioPlays[1]"
        :audio-file="testData.questions[currentQuestion].correctAudioUrl"
      />
      <audio-component
        @played="incAudioPlays(1)"
        v-model="selectedAudio"
        :disabled="videoPlays == 0"
        :audio-index="1"
        :can-select="!!audioPlays[0] && !!audioPlays[1]"
        :audio-file="testData.questions[currentQuestion].incorrectAudioUrl"
      />
    </section>
    <section id="likert-scale" v-show="selectedAudio != -1">
      <h2
        :class="{
          done: likertCertainty != -1,
          'current-step': selectedAudio != -1 && likertCertainty == -1
        }"
      >
        Marque quão forte é a relação entre o texto em (1) e o som escolhido em
        (2):
      </h2>
      <likert-scale
        :scale-size="5"
        v-model="likertCertainty"
        :disabled="selectedAudio == -1"
        min-text="Quase não existe relação entre texto e som."
        max-text="Existe uma clara relação entre texto e som."
      />
    </section>
    <PageNav :disabled-button="likertCertainty == -1" @clicked="nextQuestion"
      >Próxima Pergunta</PageNav
    >
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { testData } from "@/data.js";
import PageNav from "@/components/PageNav.vue";
import AudioComponent from "@/components/AudioComponent.vue";
import LikertScale from "@/components/LikertScale.vue";

export default {
  name: "TestPerSe",
  data() {
    return {
      startTime: new Date(),
      videoPlays: 0,
      audioPlays: [0, 0],
      selectedAudio: -1,
      likertCertainty: -1,
      randomBool: !Math.round(Math.random()),
      testData: testData
    };
  },
  computed: {
    ...mapState(["collectedData", "ready"]),
    ...mapGetters(["getAnswerCount"]),
    currentQuestion: function() {
      if (this.getAnswerCount !== null) {
        return this.getAnswerCount;
      }
      return 0;
    }
  },
  watch: {
    videoPlays: function(newValue, oldValue) {
      if (oldValue == 0 && newValue == 1) {
        setTimeout(() => {
          this.$scrollTo(document.getElementById("audio-files"), 2500);
        }, 250);
      }
    },
    selectedAudio: function(newValue, oldValue) {
      if (oldValue == -1 && newValue != -1) {
        setTimeout(() => {
          this.$scrollTo(document.getElementById("likert-scale"), 2500);
        }, 250);
      }
    }
  },
  created() {
    this.incStep(4 + this.currentQuestion);
  },
  methods: {
    ...mapActions(["pushAnswer"]),
    ...mapMutations(["incStep"]),
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

      this.incStep(4 + this.currentQuestion);

      if (this.currentQuestion == this.testData.questions.length) {
        this.$router.push({ name: "LastThoughts" });
      }
    }
  },
  components: { PageNav, AudioComponent, LikertScale }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_mixins.scss";
@import "@/assets/css/_variables.scss";

#test-per-se {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 8rem;
  counter-reset: instruction;
}

#smcc {
  width: 100%;
  display: grid;
  justify-content: center;
  & > div {
    min-width: min(720px, 100vw - 2rem);
    margin-top: 1rem;
    padding: 0.5rem 0.25rem;
    background-color: #000;
    display: grid;
    justify-content: center;
  }
}

#audio-files {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 2rem;
  &.invert-order {
    & > :nth-child(2) {
      grid-column: 2;
      grid-row: 2;
    }
    & > :nth-child(3) {
      grid-column: 1;
      grid-row: 2;
    }
  }
  &:not(.invert-order) {
  }

  h2 {
    grid-column: 1 / span 2;
    grid-row: 1;
  }
}

#likert-scale {
  h2 {
    margin-bottom: 1rem;
  }
  margin-bottom: 2rem;
}

h2 {
  &:before {
    counter-increment: instruction;
    font-weight: 500;
    @include fs(-1);
    content: counter(instruction) ".";
  }
  &.waiting:before {
    opacity: 0;
  }
}

.animated-test h2 {
  &.current-step {
    position: relative;
    color: $accent;
    &:after {
      content: "→";
      position: absolute;
      left: -3ch;
      top: 0;
      font-weight: 800;
    }
  }
}
</style>