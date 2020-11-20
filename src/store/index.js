import Vue from "vue";
import Vuex from "vuex";
import { db } from "../db";
import { vuexfireMutations, firestoreAction } from "vuexfire";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(Vuex);

// https://stackoverflow.com/a/2450976/
function shuffledDataOrder() {
  let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default new Vuex.Store({
  state: {
    userId: null,
    collection: "eval_data_2",
    collectedData: null,
    offlineMode: false,
    debugMode: 0,
    ready: false,
    fetches: 0,
    currentStep: 0,
    docRef: null,
  },
  getters: {
    getDataIndex: (state, getters) => {
      return state.collectedData.general_data.data_indexes[
        getters.getAnswerCount
      ];
    },
    getAnimTest: (state) => {
      if (state.collectedData !== null) {
        return state.collectedData.general_data.animated_smccs_test;
      }
      return null;
    },
    getAboutTheParticipant: (state) => {
      if (state.collectedData !== null) {
        return state.collectedData.general_data.about_the_participant;
      }
      return null;
    },
    getAnswerCount: (state) => {
      if (state.collectedData) {
        return state.collectedData.answers.length;
      }
      return null;
    },
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
    setDebug(state, mode) {
      state.debugMode = mode;
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
    init: firestoreAction((context, query = {}) => {
      let animationMode = !Math.round(Math.random()),
        dataIndexes = shuffledDataOrder();
      if (query != {}) {
        if ("debug" in query) {
          context.commit("setDebug", parseInt(query.debug));
          console.log(`Debug mode manually set to ${query.debug}.`);
          if (query.debug > 0) {
            context.state.collection = "debug_data";
          }
        }
        if ("animation_mode" in query) {
          animationMode = !!parseInt(query.animation_mode);
          console.log(`Manually set animated_smccs_test as ${animationMode}.`);
        }
      }
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
                db
                  .collection(context.state.collection)
                  .doc(context.state.userId)
              );
              context.state.docRef.get().then((doc) => {
                if (!doc.exists) {
                  // new user!
                  console.log("New general_data created.");
                  let emptyCollectedData = {
                    general_data: {
                      animated_smccs_test: animationMode,
                      data_indexes: dataIndexes,
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
                        db
                          .collection(context.state.collection)
                          .doc(context.state.userId)
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
          totalDuration / dataCopy.general_data.answers_count,
        test_duration: totalDuration,
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
