import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo-app',
    name: 'DemoApp',
    component: () => import(/* webpackChunkName: "demoapp" */ '../views/DemoApp.vue')
  },
  {
    path: '/demo-app/:id/edit',
    name: 'EditTodo',
    component: () => import(/* webpackChunkName: "demoappedittodo" */ '../views/DemoAppEditTodo.vue'),
    props: true
  },
  {
    path: '/documentation',
    name: 'DocumentationIndex',
    component: () => import(/* webpackChunkName: "index" */ '../views/documentation/Index.vue'),
    children: [
      {
        path: 'introduction',
        name: 'Introduction',
        component: () => import(/* webpackChunkName: "introduction" */ '../views/documentation/Introduction.vue')
      },
      {
        path: 'set-up',
        name: 'SetUp',
        component: () => import(/* webpackChunkName: "setup" */ '../views/documentation/SetUp.vue')
      },
      {
        path: 'structure',
        name: 'Structure',
        component: () => import(/* webpackChunkName: "structure" */ '../views/documentation/Structure.vue')
      },
      {
        path: 'resources',
        name: 'Resources',
        component: () => import(/* webpackChunkName: "resources" */ '../views/documentation/Resources.vue')
      },
      {
        path: 'examples',
        name: 'ExamplesIndex',
        component: () => import(/* webpackChunkName: "index" */ '../views/documentation/examples/Index.vue'),
        children: [
          {
            path: ':example',
            name: 'Example',
            component: () => import(/* webpackChunkName: "example" */ '../views/documentation/examples/Example.vue'),
            props: true
          },
          // default
          {
            path: '',
            name: 'examplesIndex',
            component: () => import(/* webpackChunkName: "examplesIndex" */ '../components/documentation/ExamplesIndex.vue')
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
