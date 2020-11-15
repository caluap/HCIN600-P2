<template>
  <LongText>
    <h1>Você terminou o teste!</h1>
    <div v-if="debugMode == 2">
      <p>{{ collectedData }}</p>
    </div>
    <p>
      Pelo seu tempo e disposição, somos muitissimamente gratos!
    </p>
    <p>
      Caso queira trocar impressões, ficar sabendo de novidades de nossa
      pesquisa ou mesmo receber convites para as etapas seguintes, mande uma
      mensagem para
      <a href="mailto:paula@fee.unicamp.br">paula@fee.unicamp.br</a> que a gente
      entra em contato.
    </p>
    <p>
      Foram apresentados quatro poemas, todos de Paulo Henriques Britto e lidos
      por
      <a
        href="https://open.spotify.com/artist/1ustMNrldThyWFqmTbduQw"
        target="_blank"
        >Gabriel Edé</a
      >:
      <a href="https://www.youtube.com/watch?v=JOOw5qvXAvc" target="_blank"
        >Súcubo</a
      >;
      <a href="https://www.youtube.com/watch?v=CdgyhU9r54o" target="_blank"
        >Três Prenúncios, III</a
      >;
      <a href="https://www.youtube.com/watch?v=BoEg8zjjm0w" target="_blank"
        >Três tercinas, I</a
      >;
      <a href="https://www.youtube.com/watch?v=YlZG4mTEHiY" target="_blank"
        >Dez sonetóides mancos, VI</a
      >.
    </p>
    <p>Tenha {{ timeSensitiveGreeting }}, e até a próxima!</p>
    <p class="emoji">😊</p>
  </LongText>
</template>

<script>
import LongText from "@/components/LongText.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "TheTestIsOver",
  methods: {
    ...mapMutations(["incStep"])
  },
  computed: {
    ...mapState(["debugMode", "collectedData"]),
    timeSensitiveGreeting: function() {
      let now = new Date();
      let hour = now.getHours();
      if (hour > 4 && hour < 12) {
        return "um bom dia";
      }
      if (hour >= 12 && hour < 20) {
        return "uma boa tarde";
      }
      return "uma boa noite";
    }
  },
  mounted() {
    this.incStep(-1);
  },
  components: { LongText }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_mixins.scss";
.emoji {
  @include fs(5);
  text-align: center;
}
</style>