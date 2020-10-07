<template>
  <div id="test-per-se">
    <ProgressBar
      id="test-progress"
      :max="testData.questions.length"
      :value="currentQuestion"
    ></ProgressBar>
    <section id="smcc">
      <template v-if="collectedData.general_data.animated_smccs_test">
        <youtube
          host="https://www.youtube-nocookie.com"
          :video-id="testData.questions[currentQuestion].videoId"
          >Animado?</youtube
        >
      </template>
      <template v-else>
        <img :src="testData.questions[currentQuestion].imageUrl" alt="" />
      </template>
    </section>
    <section id="audio-files"></section>
    <section id="likert-scale"></section>
    <PageNav @clicked="nextQuestion">Próxima Pergunta</PageNav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
  computed: {
    ...mapState(["collectedData"])
  },
  methods: {
    ...mapActions(["pushAnswer"]),
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