import Vue from "vue";
import Vuex from "vuex";
import { db } from "../db";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    collectedData: {},
    offlineMode: false,
    ready: false,
    docRef: null,
  },
  getters: {},
  mutations: {
    ...vuexfireMutations,
    setUserId(state, id) {
      state.userId = id;
    },
    setDocRef(state, docRef) {
      state.docRef = docRef;
    },
    isReady(state) {
      state.ready = true;
    },
    isntReady(state) {
      state.ready = false;
    },
  },
  actions: {
    init: firestoreAction((context) => {
      if (!context.state.offlineMode) {
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
                      context.commit("isReady");
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
                  context.commit("isReady");
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
      context.commit("isntReady");
      let dataCopy = { ...context.state.collectedData };
      dataCopy.answers.push(newAnswer);
      dataCopy.general_data.answers_count++;
      context.state.docRef.set(dataCopy).then(() => {
        context.commit("isReady");
      });
    },
    setupUserProfile(context, profile) {
      context.commit("isntReady");
      let dataCopy = { ...context.state.collectedData };
      dataCopy.general_data.about_the_participant = profile;
      context.state.docRef.set(dataCopy).then(() => {
        context.commit("isReady");
      });
    },
    setupOpenEndedAnswer(context, openEndedAnswer) {
      context.commit("isntReady");
      let dataCopy = { ...context.state.collectedData };
      dataCopy.general_data.open_ended_answer = openEndedAnswer;
      dataCopy.general_data.end_time = new Date();
      dataCopy.general_data.effectively_finished = true;
      context.state.docRef.set(dataCopy).then(() => {
        context.commit("isReady");
      });
    },
  },
  modules: {},
});
