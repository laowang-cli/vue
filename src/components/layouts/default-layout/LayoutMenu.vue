<template>
  <div class="layout-menu flex flex-col h-full">
    <el-menu
      :default-active="activeRoute"
      class="el-menu-vertical-demo flex-1"
      :collapse="isCollapse"
      router
    >
      <Menu :menuItems="props.menuItems"/>
    </el-menu>
    <div class="flex-shrink-0 border-t-2 flex items-center h-10 pl-2 cursor-pointer" @click="toggleExpand">
      <el-icon v-if="isCollapse">
        <Expand/>
      </el-icon>
      <el-icon v-else>
        <Fold/>
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Component, onMounted, ref, h, createTextVNode, nextTick } from "vue"
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Expand,
  Fold,
  HomeFilled
} from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
import { ElIcon, ElMenuItem, ElSubMenu } from "element-plus"

const router = useRouter()
const isCollapse = ref(false)

const props = defineProps<{
  menuItems: MenuItem[]
}>()

const toggleExpand = () => {
  isCollapse.value = !isCollapse.value
}

const activeRoute = ref<string>("/")

/**
 * 内部组件, 解析menu
 */
// h(item.icon ? ElIcon : "", null, h(item.icon!)),
const Menu: Component = {
  props: ["menuItems"],
  render: (props: { menuItems: MenuItem[] }) => {
    return props.menuItems.map(item => {
      if (item.children && item.children.length) {
        return h(ElSubMenu, {
          index: item.id!
        }, {
          title: () => {
            const ret = [] as any
            if (item.icon) {
              ret.push(h(ElIcon, null, {
                default: () => h("i", {
                  class: ["iconfont", item.icon]
                })
              }))
            }
            ret.push(h("span", null, createTextVNode(item.name)))
            return ret
          },
          default: () => item.children?.map(ch => {
            return h(ElMenuItem, { index: ch.url }, {
              default: () => ch.name
            })
          })
        })
      } else {
        return h("el-menu-item", { index: item.url }, () => {
          return h("span", item.name)
        })
      }
    })
  }
}

onMounted(() => {
  router.afterEach(to => {
    activeRoute.value = to.path
  })
})

</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}

:deep(.el-menu-item.is-active) {
  background-color: #e6f7ff;
  border-right: 3px solid blueviolet;
}
</style>
