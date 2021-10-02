<template>
  <div>
    <LongText v-show="getAnimTest !== null">
      <h1>How the test works</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ad
        possimus soluta eum alias voluptatem unde architecto veritatis eius
        nostrum, nam recusandae libero sapiente rem porro beatae doloribus
        officiis assumenda.
      </p>
    </LongText>

    <PageNav href="about-you">Tell us a bit about yourself</PageNav>
  </div>
</template>

<script>
import LongText from '@/components/LongText.vue';
import PageNav from '@/components/PageNav.vue';
import { mapMutations, mapGetters } from 'vuex';
import { testData } from '@/data.js';

export default {
  name: 'HowTheTestWorks',
  components: { LongText, PageNav },
  data() {
    return { testData: testData };
  },
  computed: {
    ...mapGetters(['getAnimTest']),
  },
  methods: {
    ...mapMutations(['incStep']),
    glowImg: function(id) {
      document.getElementById(id).classList.add('glow');
    },
    unglowImg: function(id) {
      document.getElementById(id).classList.remove('glow');
    },
  },
  created() {
    this.incStep(1);
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

#example-imgs {
  margin: 2rem 0 3rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.25rem;
  img {
    width: calc(100% - 1rem);
    margin: 0.5rem;
  }
  .two-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.25rem;
  }
}
.img-holder {
  position: relative;
  &.likert {
    padding-top: 2rem;
    .img-ref {
    }
  }
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.125rem;
  transition: all 0.75s ease;

  &.glow {
    border-color: $accent;
  }
  .img-ref {
    position: absolute;
    transform: scale(0.75);
    top: 0;
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
}

.img-ref {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  font-weight: 510;
  text-align: center;
  border-radius: 100%;
  color: white;
  @at-root .img-holder & {
    font-weight: 650;
    background-color: $accent;
  }
  @at-root li & {
    background-color: #999;
    transition: 0.25s ease all;
    &:hover {
      font-weight: 650;
      background-color: $accent;
    }
  }
}

#audio-spacer {
  margin-top: 1rem;
}
</style>
