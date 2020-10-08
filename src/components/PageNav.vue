<template>
  <a
    @click="$emit(`clicked`)"
    :class="{ disabled: disabledButton }"
    :is="!!href ? `router-link` : `a`"
    :to="!!href ? href : false"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "PageNav",
  props: {
    href: { type: String, default: "" },
    disabledButton: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/_variables.scss";
@import "@/assets/css/_mixins.scss";

a {
  display: inline-block;
  background: $accent;
  color: white;
  padding: 0.9rem 2rem 1rem;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: 0.15s all ease;

  user-select: none;

  font-weight: 500;
  @include fs(1);
  cursor: pointer;

  &:not(.disabled):hover {
    background: black;
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
}
</style>
