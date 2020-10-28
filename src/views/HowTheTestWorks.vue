<template>
  <div>
    <LongText v-show="getAnimTest !== null">
      <h1>Como funciona o teste?</h1>
      <p>Serão {{ testData.questions.length }} rodas (curtas!).</p>

      <p>A cada rodada, você deverá:</p>
      <ol>
        <li v-if="getAnimTest">
          Assistir ao vídeo em <span class="img-ref">1</span>;
        </li>
        <li v-if="!getAnimTest">
          Ler com cuidado o texto em <span class="img-ref">1</span>;
        </li>
        <li>Ouvir o áudio em <span class="img-ref">2</span>;</li>
        <li>Ouvir o áudio em <span class="img-ref">3</span>;</li>
        <li>
          Escolher qual dos áudios lhe parece estar melhor relacionado
          {{ getAnimTest ? "ao vídeo" : "à imagem" }} em
          <span class="img-ref">1</span>;
        </li>
        <li>
          Indicar na escala quão forte lhe pareceu a relação entre
          {{ getAnimTest ? "o vídeo" : "a imagem" }} em
          <span class="img-ref">1</span> e o áudio selecionado em
          <span class="img-ref">2</span> ou <span class="img-ref">3</span>;
        </li>
        <li>Avançar para a próxima rodada.</li>
      </ol>
      <p>
        Você poderá {{ getAnimTest ? "assistir ao vídeo e " : "" }}ouvir aos
        áudios quantas vezes achar necessário: não há um tempo máximo (ou
        mínimo) para se fazer o teste; demore quanto quiser.
      </p>
      <hr />
      <p>
        Como usaremos o som do seu computador (ou celular), certifique-se de
        estar em um ambiente silencioso e que o barulho não vá incomodar
        ninguém.
      </p>
      <p>
        Se quiser fazer um teste, o tocador de áudio abaixo tem um exemplo
        semelhante aos que usaremos no teste.
      </p></LongText
    >

    <PageNav href="tcle">Termos do teste</PageNav>
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";
import { mapMutations, mapGetters } from "vuex";
import { testData } from "@/data.js";

export default {
  name: "HowTheTestWorks",
  components: { LongText, PageNav },
  data() {
    return { testData: testData };
  },
  computed: {
    ...mapGetters(["getAnimTest"])
  },
  methods: {
    ...mapMutations(["incStep"])
  },
  created() {
    this.incStep(1);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";

.img-ref {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  font-weight: 510;
  cursor: pointer;
  color: white;
  text-align: center;
  border-radius: 100%;
  background-color: #999;
  transition: 0.25s ease all;
  &:hover {
    font-weight: 650;
    background-color: $accent;
  }
}
</style>