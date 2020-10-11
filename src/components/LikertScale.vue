<template>
  <div>
    <component :is="'style'">
      @media (min-width: 720px) { div#likert-{{ _uid }} {
      {{ gridColsDesktop }}
      }} @media (max-width: 720px) { div#likert-{{ _uid }} {
      grid-template-columns: 1fr; } }
    </component>
    <div :id="`likert-${_uid}`" class="likert-container">
      <div :class="{ disabled: disabled }" v-if="minText != ''">
        {{ minText }}
      </div>
      <div
        :class="{ disabled: disabled }"
        v-for="index in scaleSize"
        class="scale-item"
        :key="`d-${index}`"
      >
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
      <div :class="{ disabled: disabled }" v-if="maxText != ''">
        {{ maxText }}
      </div>
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    gridColsDesktop: function() {
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
      @media (min-width: 720px) {
        @include fs(-1);
      }
    }
    &.scale-item {
      &,
      & + :not(.scale-item) {
        @media (min-width: 720px) {
          border-left: 1px solid #999;
        }
        @media (max-width: 720px) {
          border-top: 1px solid #999;
        }
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

.disabled {
  opacity: 0.25;
  pointer-events: none;
}
</style>