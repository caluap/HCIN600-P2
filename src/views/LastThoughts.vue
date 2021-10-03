<template>
  <div>
    <LongText>
      <h1>Some last thoughts</h1>
      <p>
        If you'd like to leave us any comments about the test, climate change,
        mitigation strategies, or any other topic you want, feel free to use the
        field below. Like the test itself, these answers are all anonymous. If
        not, just click the button below to submit your answers.
      </p>
      <textarea v-model="comment"></textarea>
    </LongText>
    <PageNav @clicked="submitComments()">Finish the test</PageNav>
  </div>
</template>

<script>
import LongText from '@/components/LongText.vue';
import PageNav from '@/components/PageNav.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'LastThoughts',
  data() {
    return {
      comment: '',
    };
  },
  methods: {
    ...mapActions(['closeTest']),
    ...mapMutations(['incStep']),
    submitComments: function() {
      this.closeTest(this.comment);
      this.$router.push({ name: 'TheTestIsOver' });
    },
  },
  mounted() {
    this.incStep(-1);
  },
  components: { LongText, PageNav },
};
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  font-size: 16px;
  border: none;
  box-sizing: border-box;
  margin: 2rem 0 1rem;
  padding: 1rem;
  min-height: 12rem;
}
</style>
