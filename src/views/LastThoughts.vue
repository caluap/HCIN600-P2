<template>
  <div>
    <LongText>
      <h1>Umas últimas palavras antes de encerrar</h1>
      <p>
        Estamos ainda em uma etapa preliminar de nossas explorações sobre como
        representar a voz na tipografia, mas acreditamos que este caminho tem
        bastante potencial e poderá futuramente desembocar em aplicações úteis
        para a sociedade como um todo.
      </p>
      <p>
        Esse longo processo depende de voluntários como você. Pelo seu tempo e
        disposição, somos muitissimamente gratos!
      </p>
      <hr />
      <p>
        Caso queira trocar impressões, ficar sabendo de novidades de nossa
        pesquisa ou mesmo receber convites para as etapas seguintes, mande uma
        mensagem para
        <a href="mailto:paula@fee.unicamp.br">paula@fee.unicamp.br</a> que a
        gente entra em contato.
      </p>
      <p>
        Você pode também nos enviar algum comentário (de maneira anônima) usando
        o campo abaixo:
      </p>
      <textarea v-model="comment"></textarea>
    </LongText>
    <PageNav @clicked="submitComments()">Encerrar teste</PageNav>
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "LastThoughts",
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    ...mapActions(["closeTest"]),
    ...mapMutations(["incStep"]),
    submitComments: function() {
      this.closeTest(this.comment);
      this.$router.push({ name: "TheTestIsOver" });
    }
  },
  mounted() {
    this.incStep(-1);
  },
  components: { LongText, PageNav }
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