<template>
  <div>
    <LongText>
      <h1>HCIN600</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui cupiditate
        nobis nisi illo rem nam. Quisquam officia sint praesentium unde illum
        corporis totam explicabo voluptatem esse non fugit, nihil consectetur!
      </p>
    </LongText>
    <PageNav href="how-does-it-work">How will the test work?</PageNav>
  </div>
</template>

<script>
// @ is an alias to /src
import LongText from '@/components/LongText.vue';
import PageNav from '@/components/PageNav.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'Intro',
  methods: {
    ...mapMutations(['incStep']),
  },
  created() {
    this.incStep(0);
  },
  components: { LongText, PageNav },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_mixins.scss';

img.bd {
  box-sizing: border-box;
  width: 100%;
  margin: 2rem 0;
  max-height: 50vh;
  object-fit: contain;
  padding: 1rem;
  background: white;
  & + img {
    margin-top: -1rem;
  }
}

p.caption {
  margin-top: -1rem;
  padding-left: 6rem;
  margin-bottom: 2rem;
  @include fs(-1, 1.4, true);
  opacity: 0.5;
}
</style>
