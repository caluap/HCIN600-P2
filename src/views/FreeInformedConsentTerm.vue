<template>
  <div>
    <LongText>
      <h1>Antes de começar...</h1>
      <p>
        Esta é uma pesquisa homologada pelo
        <a
          href="//prp-web.cenapad.unicamp.br/pt-br/cep-comite-de-etica-em-pesquisa"
          target="_blank"
          >Comitê de Ética em Pesquisa</a
        >
        (CEP) da Universidade Estadual de Campinas (Unicamp). O número de seu
        Certificado de Apresentação para Apreciação Ética (CAAE) é
        09321819.1.0000.5404.
      </p>
      <p>
        Ao participar desta avaliação, você deve declarar estar de acordo com
        nossos termos de privacidade. Você pode encontrá-los na íntegra
        <a href="/tcle.pdf" target="_blank"> <strong>aqui</strong> </a>.
      </p>
      <p>
        Importante ressaltar um ponto: se a qualquer momento e por qualquer
        razão você quiser abandonar o teste fique à vontade — não estará
        causando nenhum mal ao teste.
      </p>
      <p>
        <input type="checkbox" id="cbx" v-model="acceptedTheTerms" />
        <label class="lbl" for="cbx">
          <span></span>Declaro ter recebido esclarecimentos sobre a natureza da
          pesquisa, seus objetivos, métodos, benefícios previstos e seus
          potenciais riscos e, sob esses termos, aceito participar.
        </label>
      </p>
    </LongText>
    <PageNav :disabled-button="!acceptedTheTerms" href="um-pouco-sobre-voce"
      >Um pouco sobre você</PageNav
    >
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";
import { mapMutations } from "vuex";

export default {
  name: "FreeInformedConsentTerm",
  components: { LongText, PageNav },
  data() {
    return {
      acceptedTheTerms: false
    };
  },
  methods: {
    ...mapMutations(["incStep"])
  },
  created() {
    this.incStep(2);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";

.lbl {
  user-select: none;
  span {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 2px;
    position: relative;
    top: 1px;
    margin-right: 0.5rem;
    border: 1px solid $accent;
    background: white;
  }
  cursor: pointer;
}

#cbx {
  display: none;
}

#cbx:checked ~ .lbl {
  span {
    background: $accent;
  }
}
</style>
