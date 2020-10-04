import Vue from "vue";
import Vuex from "vuex";
import { db } from "../db";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    offlineMode: false,
    ready: false,
    collectedData: {},
  },
  getters: {},
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
  },
  actions: {
    init(context) {
      if (!context.state.offlineMode) {
        firebase
          .auth()
          .signInAnonymously()
          .then(
            (user) => {
              context.commit("setUserId", user.user.uid);
              console.log(`Hello, ${context.state.userId}.`);
              let docRef = db.collection("test_data").doc(context.state.userId);
              docRef.get().then((doc) => {
                if (doc.exists) {
                  console.log(doc.data());
                } else {
                  console.log(`doesn't exist!`);
                }
              });

              // general_data: {
              //   animated_smccs_test: !Math.round(Math.random()),
              //   start_time: new Date(),
              //   end_time: null,
              //   answers_count: 0,
              //   effectively_finished: false,
              //   open_ended_answer: "",
              //   about_the_participant: {
              //     age_group: null,
              //     education: null,
              //     gender: null,
              //   },
              // },
              // anwers: [],
            },
            (err) => {
              console.log(err);
            }
          );
      }
    },
  },
  modules: {},
});
