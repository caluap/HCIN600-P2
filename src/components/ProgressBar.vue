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
      background-color: $accent;
    }
    &::-moz-progress-bar {
      background-color: $accent;
    }
  }
}
</style>