<script lang="ts" setup>
import LayoutMenu from "@/components/layouts/default-layout/LayoutMenu.vue"
import LayoutTabs from "@/components/layouts/default-layout/LayoutTabs.vue"
import { nextTick, onBeforeMount, onMounted, onUpdated, ref } from "vue"
import { requests } from "@/utils/common/requests/requests"
import { useRouter } from "vue-router"
import LayoutHead from "@/components/layouts/default-layout/LayoutHead.vue"

const router = useRouter()

// @ts-ignore
const menuItems = ref<MenuItem[]>(window.routes || [])
const userInfo = ref<UserInfo>()

const initialize = ref(false)
const generateDynamicRoutes = (list: MenuItem[]) => {
  list.forEach(item => {
    if (item.children && item.children.length) {
      generateDynamicRoutes(item.children)
    } else {
      router.addRoute({
        name: item.name,
        path: item.url,
        meta: {
          isTab: true
        },
        component: () => import(`@/views/dynamic${item.url}`)
      })
    }
  })
}
const getUserInfo = () => {
  requests.get<Ret<UserInfo>>("/renren-admin/sys/user/info").then(ret => {
    userInfo.value = ret.data
  })
}
const getMenuInfo = async () => {
  const ret = await requests.get<Ret<MenuItem[]>>("/renren-admin/sys/menu/nav", {
    serviceId: "uas"
  })
  menuItems.value = ret.data
  // @ts-ignore
  window.routes = ret.data
  generateDynamicRoutes(ret.data)
  initialize.value = true
}

router.beforeResolve((to, from, next) => {
  if (!initialize.value) {
    getMenuInfo().then(() => {
      next({ ...to, replace: true })
    })
  } else {
    next()
  }
})

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="head h-12 bg-gray-900 text-white flex items-center fixed w-full">
    <LayoutHead :userInfo="userInfo"/>
  </div>
  <div class="min-h-screen flex pt-12">
    <div class="sticky top-12 h-[calc(100vh-48px)]">
      <LayoutMenu :menuItems="menuItems"/>
    </div>
    <div class="flex-1 bg-[rgb(240,242,245)]">
      <div class="">
        <LayoutTabs/>
      </div>
      <div class="main p-1 mt-1 bg-white">
        <div class="router-view">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>
