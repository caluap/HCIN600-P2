<template>
  <div>
    <LongText>
      <h1>Como vai funcionar o teste?</h1>
      <p>
        Rem atque accusamus sunt repudiandae cupiditate vel suscipit minus
        necessitatibus et error! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Et odit totam itaque eligendi? Minus commodi accusamus
        voluptatum voluptates!
      </p>
    </LongText>
    <PageNav href="tcle">Termos do teste</PageNav>
  </div>
</template>

<script>
import LongText from "@/components/LongText.vue";
import PageNav from "@/components/PageNav.vue";

export default {
  name: "HowTheTestWorks",
  components: { LongText, PageNav }
};
</script>
