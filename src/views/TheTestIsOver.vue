<template>
  <LongText>
    <h1>The test is over!</h1>
    <div v-if="debugMode == 2">
      <p>{{ collectedData }}</p>
    </div>
    <p>
      Thank you very much for your time!
    </p>
    <p>Have {{ timeSensitiveGreeting }}.</p>
    <p class="emoji">😊</p>
  </LongText>
</template>

<script>
import LongText from '@/components/LongText.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'TheTestIsOver',
  methods: {
    ...mapMutations(['incStep']),
  },
  computed: {
    ...mapState(['debugMode', 'collectedData']),
    timeSensitiveGreeting: function() {
      let now = new Date();
      let hour = now.getHours();
      if (hour > 4 && hour < 12) {
        return 'a nice rest of your morning';
      }
      if (hour >= 12 && hour < 18) {
        return 'a nice rest of your afternoon';
      }
      return 'a nice rest of your evening';
    },
  },
  mounted() {
    this.incStep(-1);
  },
  components: { LongText },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_mixins.scss';
.emoji {
  @include fs(5);
  text-align: center;
}
</style>
