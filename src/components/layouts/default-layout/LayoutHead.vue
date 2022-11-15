<script lang="ts" setup="">
const props = withDefaults(defineProps<{
  userInfo: UserInfo
}>(), {
  userInfo: {} as any
})
</script>

<template>
  <div class="layout-head h-full flex items-center justify-between w-full">
    <img src="@/assets/imgs/element-plus-logo.svg" class="h-2/3 pl-4" alt="">
    <div class="right-info mr-2 h-full">
      <div class="user-info h-full hover:bg-gray-800 px-2">
        <el-dropdown class=" h-full">
          <template #default>
            <div class="flex items-center text-white">
              <el-avatar size="small" :src="props.userInfo.headUrl"></el-avatar>
              <span class="text-sm ml-1">{{props.userInfo.realName}}</span>
            </div>
          </template>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
