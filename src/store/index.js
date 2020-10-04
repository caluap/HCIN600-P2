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
  },
  getters: {},
  mutations: {
    ...vuexfireMutations,
    setUserId(state, id) {
      state.userId = id;
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
              let docRef = db.collection("test_data").doc(context.state.userId);
              docRef.get().then((doc) => {
                if (!doc.exists) {
                  // new user!
                  console.log(
                    `Hello, ${context.state.userId}! I see this is your first time here... make yourself at home.`
                  );
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
                    anwers: [],
                  };
                  docRef
                    .set(emptyCollectedData)
                    .then(function() {
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
                  return context.bindFirestoreRef("collectedData", docRef);
                }
              });
            },
            (err) => {
              console.error(err);
            }
          );
      }
    }),
  },
  modules: {},
});
