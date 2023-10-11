import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './guards';
// import type { IModuleType } from './types';
// import { Layout } from '@/router/constant';
// import {__federation_method_setRemote, __federation_method_getRemote, __federation_method_unwrapDefault} from 'virtual:__federation__'

// import { listView } from 'list/listView';
import routes from 'list/routerIndex';
// __federation_method_setRemote('list', { url:() => Promise.resolve('http://localhost:5001/assets/remoteEntry.js'), format: 'esm', from: 'vite' });
// const listRouter = await __federation_method_getRemote('list', `./router`)
console.log('listRouter', routes);

// const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });

// const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list, key) => {
//   const mod = modules[key].default ?? {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   return [...list, ...modList];
// }, []);

const routeModuleList: RouteRecordRaw[] = [...routes];

function sortRoute(a, b) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
}

routeModuleList.sort(sortRoute);

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [LoginRoute, RootRoute, RedirectRoute];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;