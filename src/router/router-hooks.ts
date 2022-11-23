import { Router } from "vue-router"
import { useTabsStore } from "@/store/tabs"

export const registerHooks = (router: Router) => {
  router.afterEach((to, from) => {
    const tabsStore = useTabsStore()
    tabsStore.activationNewRoute(to)
  })
}
