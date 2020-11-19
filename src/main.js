import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueYouTubeEmbed from "vue-youtube-embed";
import VueScrollTo from "vue-scrollto";

import "@/assets/css/main.scss";

Vue.use(VueYouTubeEmbed);
Vue.use(VueScrollTo);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    store.dispatch("init", this.$route.query);
  },
  render: (h) => h(App),
}).$mount("#app");
