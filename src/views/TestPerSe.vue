<template>
  <div
    id="test-per-se"
    v-if="ready && collectedData && collectedData.general_data !== undefined"
  >
    <section id="smcc">
      <h1>Round {{ currentQuestion + 1 }} of {{ sizeOfTest }}</h1>
      <p>{{ currentSelectedOption }}</p>
      <h2>
        Which of the two options below would you consider the most effective in
        terms of alleviating the causes and/or effects of climate change?
      </h2>
      <div>
        <div>
          <h3>{{ currentComparisonPair[0].name }}</h3>
          <p v-if="currentSelectedOption == 0">It's-a me, Mario!</p>
          <p>{{ currentComparisonPair[0].description }}</p>
          <button @click="selectOption(0)">Choose this fucker</button>
        </div>
        <div>
          <h3>{{ currentComparisonPair[1].name }}</h3>
          <p v-if="currentSelectedOption == 1">It's-a me, Luigi!</p>
          <p>{{ currentComparisonPair[1].description }}</p>
          <button @click="selectOption(1)">Choose this other fucker</button>
        </div>
      </div>
    </section>
    <PageNav
      :disabled-button="currentSelectedOption == -1"
      @clicked="nextQuestion"
      >Next round</PageNav
    >
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import PageNav from '@/components/PageNav.vue';

export default {
  name: 'TestPerSe',
  data() {
    return {
      currentSelectedOption: -1,
      startTime: new Date(),
      randomBool: !Math.round(Math.random()),
    };
  },
  computed: {
    ...mapState(['collectedData', 'ready', 'debugMode']),
    ...mapGetters([
      'getAnswerCount',
      'getDataIndex',
      'getCurrentComparison',
      'getCurrentPairOfIndexes',
      'getSizeOfTest',
    ]),
    origin: function() {
      return window.location.origin;
    },
    sizeOfTest: function() {
      return this.getSizeOfTest;
    },
    currentPairOfIndexes: function() {
      return this.getCurrentPairOfIndexes;
    },
    currentComparisonPair: function() {
      return this.getCurrentComparison;
    },
    currentQuestion: function() {
      if (this.getAnswerCount !== null) {
        return this.getAnswerCount;
      }
      return 0;
    },
  },
  watch: {},
  mounted() {
    if (this.currentQuestion == this.sizeOfTest) {
      this.$router.push({ name: 'LastThoughts' });
    }
    this.incStep(4 + this.currentQuestion);
  },
  methods: {
    ...mapActions(['pushAnswer']),
    ...mapMutations(['incStep']),

    selectOption: function(which) {
      this.currentSelectedOption = which;
    },

    nextQuestion: function() {
      const option0 = this.currentComparisonPair[0],
        option1 = this.currentComparisonPair[1];

      // submits current answer to firebase
      let now = new Date();
      let currentAnswer = {
        round: this.currentQuestion,
        start_time: this.startTime,
        end_time: now,
        duration: now - this.startTime,
        option0,
        option1,
        current_pair_of_indexes: this.currentPairOfIndexes,
        selected_option: this.currentComparisonPair[this.currentSelectedOption],
        selected_option_index: this.currentSelectedOption,
      };

      this.pushAnswer(currentAnswer);
      this.startTime = now;
      this.randomBool = !Math.round(Math.random());
      this.currentSelectedOption = -1;

      this.incStep(4 + this.currentQuestion);

      if (this.currentQuestion == this.getSizeOfTest) {
        this.$router.push({ name: 'LastThoughts' });
      }
    },
  },
  components: { PageNav },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_mixins.scss';
@import '@/assets/css/_variables.scss';

#test-per-se {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 4rem;
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

h2 {
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
      content: '→';
      position: absolute;
      left: -3ch;
      top: 0;
      font-weight: 800;
    }
  }
}
</style>
