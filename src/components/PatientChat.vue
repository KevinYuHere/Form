<script setup>
import {h, ref} from 'vue';
import {
  SendOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";

const textValue = ref('');
const chatContent = ref([
  {
    author: '智能导诊系统',
    content: '您好，请问有什么能帮您的吗？',
  }
]);

const chatSubmit = () => {
  if (!textValue.value) {
    return;
  }
  setTimeout(() => {
    chatContent.value = [
      ...chatContent.value,
      {
        author: '您',
        content: textValue.value,
      },
    ];
    textValue.value = '';
  }, 1000);
};
</script>
<template>
  <a-breadcrumb style="margin-bottom: 16px">
    <a-breadcrumb-item>首页</a-breadcrumb-item>
    <a-breadcrumb-item>对话主页</a-breadcrumb-item>
  </a-breadcrumb>
  <a-typography-title :level="2">智能导诊系统</a-typography-title>
  <a-typography-paragraph>
    <a-card style="max-width: 100%" :bodyStyle="{ position: 'relative' }">
      <template #actions>
        <div style="width: 100%; display: flex; justify-content: space-between; padding: 0 24px 0 20px">
          <a-textarea
              v-model:value="textValue"
              placeholder="请输入对话"
              :auto-size="{ minRows: 1, maxRows: 5 }"
          >
          </a-textarea>
          <a-button @click="chatSubmit" type="primary" :icon="h(SendOutlined)" style="margin-left: 12px"/>
        </div>
      </template>
      <a-list
          v-if="chatContent.length"
          :data-source="chatContent"
          item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment
                style="white-space: pre-line;"
                :author="item.author"
                :content="item.content"
            >
              <template #avatar>
                <a-avatar v-if="item.author === '您'" style="background-color: #52c41a">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
                <a-avatar v-if="item.author !== '您'" style="background-color: #1890ff">
                  <template #icon><CommentOutlined /></template>
                </a-avatar>
              </template>
            </a-comment>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </a-typography-paragraph>
</template>
<style>
</style>