<template>
  <div>
    <LongText>
      <h1>Tell us a bit about yourself</h1>
      <div id="questionnaire">
        <label for="occupation">What is your occupation? </label>
        <input name="occupation" v-model="occupation" />
        <label for="field-of-study"
          >What is your field of study?
          <span class="hint"
            >Include eventual subfields. For instance, if you work with
            Artificial Intelligence, you could write “Computer science,
            Artificial intelligence”.</span
          ></label
        >
        <input name="field-of-study" v-model="fieldOfStudy" />
        <hr />
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
        <hr />
        <label for="how-important"
          >Do you agree that climate change is an important issue?</label
        >
        <div class="likert-grid">
          <label for="hi-1">
            <input
              type="radio"
              id="hi-1"
              value="1"
              v-model="anImportantIssue"
            />
            Strongly disagree</label
          >
          <label for="hi-2">
            <input
              type="radio"
              id="hi-2"
              value="2"
              v-model="anImportantIssue"
            />
            Disagree</label
          >
          <label for="hi-3">
            <input
              type="radio"
              id="hi-3"
              value="3"
              v-model="anImportantIssue"
            />
            Neutral</label
          >
          <label for="hi-4">
            <input
              type="radio"
              id="hi-4"
              value="4"
              v-model="anImportantIssue"
            />
            Agree</label
          >
          <label for="hi-5">
            <input
              type="radio"
              id="hi-5"
              value="5"
              v-model="anImportantIssue"
            />
            Strongly agree</label
          >
        </div>

        <label for="how-worried"
          >Do you agree that climate change will have negative effects on future
          generations?</label
        >
        <div class="likert-grid">
          <label for="hw-1">
            <input
              type="radio"
              id="hw-1"
              value="1"
              v-model="effectsOnFutureGenerations"
            />
            Strongly disagree</label
          >
          <label for="hw-2">
            <input
              type="radio"
              id="hw-2"
              value="2"
              v-model="effectsOnFutureGenerations"
            />
            Disagree</label
          >
          <label for="hw-3">
            <input
              type="radio"
              id="hw-3"
              value="3"
              v-model="effectsOnFutureGenerations"
            />
            Neutral</label
          >
          <label for="hw-4">
            <input
              type="radio"
              id="hw-4"
              value="4"
              v-model="effectsOnFutureGenerations"
            />
            Agree</label
          >
          <label for="hw-5">
            <input
              type="radio"
              id="hw-5"
              value="5"
              v-model="effectsOnFutureGenerations"
            />
            Strongly agree</label
          >
        </div>
        <label for="what-is-the-main-cause"
          >What do you think is the main cause of climate change?</label
        >

        <div class="radio-grid">
          <label for="main-causes-1">
            <input
              type="radio"
              id="main-causes-1"
              value="1"
              v-model="mainCause"
            />
            Greenhouse gas emissions from coal-fired power plants
          </label>
          <label for="main-causes-2">
            <input
              type="radio"
              id="main-causes-2"
              value="2"
              v-model="mainCause"
            />
            Greenhouse gas emissions from transportation and automobiles
          </label>
          <label for="main-causes-3">
            <input
              type="radio"
              id="main-causes-3"
              value="3"
              v-model="mainCause"
            />
            Felling of trees in primary forests to release greenhouse gases
            stored in forests
          </label>
          <label for="main-causes-4">
            <input
              type="radio"
              id="main-causes-4"
              value="4"
              v-model="mainCause"
            />
            Normal human activities, such as household energy use, meat
            consumption, etc.
          </label>
          <label for="main-causes-5">
            <input
              type="radio"
              id="main-causes-5"
              value="5"
              v-model="mainCause"
            />
            This is a natural phenomenon that happens naturally
          </label>
          <label for="main-causes-6">
            <input
              type="radio"
              id="main-causes-6"
              value="6"
              v-model="mainCause"
            />
            Other causes not listed</label
          >
        </div>
        <label for="mitigation-strategy"
          >What do you think is the best mitigation strategy to reduce the
          effects of climate change?
        </label>
        <textarea v-model="suggestedMitigationStrategies" />
      </div>
    </LongText>
    <PageNav
      :disabled-button="!canContinue"
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
      fieldOfStudy: '',
      occupation: '',
      anImportantIssue: null,
      effectsOnFutureGenerations: null,
      mainCause: null,
      suggestedMitigationStrategies: '',
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
        field_of_study: this.fieldOfStudy,
        ocupation: this.occupation,
        is_it_an_important_issue: this.anImportantIssue,
        will_it_affect_future_generations: this.effectsOnFutureGenerations,
        what_is_it_main_cause: this.mainCause,
        suggested_strategies: this.suggestedMitigationStrategies,
      });
    },
  },
  computed: {
    ...mapState(['collectedData']),
    ...mapGetters(['getAboutTheParticipant']),
    canContinue: function() {
      return (
        this.selectedAgeGroup != '' &&
        this.selectedEducation != '' &&
        this.selectedGender != '' &&
        this.anImportantIssue != null &&
        this.effectsOnFutureGenerations != null &&
        this.mainCause != null
      );
    },
  },
  created() {
    this.incStep(1);
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
          if (newValue.field_of_study != null)
            this.fieldOfStudy = newValue.field_of_study;
          if (newValue.is_it_an_important_issue != null)
            this.anImportantIssue = newValue.is_it_an_important_issue;
          if (newValue.will_it_affect_future_generations != null)
            this.effectsOnFutureGenerations =
              newValue.will_it_affect_future_generations;
          if (newValue.what_is_it_main_cause != null)
            this.mainCause = newValue.what_is_it_main_cause;
          if (newValue.suggested_strategies != null)
            this.suggestedMitigationStrategies = newValue.suggested_strategies;
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
      if (this.getAboutTheParticipant.field_of_study != null)
        this.fieldOfStudy = this.getAboutTheParticipant.field_of_study;
      if (this.getAboutTheParticipant.occupation != null)
        this.occupation = this.getAboutTheParticipant.occupation;
      if (this.getAboutTheParticipant.is_it_an_important_issue != null)
        this.anImportantIssue = this.getAboutTheParticipant.is_it_an_important_issue;
      if (this.getAboutTheParticipant.will_it_affect_future_generations != null)
        this.effectsOnFutureGenerations = this.getAboutTheParticipant.will_it_affect_future_generations;
      if (this.getAboutTheParticipant.what_is_it_main_cause != null)
        this.mainCause = this.getAboutTheParticipant.what_is_it_main_cause;
      if (this.getAboutTheParticipant.suggested_strategies != null)
        this.suggestedMitigationStrategies = this.getAboutTheParticipant.suggested_strategies;
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
@import '@/assets/css/_media_queries.scss';

#questionnaire {
  margin-top: 2rem;
}

.hint {
  display: block;
  @include fs(-1);
}

.generic-field {
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
}

.radio-grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  label {
    display: grid;
    align-items: center;
    grid-template-columns: 3rem auto;
    cursor: pointer;
  }
  input {
    margin: 0;
  }
  margin: 1rem 0 4rem;
}

.likert-grid {
  @extend .radio-grid;
  @include respond-above(sm) {
    grid-template-columns: repeat(5, 1fr);
    text-align: center;
    input {
      margin: 0.5rem 0;
    }
    label {
      grid-template-columns: 1fr;
      grid-template-rows: 2rem auto;
      align-items: flex-start;
    }
  }
}

textarea {
  @extend .generic-field;
  width: 100%;
  font-size: 16px;
  border: none;
  box-sizing: border-box;
  margin: 2rem 0 1rem;
  padding: 1rem;
  min-height: 12rem;
}

label {
  display: block;
  input + &,
  select + & {
    margin-top: 3rem;
  }
}

input {
  @extend .generic-field;
}

select {
  @extend .generic-field;

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
