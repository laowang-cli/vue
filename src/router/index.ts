import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "@/views/Home.vue"
import { registerHooks } from "./router-hooks"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      isTab: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

registerHooks(router)
export default router
