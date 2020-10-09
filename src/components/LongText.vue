<template>
  <div class="long-text-self">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LongText"
};
</script>

<style scoped lang="scss">
@import "@/assets/css/_variables.scss";

.long-text-self {
  min-height: 66vh;
}
p + p {
  margin-top: 1.35rem;
}

strong {
  font-weight: 700;
}

a {
  color: black;
  text-decoration-color: darken($accent, 10%);
  $p: 0.25rem;
  border-radius: $p;
  padding-left: $p;
  padding-right: $p;
  position: relative;
  left: -$p;
  margin-right: -$p * 2;
  &:hover {
    background: $light-accent;
    text-decoration: none;
  }
}
</style>
