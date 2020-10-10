<template>
  <div @click="butClick()">
    <!-- @click on container div solution from https://forum.vuejs.org/t/make-native-event-modifier-conditional/82730/6 -->
    <a
      :class="{ disabled: disabledButton }"
      :is="!!href ? `router-link` : `a`"
      :to="!!href ? href : false"
    >
      <slot></slot>
    </a>
  </div>
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
  },
  methods: {
    butClick: function() {
      this.$emit("clicked");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/_variables.scss";
@import "@/assets/css/_mixins.scss";

a {
  margin-top: 4rem;
  float: right;
  display: block;
  background: $accent;
  color: white;
  border: 3px solid transparent;
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
    background-color: transparent;
    color: #ccc;
    border-color: #bbb;
  }
}
</style>
