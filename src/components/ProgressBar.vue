<template>
  <progress :max="max" :value="value"></progress>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ["max", "value"]
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";

progress {
  display: none;
  max-width: unset;
  &[value] {
    display: block;
    position: fixed;

    /* Reset the default appearance */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border: none;
    color: $accent;

    left: 0;
    top: 0;
    width: 100%;
    height: 0.25rem;

    &::-webkit-progress-bar {
      background-color: rgba(0, 0, 0, 0.125);
    }
    &::-webkit-progress-value {
      transition: width 2s ease;
      background-color: $accent;
    }
    // for some reasone this has to be split from the above block,
    // even though they are both equal
    &::-moz-progress-bar {
      transition: width 2s ease;
      background-color: $accent;
    }
  }
}
</style>