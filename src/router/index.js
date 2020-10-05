import Vue from "vue";
import VueRouter from "vue-router";
import Intro from "../views/Intro.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Introduction",
    component: Intro,
  },
  {
    path: "/como-funciona-o-teste",
    name: "HowTheTestWorks",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "HowTheTestWorks" */ "../views/HowTheTestWorks.vue"
      ),
  },
  {
    path: "/tcle",
    name: "FreeInformedConsentTerm",
    component: () =>
      import(
        /* webpackChunkName: "FreeInformedConsentTerm" */ "../views/FreeInformedConsentTerm.vue"
      ),
  },
  {
    path: "/um-pouco-sobre-voce",
    name: "ParticipantProfile",
    component: () =>
      import(
        /* webpackChunkName: "ParticipantProfile" */ "../views/ParticipantProfile.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
