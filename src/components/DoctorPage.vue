<script setup>
import {useRoute, useRouter, onBeforeRouteUpdate} from 'vue-router';
import {ref} from 'vue';
import {onMounted, defineEmits} from "vue";

const router = useRouter();
const collapsed = ref(false);
const selectedKeys = ref([]);

onMounted(() => {
  const route = useRoute().meta.name
  selectedKeys.value = [route]
})

onBeforeRouteUpdate((to, from, next) => {
  const route = to.meta.name
  selectedKeys.value = [route]
  next()
})

defineEmits(['open-settings'])

function doctorLinkJump(url) {
  router.push({path: '/doctor/' + url});
}

import {
  HomeOutlined,
  ScheduleOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";

</script>
<template>
  <a-layout has-sider style="min-height: 100vh">
    <a-layout-sider
        collapsible
        collapsedWidth="60"
        breakpoint="lg"
        v-model:collapsed="collapsed"
    >
    </a-layout-sider>
    <a-layout-sider
        collapsible
        collapsedWidth="60"
        breakpoint="lg"
        v-model:collapsed="collapsed"
        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }"
    >
      <div>
        <a-typography-title :level="4" style="color: #f0f0f0;text-align:center;margin-top: 1rem">
          {{ collapsed ? '系统' : '癫痫患者管理系统' }}
        </a-typography-title>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" triggerSubMenuAction="click">
          <a-menu-item key="station" @click="doctorLinkJump('')">
            <HomeOutlined/>
            <span class="nav-text">工作主页</span>
          </a-menu-item>
          <a-menu-item key="medical" @click="doctorLinkJump('medical')">
            <MessageOutlined/>
            <span class="nav-text">线上问诊</span>
          </a-menu-item>
          <a-sub-menu key="sub2">
            <template #title>
            <span>
              <ScheduleOutlined/>
              <span>循证系统</span>
            </span>
            </template>
            <a-menu-item key="evidence" @click="doctorLinkJump('evidence')">自动循证</a-menu-item>
            <a-menu-item key="data" @click="doctorLinkJump('data')">数据查阅</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <a-menu :selectable="false" theme="dark" mode="inline" style="margin-bottom: 16px">
        <a-menu-item key="setting" @click="$emit('open-settings')">
          <SettingOutlined/>
          <span class="nav-text">系统设置</span>
        </a-menu-item>
        <a-menu-item key="logout" @click="router.push({path: '/'})">
          <LogoutOutlined/>
          <span class="nav-text">退出系统</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ position: 'relative'}">
      <a-layout-header :style="{ padding: 0, position: 'fixed', left: 0, top: 0, bottom: 0, width: '100%', zIndex: 50 }"/>
      <a-layout-header :style="{ padding: 0 }"/>
      <a-layout-content :style="{ margin: '32px', overflow: 'initial' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style>
.ant-layout-sider-children {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>