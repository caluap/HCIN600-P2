<template>
  <div>
    <LongText>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum culpa
      quisquam vitae voluptatem provident ex suscipit eum consequatur tempore
      omnis, accusamus consectetur ut inventore soluta. Omnis, quod. Laudantium,
      fuga non?
    </LongText>
    <PageNav href="o-teste-em-si">E agora, o teste</PageNav>
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";

export default {
  name: "ParticipantProfile",
  components: { LongText, PageNav }
};
</script>
