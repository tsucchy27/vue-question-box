import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/LoginView.vue")
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () =>
      import("../views/MyPage.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import("../views/RegisterView.vue")
  },
  {
    path: "/messages",
    name: "messages",
    component: () =>
      import("../views/MessageView.vue")
  },
  {
    path: "/messages/detail",
    name: "messageDetail",
    component: () =>
      import("../views/MessageDetailView.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import("../components/QuestionCard.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
