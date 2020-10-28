<template>
  <div>
    <LongText>
      <h1>A voz na letra: <br />tipografia modulada pela fala</h1>
      <p>Caro(a) participante,</p>
      <p>
        agradecemos sua contribuição com nossa pesquisa! Preparamos a seguir um
        teste para avaliar uma abordagem que busca representar a voz humana na
        tipografia. Em poucas palavras, queremos traduzir a riqueza expressiva
        da voz — sua melodia, picos e vales de volume, ritmo etc — em riqueza
        expressiva tipográfica.
      </p>
      <p>
        Os resultados desta pesquisa poderão gerar ferramentas para legendas
        para filmes nas quais a interpretação dramática que os atores dão a suas
        vozes esteja representada nas letras; alfabetização e auxílio no
        aprendizado de línguas estrangeiras; auxílio no tratamento de patologias
        de fala; dicas visuais que ajudem disléxicos a decifrar em sons a
        linguagem escrita; entre outras.
      </p>
      <p>
        Se você tiver qualquer dúvida ou reclamação poderá falar conosco em
        <a href="mailto:paula@fee.unicamp.br">paula@fee.unicamp.br</a> ou
        <a href="tel:+551935210246">+55 19 3521-0246</a>
      </p>
      <p>Mais uma vez: nosso muito obrigado pela ajuda!</p>
      <p>
        <br />Caluã Pataca e Paula Dornhofer <br />FEEC / Unicamp
        <br />Campinas, maio de 2019.
      </p>
    </LongText>
    <PageNav href="como-funciona-o-teste">Como funciona?</PageNav>
  </div>
</template>

<script>
// @ is an alias to /src
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";
import { mapMutations } from "vuex";

export default {
  name: "Intro",
  methods: {
    ...mapMutations(["incStep"])
  },
  created() {
    this.incStep(0);
  },
  components: { LongText, PageNav }
};
</script>
