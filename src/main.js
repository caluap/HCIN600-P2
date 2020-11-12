import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import store from "./store";
import VueYouTubeEmbed from "vue-youtube-embed";
import VueScrollTo from "vue-scrollto";

import "@/assets/css/main.scss";

Vue.use(firestorePlugin);
Vue.use(VueYouTubeEmbed);
Vue.use(VueScrollTo);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    let debug = "debug" in this.$route.query;
    if (debug) {
      console.log("debug mode");
    }
    store.dispatch("init", debug);
  },
  render: (h) => h(App),
}).$mount("#app");
