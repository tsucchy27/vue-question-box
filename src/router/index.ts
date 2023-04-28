import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/LoginView.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () =>
      import("../views/MyPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import("../views/RegisterView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/messages",
    name: "messages",
    component: () =>
      import("../views/MessageView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/messages/detail",
    name: "messageDetail",
    component: () =>
      import("../views/MessageDetailView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import("../components/QuestionCard.vue"),
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// ログインしてなかったらログイン画面に飛ばす
router.beforeEach((to) => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('userId='))
    ?.split('=')[1];
  if(to.meta.requiresAuth && cookieValue == null) {
    console.log("[router]please login.");
    return {name: "login"}
  }
});

export default router;
