<template>
  <div
    id="test-per-se"
    v-if="ready && collectedData && collectedData.general_data !== undefined"
  >
    <section id="question-asker">
      <h1>Round {{ currentQuestion + 1 }} of {{ sizeOfTest }}</h1>
      <h2>
        Which of the two options below would you consider the most effective in
        terms of alleviating the causes and/or effects of climate change?
      </h2>
      <div class="choices">
        <button
          class="choice"
          :class="{ 'selected-choice': currentSelectedOption == 0 }"
          @click="selectOption(0)"
        >
          <h3>{{ currentComparisonPair[0].name }}</h3>
          <p class="description">
            {{ currentComparisonPair[0].description }}
          </p>
          <p class="selection-status"></p>
        </button>
        <button
          class="choice"
          :class="{ 'selected-choice': currentSelectedOption == 1 }"
          @click="selectOption(1)"
        >
          <h3>{{ currentComparisonPair[1].name }}</h3>
          <p class="description">{{ currentComparisonPair[1].description }}</p>
          <p class="selection-status"></p>
        </button>
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
    this.incStep(2 + this.currentQuestion);
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

      this.incStep(2 + this.currentQuestion);

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
@import '@/assets/css/_media_queries.scss';

#test-per-se {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 4rem;
  counter-reset: instruction;
}

h1 {
  margin-bottom: 0;
  font-weight: 500;
  @include fs(2);
}

#question-asker {
  width: 100%;
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  h2 {
    display: block;
    font-weight: 500;
    @include sizer;
  }
  & > div {
    margin-top: 1rem;
    display: grid;
    justify-content: center;
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

.choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @include respond-below(sm) {
    grid-template-columns: 1fr;
  }
}

.choice {
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  border: 2px solid transparent;

  cursor: pointer;
  text-align: left;

  &.selected-choice {
    border-color: $accent;
    background-color: rgba(255, 255, 255, 0.8);
    h3 {
      font-weight: 500;
    }
    .selection-status {
      &:after {
        content: '👍';
        color: black;
      }
    }
  }

  .selection-status {
    text-align: center;
    @include fs(1);
    &:after {
      content: '_';
      color: transparent;
    }
  }
  border-radius: 1rem;
  display: grid;
  grid-template-rows: auto auto min-content;
  grid-gap: 1rem;
  h3 {
    @include fs(1);
  }

  .description {
    @include fs(-1);
    font-style: italic;
  }
}
</style>
