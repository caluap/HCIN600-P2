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
        Caso queira nos deixar comentários sobre o teste, sobre a tipografia
        modulada pela voz, sobre possíveis aplicações, ou qualquer outro assunto
        que quiser, fique a vontade para usar o campo abaixo. Assim como o
        teste, os comentários são anônimos.
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