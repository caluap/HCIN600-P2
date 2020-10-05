<template>
  <div>
    <LongText>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur hic
      facere ut quibusdam explicabo sunt, alias, eius cumque illo at, ex et eos
      deserunt! Ratione voluptatum corporis dignissimos mollitia voluptatem.
    </LongText>
    <PageNav href="como-funciona-o-teste">Como funciona?</PageNav>
  </div>
</template>

<script>
// @ is an alias to /src
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";

export default {
  name: "Intro",
  components: { LongText, PageNav }
};
</script>
