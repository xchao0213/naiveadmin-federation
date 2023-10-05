import { createRouter, createWebHistory } from 'vue-router';

import listIndex from 'list/listIndex'

export const LoginRoute = {
  path: '/main',
  name: 'Main',
  component: listIndex,
  meta: {
    title: '登录',
  },
};


export const constantRouter = [LoginRoute];


const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
