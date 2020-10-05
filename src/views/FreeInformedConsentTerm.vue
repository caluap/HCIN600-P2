<template>
  <div>
    <LongText>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nemo. Odit
      nobis culpa numquam amet exercitationem aliquam suscipit officia voluptate
      architecto. Iste similique dolor quidem sit ex vero quae dicta?
    </LongText>
    <PageNav href="um-pouco-sobre-voce">Um pouco sobre você</PageNav>
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";

export default {
  name: "FreeInformedConsentTerm",
  components: { LongText, PageNav }
};
</script>
