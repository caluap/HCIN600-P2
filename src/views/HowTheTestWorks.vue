<template>
  <div>
    <LongText v-show="getAnimTest !== null">
      <h1>Como funciona o teste?</h1>
      <p>
        O teste é composto por {{ testData.questions.length }} rodadas. Em cada
        uma, você encontrará uma interface semelhante à apresentada abaixo:
      </p>

      <div id="example-imgs">
        <div class="img-holder" id="img1">
          <img
            v-if="getAnimTest"
            src="@/assets/static/img/sketch-video.png"
            alt="Quadro congelado de um vídeo. Nele, os versos: “O fim nos acena / com um gesto discreto: / um pouco de pena / e escárnio secreto.” Os dois primeiros versos estão em uma cor mais clara que os demais."
          />
          <img
            v-else
            src="@/assets/static/img/sketch-image.png"
            alt="O seguinte trecho de poema: “O fim nos acena / com um gesto discreto: / um pouco de pena / e escárnio secreto.” A tipografia possui algumas modificações gráficas em cada uma das sílabas."
          />
          <span class="img-ref left">1</span>
        </div>

        <div class="two-cols">
          <div class="img-holder" id="img2">
            <img
              src="@/assets/static/img/sketch-audio-left.png"
              alt="Um tocador de áudio."
            />
            <span class="img-ref left">2</span>
          </div>
          <div class="img-holder" id="img3">
            <img
              src="@/assets/static/img/sketch-audio-right.png"
              alt="Outro tocador de áudio."
            />
            <span class="img-ref right">3</span>
          </div>
        </div>
        <div class="img-holder likert" id="img4">
          <img
            src="@/assets/static/img/sketch-likert.png"
            alt="Uma escala likert de cinco itens entre 1 e 5."
          />
          <span class="img-ref left">4</span>
        </div>
      </div>

      <p>A cada rodada:</p>
      <ol>
        <li v-if="getAnimTest">
          Assista ao vídeo em
          <span
            class="img-ref"
            @mouseover="glowImg('img1')"
            @mouseleave="unglowImg('img1')"
            >1</span
          >;
        </li>
        <li v-if="!getAnimTest">
          Leia com cuidado o texto em
          <span
            class="img-ref"
            @mouseover="glowImg('img1')"
            @mouseleave="unglowImg('img1')"
            >1</span
          >;
        </li>
        <li>
          Ouça o áudio em
          <span
            class="img-ref"
            @mouseover="glowImg('img2')"
            @mouseleave="unglowImg('img2')"
            >2</span
          >
          e em
          <span
            class="img-ref"
            @mouseover="glowImg('img3')"
            @mouseleave="unglowImg('img3')"
            >3</span
          >;
        </li>
        <li>
          Escolha qual dos áudios lhe parece estar melhor relacionado
          {{ getAnimTest ? "ao vídeo" : "à imagem" }};
        </li>
        <li>
          Indique na escala
          <span
            class="img-ref"
            @mouseover="glowImg('img4')"
            @mouseleave="unglowImg('img4')"
            >4</span
          >
          quão forte lhe pareceu a relação entre
          {{ getAnimTest ? "o vídeo" : "a imagem" }}
          e o áudio selecionado;
        </li>
        <li>Avance para a próxima rodada.</li>
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
        semelhante aos que usaremos no teste:
      </p>

      <div id="audio-spacer">
        <audio-component
          :disabled="false"
          :audio-index="0"
          :can-select="false"
          :audio-file="require(`@/assets/static/sounds/audio-example.mp3`)"
        />
      </div>
    </LongText>

    <PageNav href="tcle">Termos do teste</PageNav>
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";
import AudioComponent from "@/components/AudioComponent.vue";
import { mapMutations, mapGetters } from "vuex";
import { testData } from "@/data.js";

export default {
  name: "HowTheTestWorks",
  components: { LongText, PageNav, AudioComponent },
  data() {
    return { testData: testData };
  },
  computed: {
    ...mapGetters(["getAnimTest"])
  },
  methods: {
    ...mapMutations(["incStep"]),
    glowImg: function(id) {
      document.getElementById(id).classList.add("glow");
    },
    unglowImg: function(id) {
      document.getElementById(id).classList.remove("glow");
    }
  },
  created() {
    this.incStep(1);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";

#example-imgs {
  margin: 2rem 0 3rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.25rem;
  img {
    width: calc(100% - 1rem);
    margin: 0.5rem;
  }
  .two-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.25rem;
  }
}
.img-holder {
  position: relative;
  &.likert {
    padding-top: 2rem;
    .img-ref {
    }
  }
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.125rem;
  transition: all 0.75s ease;

  &.glow {
    border-color: $accent;
  }
  .img-ref {
    position: absolute;
    transform: scale(0.75);
    top: 0;
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
}

.img-ref {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  font-weight: 510;
  text-align: center;
  border-radius: 100%;
  color: white;
  @at-root .img-holder & {
    font-weight: 650;
    background-color: $accent;
  }
  @at-root li & {
    background-color: #999;
    transition: 0.25s ease all;
    &:hover {
      font-weight: 650;
      background-color: $accent;
    }
  }
}

#audio-spacer {
  margin-top: 1rem;
}
</style>