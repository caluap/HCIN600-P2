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
    path: '/some-last-thoughts',
    name: 'LastThoughts',
    component: () =>
      import(
        /* webpackChunkName: "LastThoughts" */ '../views/LastThoughts.vue'
      ),
  },
  {
    path: '/thank-you',
    name: 'TheTestIsOver', // nooooooow
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
