<template>
  <div :class="{ selected: audioIndex == selectedAudio, disabled: disabled }">
    <audio
      ref="audio"
      controls
      :src="audioFile"
      :class="{ 'can-select': canSelect }"
    >
      Sentimos muito, mas seu navegador não é compatível com nosso tocador de
      áudio!
    </audio>
    <button ref="playBut" class="audio-control" @click="play()"></button>
    <button
      class="selection-button"
      :class="{ selected: audioIndex == selectedAudio }"
      @click="selectMe()"
      :disabled="!canSelect"
    >
      <template v-if="audioIndex != selectedAudio">
        Selecionar este áudio
      </template>
      <template v-else>
        Áudio selecionado!
      </template>
    </button>
  </div>
</template>

<script>
export default {
  name: "AudioComponent",
  props: {
    audioFile: String,
    canSelect: Boolean,
    selectedAudio: Number,
    audioIndex: Number,
    disabled: { type: Boolean, default: false }
  },
  model: {
    prop: "selectedAudio",
    event: "change"
  },
  methods: {
    selectMe: function() {
      this.$emit("change", this.audioIndex);
    },
    play: function() {
      // currently playing, so a click = stop!
      if (!this.$refs.audio.paused) {
        this.$refs.playBut.classList.remove("playing");
        if (
          this.$refs.audio.currentTime >
          (2 / 3) * this.$refs.audio.duration
        ) {
          this.$emit("ended");
        }
        this.$refs.audio.currentTime = 0;
      } else {
        // currently stoped, so a click = play!
        this.$refs.audio.play();
        this.$refs.playBut.classList.add("playing");
        this.$emit("playing");
      }
    }
  },
  mounted: function() {
    this.$refs.audio.onended = () => {
      this.$refs.playBut.classList.remove("playing");
      this.$emit("ended");
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";
audio {
  display: none;
}
$s: 2.5rem;

div {
  display: grid;
  align-items: center;
  grid-gap: 0.5rem;
  grid-template-columns: min-content auto;
  padding: 0.5rem 0.6rem;
  background-color: transparent;
  border-radius: 0;
  transition: 0.5s ease background-color, 0.6s ease border-radius,
    0.5s ease opacity;
  border-radius: 0.666rem;
  background-color: #ccc;
  &.selected {
    background: #fff;
  }
}

.disabled {
  pointer-events: none;
}

.audio-control {
  background-color: black;
  background-size: $s/2;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("~@/assets/static/img/play-solid.svg");
  width: $s * 2;
  height: $s;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: $accent;
  }
  &.playing {
    background-image: url("~@/assets/static/img/stop-solid.svg");
  }
}
button.selection-button {
  &:disabled {
    opacity: 0;
  }
  height: $s;
  transition: 0.5s ease all;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  &:not(:disabled) {
    cursor: pointer;
    &:not(.selected) {
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &.selected {
    cursor: default;
    font-weight: bold;
  }
}
</style>