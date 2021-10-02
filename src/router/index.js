import Vue from 'vue';
import VueRouter from 'vue-router';
import Intro from '../views/Intro.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Introduction',
    component: Intro,
  },
  {
    path: '/how-does-it-work',
    name: 'HowTheTestWorks',
    component: () =>
      import(
        /* webpackChunkName: "HowTheTestWorks" */ '../views/HowTheTestWorks.vue'
      ),
  },
  {
    path: '/fpic',
    name: 'FreeInformedConsentTerm',
    component: () =>
      import(
        /* webpackChunkName: "FreeInformedConsentTerm" */ '../views/FreeInformedConsentTerm.vue'
      ),
  },
  {
    path: '/about-you',
    name: 'ParticipantProfile',
    component: () =>
      import(
        /* webpackChunkName: "ParticipantProfile" */ '../views/ParticipantProfile.vue'
      ),
  },
  {
    path: '/questions',
    name: 'TestPerSe',
    component: () =>
      import(/* webpackChunkName: "TestPerSe" */ '../views/TestPerSe.vue'),
  },
  {
    path: '/uma-ultima-palavra',
    name: 'LastThoughts',
    component: () =>
      import(
        /* webpackChunkName: "LastThoughts" */ '../views/LastThoughts.vue'
      ),
  },
  {
    path: '/obrigado',
    name: 'TheTestIsOver',
    component: () =>
      import(
        /* webpackChunkName: "TheTestIsOver" */ '../views/TheTestIsOver.vue'
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
