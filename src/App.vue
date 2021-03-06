<template>
  <div id="app">
    <ProgressBar
      id="test-progress"
      :max="nSteps"
      :value="currentStep"
    ></ProgressBar>

    <div id="debug-mode" v-if="debugMode">debug mode: {{ debugMode }}</div>
    <div :class="{ loading: !ready }" id="router-view-container">
      <router-view />
    </div>
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ProgressBar from '@/components/ProgressBar.vue';

export default {
  name: 'app',
  components: { ProgressBar },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'userId',
      'collectedData',
      'ready',
      'currentStep',
      'debugMode',
    ]),
    ...mapGetters(['getSizeOfTest']),
    nSteps: function() {
      return this.getSizeOfTest + 2;
    },
  },
  methods: {
    ...mapActions(['pushAnswer']),
    newAnswer() {
      this.pushAnswer({
        start_time: new Date(),
        end_time: new Date(),
        duration: new Date(),
        play_count: Math.round(Math.random() * 5),
        stanza_code: `#${Math.round(Math.random() * 9999)}`,
        stanza_url: 'http://www.example.com/',
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
        chose_the_right_choice: !Math.round(Math.random()),
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';
@import '@/assets/css/_mixins.scss';

#app {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
#router-view-container {
  transition: filter ease 0.5s;
  &.loading {
    & > * {
      pointer-events: none;
    }
    filter: blur(10px);
    & + .lds-ring {
      display: inline-block;
    }
  }
  &,
  iframe,
  & > div,
  & > section,
  & > article {
    @include sizer;
  }
}

.lds-ring {
  display: none;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-100%);
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid $accent;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: $accent transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#debug-mode {
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
}
</style>
