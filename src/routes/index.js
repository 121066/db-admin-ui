import { createRouter, createWebHashHistory } from "vue-router";
const rot = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/button",
    name: "button",
    component: () => import("@/pages/button/index.vue"),
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: rot,
});
router.beforeEach(async (to, from, next) => {
  console.log(to, "去哪里");
  next();
});
