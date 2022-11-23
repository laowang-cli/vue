import { defineStore } from "pinia"
import { RouteLocationNormalized } from "vue-router"

export const useTabsStore = defineStore<"tabs", {
  tabs: NavTab[],
  currentActiveIndex: number
}, any, {
  activationNewRoute:(route: RouteLocationNormalized) => void
    }>("tabs", {
      state() {
        return {
          tabs: [],
          currentActiveIndex: 0
        }
      },
      actions: {
        activationNewRoute(route: RouteLocationNormalized) {
          const { isTab, uniqueTab, label, keepAlive } = route.meta
          const tabLabel = (label || route.name) as string
          if (!isTab) {
            this.currentActiveIndex = -1
            return
          }
          // 判断是否存在打开的tab
          const currentIndex = uniqueTab
            ? this.tabs.findIndex(tab => tab.path === route.fullPath)
            : this.tabs.findIndex(tab => tab.label === tabLabel)
          // 有存在的tab
          if (currentIndex !== -1) {
            this.currentActiveIndex = currentIndex
          } else {
            this.tabs.push({
              label: tabLabel,
              path: route.fullPath,
              keepAlive: !!keepAlive
            })
            this.currentActiveIndex = this.tabs.length - 1
          }
        }
      }
    })
