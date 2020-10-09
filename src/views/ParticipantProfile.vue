<template>
  <div>
    <LongText>
      <h1>Nos fale um pouco sobre você</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum culpa
        quisquam vitae voluptatem provident ex suscipit eum consequatur tempore
        omnis, accusamus consectetur ut inventore soluta. Omnis, quod.
        Laudantium, fuga non?
      </p>
    </LongText>
    <PageNav href="o-teste-em-si">Começar o teste</PageNav>
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";
import { mapMutations } from "vuex";

export default {
  name: "ParticipantProfile",
  components: { LongText, PageNav },
  methods: {
    ...mapMutations(["incStep"])
  },
  created() {
    this.incStep(3);
  }
};
</script>
