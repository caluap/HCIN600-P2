<template>
  <div>
    <LongText>
      <h1>Tell us a bit about yourself</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit porro
        voluptatibus aperiam doloribus maiores! Veritatis, maxime deleniti?
        Fugit atque dolorum magnam inventore, in similique quia veritatis
        explicabo asperiores, hic consequuntur!
      </p>
      <div id="questionnaire">
        <label for="education">Which is your current educational level?</label>
        <select name="education" v-model="selectedEducation">
          <option disabled value>Click to choose</option>
          <option v-for="(ed, index) in education" :key="'ed-' + index">{{
            ed
          }}</option>
        </select>
        <label for="age-group">What is your age?</label>
        <select name="age-group" v-model="selectedAgeGroup">
          <option disabled value>Click to choose</option>
          <option v-for="(ag, index) in ageGroup" :key="'ag-' + index">{{
            ag
          }}</option>
        </select>
        <label for="gender">Which gender do you mostly identify with?</label>
        <select name="gender" v-model="selectedGender">
          <option disabled value>Click to choose</option>
          <option v-for="(gender, index) in genders" :key="'gender-' + index">{{
            gender
          }}</option>
        </select>
      </div>
    </LongText>
    <PageNav
      :disabled-button="
        selectedAgeGroup == '' ||
          selectedEducation == '' ||
          selectedGender == ''
      "
      @clicked="submit()"
      href="questions"
      >Let’s start!</PageNav
    >
  </div>
</template>

<script>
import LongText from '@/components/LongText.vue';
import PageNav from '@/components/PageNav.vue';
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'ParticipantProfile',
  components: { LongText, PageNav },
  data() {
    return {
      education: [
        'High school or lower',
        'Bachelor’s or equivalent level',
        'Master’s or equivalent level',
        'Doctor or equivalent level',
        'I’d rather not answer this',
      ],
      ageGroup: [
        '18 to 24 years',
        '25 to 34 years',
        '35 to 44 years',
        '45 to 54 years',
        '54 to 64 years',
        '65 years or older',
        'I’d rather not answer this',
      ],
      genders: [
        'Masculine',
        'Feminine',
        'Non-binary',
        'Other',
        'I’d rather not answer this',
      ],
      selectedAgeGroup: '',
      selectedEducation: '',
      selectedGender: '',
    };
  },
  methods: {
    ...mapMutations(['incStep']),
    ...mapActions(['setupUserProfile']),
    submit: function() {
      this.setupUserProfile({
        age_group: this.selectedAgeGroup,
        education: this.selectedEducation,
        gender: this.selectedGender,
      });
    },
  },
  computed: {
    ...mapState(['collectedData']),
    ...mapGetters(['getAboutTheParticipant']),
  },
  created() {
    this.incStep(3);
    // in case data isn't loaded but loads after page is set up, this watcher
    // should update the comboboxes. from: https://dev.to/viniciuskneves/watch-for-vuex-state-changes-2mgj
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getAboutTheParticipant,
      (newValue) => {
        if (newValue != null) {
          if (newValue.age_group != null)
            this.selectedAgeGroup = newValue.age_group;
          if (newValue.education != null)
            this.selectedEducation = newValue.education;
          if (newValue.gender != null) this.selectedGender = newValue.gender;
        }
      }
    );
  },
  mounted() {
    if (this.getAboutTheParticipant != null) {
      if (this.getAboutTheParticipant.age_group != null)
        this.selectedAgeGroup = this.getAboutTheParticipant.age_group;
      if (this.getAboutTheParticipant.education != null)
        this.selectedEducation = this.getAboutTheParticipant.education;
      if (this.getAboutTheParticipant.gender != null)
        this.selectedGender = this.getAboutTheParticipant.gender;
    }
  },
  beforeDestroy() {
    this.unwatch();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_mixins.scss';
@import '@/assets/css/_variables.scss';

#questionnaire {
  margin-top: 2rem;
}

select {
  cursor: pointer;
  display: block;
  @include fs(0);

  margin: 0.5rem 0 1.5rem 0;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;

  box-sizing: border-box;

  border: 1px solid #aaa;
  // box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);

  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;

  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  // ,
  //   linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
select::-ms-expand {
  display: none;
}
select:hover {
  border-color: #888;
}
select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px $accent;
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
select option {
  font-weight: normal;
}
</style>
