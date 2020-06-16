import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/settings",
    name: "settings",
    // lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/notifications",
    name: "notifications",
    component: () =>
      import(
        /* webpackChunkName: "notifications" */ "../views/Notifications.vue"
      )
  },
  {
    path: "/item-create",
    name: "itemCreate",
    component: () =>
      import(/* webpackChunkName: "createItem"*/ "../views/ItemCreate.vue")
  },
  {
    path: "/item-borrow",
    name: "itemBorrow",
    component: () => import(/* webpackChunkName: "borrowItem"*/ "../views/ItemBorrow.vue")
  },
  {
    path: "/itemdetail/:id",
    name: "itemDetail",
    component: () =>
      import(/* webpackChunkName: "itemDetail"*/ "../views/ItemDetail.vue")
  },
  {
    path: "/playground",
    name: "playground",
    component: () =>
      import(/* webpackChunkName: "playground" */ "../views/Playground.vue")
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue")
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
