<template>
  <div>
    <LongText>
      <h1>Climate change mitigation strategies</h1>
      <p>
        Hello! This is the website for a study being conducted by Chin-Lan
        Chiang, Narayanan Asuri Krishnan, and Caluã de Lacerda Pataca, for the
        HCIN600 / Research Methods course, taught by Dr. Garreth Tigwell, of the
        Rochester Institute of Technology.
      </p>
      <p>
        In this study, we aim to understand how different climate mitigation
        strategies are ranked in terms of their perceived relative
        effectiveness. Here, we assume that human-induced climate change is
        given, the challenge being understanding what is our best course of
        action moving forward.
      </p>
      <p>
        This test is simple: after some optional demographic questions about
        yourself on the next page, you will be shown a screen where two
        mitigation strategies are displayed. Please, choose the one you believe
        would be most effective of the two to tackle climate change. This can
        both mean its direct effects and its causes.
      </p>
      <p>
        This process will be repeated {{ 1 }} times. If you see the same
        strategy shown more than once, don't worry: the idea is to compare them
        to each other, so the pairs are unique, even if the individual options
        do repeat. After you finish, there will be a space for you to send your
        (optional) comments.
      </p>
      <p>
        One last thing: even though this study, being a course project as it is,
        has not gone through an ethics review process, rest assured that all
        data you submit is anonymous. Also, if at any time you wish to quit the
        test, please do so!
      </p>
      <p>
        If you have any comments, suggestions, bug reports, etc: feel free to
        send them to us at
        <a href="mailto:calua.pataca@gmail.com">calua.pataca@gmail.com</a>.
      </p>
      <p>Thank you, and let's start.</p>
    </LongText>
    <PageNav href="about-you">Tell us about yourself →</PageNav>
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
