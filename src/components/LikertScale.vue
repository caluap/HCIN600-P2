<template>
  <div class="likert-container" :style="gridCols">
    <div v-if="minText != ''">
      {{ minText }}
    </div>
    <div v-for="index in scaleSize" class="scale-item" :key="`d-${index}`">
      <label :for="`r-${index}`" :key="`l-${index}`"
        ><input
          type="radio"
          :name="`likert-${_uid}`"
          :key="`r-${index}`"
          :id="`r-${index}`"
          :value="index"
          @change="$emit('change', index)"
          :v-model="likertChoice"
        />
        {{ index }}</label
      >
    </div>
    <div v-if="maxText != ''">
      {{ maxText }}
    </div>
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
    },
    minText: {
      type: String,
      default: ""
    },
    maxText: {
      type: String,
      default: ""
    }
  },
  computed: {
    gridCols: function() {
      let s = "grid-template-columns: ";
      if (this.minText !== "") s += "2fr ";
      s += `repeat(${this.scaleSize}, 1fr)`;
      if (this.maxText !== "") s += " 2fr;";
      return s;
    }
  },
  model: {
    prop: "likertChoice",
    event: "change"
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_mixins.scss";
.likert-container {
  display: grid;
  grid-gap: 0.5rem;
  div {
    padding: 0.5rem 1rem;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
    &:nth-child(odd) {
    }
    &:not(.scale-item) {
      @include fs(-2);
    }
    &.scale-item {
      &,
      & + :not(.scale-item) {
        border-left: 1px solid #999;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 0.55rem; // optical alignment
    }
  }
}

label {
  &,
  input {
    cursor: pointer;
  }
  input {
    margin: 0 0.25rem 0 0;
  }
}
</style>