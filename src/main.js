import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import store from "./store";

import "@/assets/css/main.scss";

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    store.dispatch("init");
  },
  render: (h) => h(App),
}).$mount("#app");
