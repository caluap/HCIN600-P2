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
.long-text-self {
  min-height: 66vh;
}
</style>
