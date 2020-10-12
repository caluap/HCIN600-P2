<template>
  <div
    id="test-per-se"
    :class="{
      'animated-test': collectedData.general_data.animated_smccs_test,
      'static-test': !collectedData.general_data.animated_smccs_test
    }"
    v-if="ready && collectedData && collectedData.general_data !== undefined"
  >
    <!-- {{ testData.questions[currentQuestion].videoId }} -->
    <section id="smcc" :class="step1Class" v-show="step1Show">
      <h1>
        Questão {{ currentQuestion + 1 }} de {{ testData.questions.length }}
      </h1>
      <h2>
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
        <img
          :src="testData.questions[currentQuestion].imageUrl"
          alt=""
          class="smcc-img"
        />
      </div>
    </section>
    <section id="audio-files" v-show="step2Show" :class="step2Class">
      <h2>
        Ouça os dois arquivos de áudio abaixo e marque aquele que melhor se
        relaciona com o texto acima:
      </h2>
      <audio-component
        @played="incAudioPlays(0)"
        v-model="selectedAudio"
        :audio-index="0"
        :can-select="!!audioPlays[0] && !!audioPlays[1]"
        :audio-file="testData.questions[currentQuestion].correctAudioUrl"
      />
      <audio-component
        @played="incAudioPlays(1)"
        v-model="selectedAudio"
        :audio-index="1"
        :can-select="!!audioPlays[0] && !!audioPlays[1]"
        :audio-file="testData.questions[currentQuestion].incorrectAudioUrl"
      />
    </section>
    <section id="likert-scale" v-show="step3Show" :class="step3Class">
      <h2>
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
    },
    step1Class: function() {
      if (this.collectedData.general_data.animated_smccs_test) {
        if (this.videoPlays == 0) {
          return "current-step";
        }
        return "done";
      } else {
        return "current-step";
      }
    },
    step2Class: function() {
      let c = this.randomBool ? "invert-order " : "";
      if (this.collectedData.general_data.animated_smccs_test) {
        if (this.videoPlays == 0) {
          return c + "waiting";
        }
        if (this.videoPlays > 0 && this.selectedAudio == -1) {
          return c + "current-step";
        }
        return c + "done";
      } else {
        return c + "current-step";
      }
    },
    step3Class: function() {
      if (this.collectedData.general_data.animated_smccs_test) {
        if (this.videoPlays == 0 || this.selectedAudio == -1) {
          return "waiting";
        }
        if (this.selectedAudio != -1 && this.likertCertainty == -1) {
          return "current-step";
        }
        return "done";
      } else {
        return "current-step";
      }
    },
    step1Show: function() {
      return true;
    },
    step2Show: function() {
      if (
        !this.collectedData.general_data.animated_smccs_test ||
        this.videoPlays > 0
      ) {
        return true;
      }
      return false;
    },
    step3Show: function() {
      if (
        !this.collectedData.general_data.animated_smccs_test ||
        this.selectedAudio != -1
      ) {
        return true;
      }
      return false;
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
  mounted() {
    if (this.currentQuestion == this.testData.questions.length) {
      this.$router.push({ name: "LastThoughts" });
    }
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
        duration: now - this.startTime,
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

.static-test #smcc > div {
  background-color: #ccc;
}
.animated-test #smcc > div {
  background-color: #000;
}

h1 {
  margin-bottom: 0;
  font-weight: 750;
  @include fs(0);
}

#smcc {
  width: 100%;
  display: grid;
  justify-content: center;
  h2 {
    display: block;
    @include sizer;
  }
  & > div {
    margin-top: 1rem;
    display: grid;
    justify-content: center;
  }
}
.smcc-img {
  max-width: 100%;
}

#audio-files {
  width: 100%;
  display: grid;
  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
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
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    grid-row-gap: 2rem;
    &.invert-order {
      & > :nth-child(2) {
        grid-row: 3;
      }
      & > :nth-child(3) {
        grid-row: 2;
      }
    }
  }

  h2 {
    @media (min-width: 720px) {
      grid-column: 1 / span 2;
      grid-row: 1;
    }
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
    content: counter(instruction) ". ";
  }
  &.waiting:before {
    opacity: 0;
  }
}

.waiting h2 {
  opacity: 0;
}

.done h2 {
  font-weight: 500;
  opacity: 0.5;
}

.current-step h2 {
}

.animated-test {
  .current-step h2 {
    color: $accent;
    position: relative;
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