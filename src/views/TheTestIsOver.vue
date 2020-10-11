<template>
  <p>The test is over... now!</p>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "TheTestIsOver",
  methods: {
    ...mapMutations(["incStep"])
  },
  mounted() {
    this.incStep(-1);
  }
};
</script>