<template>
  <div class="sticky top-12 h-8 bg-white tab" v-show="tabsStore.tabs.length">
    <div class="tabs flex items-center h-full">
      <div class="tab-item"
           v-for="(i, index) in tabsStore.tabs"
           :class="{'tab-item-active': index === tabsStore.currentActiveIndex }"
           :key="i.path"
           @click="handleTabClick(i)">
        <span class="label mr-1">{{i.label}}</span>
        <el-icon @click.stop="handleTabClose(i)" class="rounded-full hover:bg-red-500 hover:text-white"><Close /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue"
import { useTabsStore } from "@/store/tabs"
import { useRouter } from "vue-router"

const router = useRouter()
const tabsStore = useTabsStore()

const handleTabClick = (tab) => {
  router.push(tab.path)
}

const handleTabClose = (tab) => {
  const tabs = tabsStore.tabs
  const currentIndex = tabs.indexOf(tab)
  const currentRouteIsTab = tabsStore.currentActiveIndex >= 0
  // [][][*][]
  // 1.移除
  tabsStore.tabs.splice(currentIndex, 1)
  if (!tabs.length && currentRouteIsTab) {
    return router.push("/")
  }
  let newActiveTab: Nullable<NavTab>
  if (tabs[currentIndex]) {
    newActiveTab = tabs[currentIndex]
  } else {
    newActiveTab = tabs[currentIndex - 1]
    console.log(tabsStore.currentActiveIndex)
    currentRouteIsTab && (tabsStore.currentActiveIndex = currentIndex - 1)
  }
  currentRouteIsTab && router.push(newActiveTab.path)
}

</script>

<style lang="scss" scoped>
.tabs {
  padding: 0 8px;
}
.tab-item {
  border-radius: 2px;
  border: 1px solid red;
  height: 80%;
  padding: 0 6px;
  font-size: 13px;
  @apply flex items-center cursor-pointer font-bold hover:text-blue-500;
  &-active {
    @apply bg-blue-500 text-white;
    &:hover{
      @apply bg-blue-500 text-white;
    }
  }
  &:not(:last-child) {
    @apply mr-1;
  }
}
.tab {
  box-shadow: 0 1px  rgba(100, 100, 100, 0.3);
}
</style>
