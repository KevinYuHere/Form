<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {theme} from 'ant-design-vue';
import {onMounted, ref} from 'vue';

// eslint-disable-next-line no-unused-vars
const {darkAlgorithm, compactAlgorithm, defaultAlgorithm} = theme;

const open = ref(false);
const settings = ref({
  compact: 'false',
  dark: 'false',
});
const themeApply = ref({
  algorithm: [defaultAlgorithm],
});

function applySettings() {
  localStorage.setItem('Settings', JSON.stringify(settings.value));
  let settingsList = settings.value;
  if(settingsList.compact === 'true' && settingsList.dark === 'true') {
    themeApply.value.algorithm = [darkAlgorithm, compactAlgorithm];
  } else if(settingsList.compact === 'true') {
    themeApply.value.algorithm = [compactAlgorithm];
  } else if(settingsList.dark === 'true') {
    themeApply.value.algorithm = [darkAlgorithm];
  } else {
    themeApply.value.algorithm = [defaultAlgorithm];
  }
}

onMounted(() => {
  const settingsData = JSON.parse(localStorage.getItem('Settings'));
  if (settingsData) {
    settings.value = settingsData;
  } else {
    localStorage.setItem('Settings', JSON.stringify(settings.value));
  }
  applySettings();
});
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="themeApply">
    <a-app>
      <a-modal v-model:open="open" title="系统设置" centered>
        <template #footer>
          <a-button type="primary" @click="open = false;applySettings()">完成</a-button>
        </template>
        <a-form layout="inline">
          <a-form-item label="页面布局">
            <a-radio-group v-model:value="settings.compact" :onchange="applySettings">
              <a-radio-button value="false">默认</a-radio-button>
              <a-radio-button value="true">紧凑</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="页面配色">
            <a-radio-group v-model:value="settings.dark" :onchange="applySettings">
              <a-radio-button value="false">亮色</a-radio-button>
              <a-radio-button value="true">暗黑</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-modal>
      <RouterView @open-settings="open = true"></RouterView>
    </a-app>
  </a-config-provider>
</template>
<style>

</style>

