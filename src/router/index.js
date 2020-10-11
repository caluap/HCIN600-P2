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
  {
    path: "/o-teste-em-si",
    name: "TestPerSe",
    component: () =>
      import(/* webpackChunkName: "TestPerSe" */ "../views/TestPerSe.vue"),
  },
  {
    path: "/uma-ultima-palavra",
    name: "LastThoughts",
    component: () =>
      import(/* webpackChunkName: "LastThoughts" */ "../views/LastThoughts.vue"),
  },
  {
    path: "/obrigado",
    name: "TheTestIsOver",
    component: () =>
      import(/* webpackChunkName: "TheTestIsOver" */ "../views/TheTestIsOver.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
