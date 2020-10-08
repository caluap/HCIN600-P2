<template>
  <div>
    <audio
      ref="audio"
      controls
      :src="audioFile"
      :class="{ 'can-select': canSelect }"
    >
      Sentimos muito, mas seu navegador não é compatível com nosso tocador de
      áudio!
    </audio>
    <button @click="selectMe()" :disabled="!canSelect">
      Selecionar este áudio
    </button>
  </div>
</template>

<script>
export default {
  name: "AudioComponent",
  props: ["audioFile", "canSelect"],
  data() {
    return {};
  },
  methods: {
    selectMe: function() {
      this.$emit("selected");
    }
  },
  mounted: function() {
    this.$refs.audio.onended = () => {
      this.$emit("played");
    };
  }
};
</script>

<style lang="scss" scoped>
audio {
  width: 100%;
}
div {
  display: flex;
  flex-direction: column;
}
button {
  margin-top: 0.5rem;
}
</style>