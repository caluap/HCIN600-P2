import Vue from "vue";
import Vuex from "vuex";
import { db } from "../db";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    collectedData: null,
    offlineMode: false,
    ready: false,
    fetches: 0,
    currentStep: 0,
    docRef: null,
  },
  getters: {
    getAboutTheParticipant: (state) => {
      if (state.collectedData !== null) {
        return state.collectedData.general_data.about_the_participant;
      }
      return null;
    }
  },
  mutations: {
    ...vuexfireMutations,
    setUserId(state, id) {
      state.userId = id;
    },
    setDocRef(state, docRef) {
      state.docRef = docRef;
    },
    endedFetch(state) {
      state.fetches--;
      if (state.fetches == 0) {
        state.ready = true;
      }
    },
    startedFetch(state) {
      state.fetches++;
      state.ready = false;
    },
    incStep(state, step = null) {
      if (step !== null) {
        state.currentStep = step;
      } else {
        state.currentStep++;
      }
    },
  },
  actions: {
    init: firestoreAction((context) => {
      if (!context.state.offlineMode) {
        context.commit("startedFetch");
        firebase
          .auth()
          .signInAnonymously()
          .then(
            (user) => {
              context.commit("setUserId", user.user.uid);
              context.commit(
                "setDocRef",
                db.collection("test_data").doc(context.state.userId)
              );
              context.state.docRef.get().then((doc) => {
                if (!doc.exists) {
                  // new user!
                  console.log("New general_data created.")
                  let emptyCollectedData = {
                    general_data: {
                      animated_smccs_test: !Math.round(Math.random()),
                      start_time: new Date(),
                      end_time: null,
                      answers_count: 0,
                      effectively_finished: false,
                      open_ended_answer: "",
                      about_the_participant: {
                        age_group: null,
                        education: null,
                        gender: null,
                      },
                    },
                    answers: [],
                  };
                  context.state.docRef
                    .set(emptyCollectedData)
                    .then(function() {
                      console.log(
                        `Hello, ${context.state.userId}. I see this is your first time here... make yourself at home!`
                      );
                      context.commit("endedFetch");
                      return context.bindFirestoreRef(
                        "collectedData",
                        db.collection("test_data").doc(context.state.userId)
                      );
                    })
                    .catch(function(err) {
                      console.error(err);
                    });
                } else {
                  console.log(`Welcome back, ${context.state.userId}!`);
                  context.commit("endedFetch");
                  return context.bindFirestoreRef(
                    "collectedData",
                    context.state.docRef
                  );
                }
              });
            },
            (err) => {
              console.error(err);
            }
          );
      }
    }),
    pushAnswer(context, newAnswer) {
      context.commit("startedFetch");
      let dataCopy = { ...context.state.collectedData };
      dataCopy.answers.push(newAnswer);
      dataCopy.general_data.answers_count++;
      // always has the last available end time
      dataCopy.general_data.end_time = newAnswer.end_time;
      context.state.docRef.set(dataCopy).then(() => {
        context.commit("endedFetch");
      });
    },
    setupUserProfile(context, profile) {
      context.commit("startedFetch");
      let dataCopy = { ...context.state.collectedData };
      dataCopy.general_data.about_the_participant = profile;
      context.state.docRef.set(dataCopy).then(() => {
        context.commit("endedFetch");
      });
    },
    closeTest(context, openEndedAnswer) {
      context.commit("startedFetch");
      let dataCopy = { ...context.state.collectedData };
      dataCopy.general_data.open_ended_answer = openEndedAnswer;
      dataCopy.general_data.end_time = new Date();
      dataCopy.general_data.effectively_finished = true;

      // calculate some simple statistics
      let totalDuration = 0,
        correctAnswers = 0;
      dataCopy.answers.forEach((answer) => {
        totalDuration += answer.end_time - answer.start_time;
        if (answer.chose_the_right_choice) {
          correctAnswers++;
        }
      });

      dataCopy.statistics = {
        average_answer_duration:
          totalDuration / dataCopy.general_data.answers_count / 1000,
        percentage_of_correct_answers:
          correctAnswers / dataCopy.general_data.answers_count,
      };

      context.state.docRef.set(dataCopy).then(() => {
        context.commit("endedFetch");
      });
    },
  },
  modules: {},
});
