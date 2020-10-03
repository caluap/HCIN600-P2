import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import firebase from "firebase";

Vue.mixin({
  data() {
    return {
      userId: null,
    };
  },
  created() {
    firebase
      .auth()
      .signInAnonymously()
      .then(
        (user) => {
          console.log();
          this.userId = user.user.uid;
          console.log("Hello, " + this.userId);
        },
        (err) => {
          console.log(err);
        }
      );
  },
});

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
