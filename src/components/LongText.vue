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
@import "@/assets/css/_mixins.scss";

.long-text-self {
  min-height: 66vh;
  margin-bottom: 4rem;
}
p {
  font-weight: 430;
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

ol,
ul {
  margin: 1.5rem 0 1.5rem;
  li {
    & + li {
      margin-top: 1rem;
    }
  }
}
ol {
  counter-reset: cont;
  li:before {
    position: absolute;
    display: inline-block;
    margin-left: -1.4rem;
    margin-top: 0.183rem;
    text-align: right;
    @include fs(-1);
    font-weight: 480;
    content: counter(cont) ".";
    counter-increment: cont;
  }
}
</style>
