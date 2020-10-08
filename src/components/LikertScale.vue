<template>
  <div>
    <template v-for="index in scaleSize">
      <input
        type="radio"
        :name="`likert-${_uid}`"
        :key="`r-${index}`"
        :id="`r-${index}`"
        :value="index"
        @change="$emit('change', index)"
        :v-model="likertChoice"
      />
      <label :for="`r-${index}`" :key="`l-${index}`">{{ index }}</label>
    </template>
  </div>
</template>

<script>
export default {
  name: "LikertScale",
  props: {
    scaleSize: {
      type: Number,
      default: 5
    },
    likertChoice: {
      type: Number,
      default: -1
    }
  },
  model: {
    prop: "likertChoice",
    event: "change"
  }
};
</script>

<style lang="scss" scoped>
</style>