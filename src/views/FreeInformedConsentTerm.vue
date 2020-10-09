<template>
  <div>
    <LongText>
      <h1>Antes de começar...</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nemo.
        Odit nobis culpa numquam amet exercitationem aliquam suscipit officia
        voluptate architecto. Iste similique dolor quidem sit ex vero quae
        dicta?
      </p>
    </LongText>
    <PageNav href="um-pouco-sobre-voce">Um pouco sobre você</PageNav>
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";
import { mapMutations } from "vuex";

export default {
  name: "FreeInformedConsentTerm",
  components: { LongText, PageNav },
  methods: {
    ...mapMutations(["incStep"])
  },
  created() {
    this.incStep(2);
  }
};
</script>
