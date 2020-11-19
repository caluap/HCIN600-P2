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
        Como você talvez já tenha reparado, esse recurso da tipografia alterada
        pela fala é muito comum nas histórias em quadrinhos. Nelas, o desenho
        expressivo das letras imprime no texto ritmos, ênfases, entonações etc:
      </p>
      <img class="bd" src="@/assets/static/img/bd/maus.png" alt="" />
      <img class="bd" src="@/assets/static/img/bd/persepolis.png" alt="" />
      <img class="bd" src="@/assets/static/img/bd/pilules_bleues.png" alt="" />
      <p class="caption">
        Imagens de: The complete Maus, de Art Spiegelman, The complete
        Persepolis, de Marjane Satrapi e Pilules Bleues, de Fredrik Peeters.
      </p>
      <p>
        As possibilidades são muitas, mas trazem algumas restrições: os melhores
        exemplos de expressividade na letra são desenhados à mão — muitas vezes
        há um profissional especializado cuidando só disso —, e dependem de uma
        sofisticada interação entre os diversos elementos que compõe a cena.
      </p>
      <p>
        Nosso experimento vai por outro caminho: queremos encontrar uma maneira
        de representar a voz na tipografia que, embora simples, sirva para
        imprimir na letra algumas características da voz.
      </p>

      <p>
        Os resultados desta pesquisa poderão gerar ferramentas para legendas
        para filmes nas quais a interpretação dramática que os atores dão a suas
        vozes esteja representada nas letras; alfabetização e auxílio no
        aprendizado de línguas estrangeiras; auxílio no tratamento de patologias
        de fala; dicas visuais que ajudem disléxicos a decifrar em sons a
        linguagem escrita; entre outras.
      </p>

      <p>É nesse contexto que pedimos a sua ajuda!</p>
      <hr />

      <p>
        Se você tiver qualquer dúvida ou reclamação poderá falar conosco em
        <a href="mailto:paula@fee.unicamp.br">paula@fee.unicamp.br</a>.
      </p>
      <p>Mais uma vez: nosso muito obrigado pela ajuda!</p>
      <p>
        <br />Caluã de Lacerda Pataca e Paula Dornhofer <br />FEEC / Unicamp
        <br />Campinas, novembro de 2020.
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
    ...mapMutations(["incStep"]),
  },
  created() {
    this.incStep(0);
  },
  components: { LongText, PageNav },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_mixins.scss";

img.bd {
  box-sizing: border-box;
  width: 100%;
  margin: 2rem 0;
  max-height: 50vh;
  object-fit: contain;
  padding: 1rem;
  background: white;
  & + img {
    margin-top: -1rem;
  }
}

p.caption {
  margin-top: -1rem;
  padding-left: 6rem;
  margin-bottom: 2rem;
  @include fs(-1, 1.4, true);
  opacity: 0.5;
}
</style>
