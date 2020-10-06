<template>
  <div>
    <ProgressBar
      id="test-progress"
      :max="testData.questions.length"
      :value="currentQuestion"
    ></ProgressBar>
    <section id="smcc"></section>
    <section id="audio-files"></section>
    <section id="likert-scale"></section>
    <PageNav @clicked="nextQuestion">Próxima Pergunta</PageNav>
  </div>
</template>

<script>
import { testData } from "@/data.js";
import PageNav from "@/components/PageNav.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "TestPerSe",
  data() {
    return {
      currentQuestion: 0,
      testData: testData
    };
  },
  methods: {
    nextQuestion: function() {
      // submits current answer to firebase
      this.currentQuestion++;
    }
  },
  components: { PageNav, ProgressBar }
};
</script>

<style lang="scss" scoped>
</style>