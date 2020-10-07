<template>
  <audio
    ref="audio"
    controls
    :src="audioFile"
    :class="{ 'has-played': playCounter > 0 }"
  >
    Sentimos muito, mas seu navegador não é compatível com nosso tocador de
    áudio!
  </audio>
</template>

<script>
export default {
  name: "AudioComponent",
  props: ["audioFile"],
  data() {
    return {
      playCounter: 0
    };
  },
  mounted: function() {
    this.$refs.audio.onended = () => {
      this.playCounter += 1;
      console.log(this.playCounter);
    };
  }
};
</script>