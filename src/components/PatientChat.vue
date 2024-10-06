<script setup>
import {h, ref} from 'vue';
import {
  SendOutlined,
  UserOutlined,
  CommentOutlined, DeleteOutlined,
} from "@ant-design/icons-vue";
import {BaseURL} from "@/components/Interceptor.js";
import {ClearPatientChat} from "@/components/API.js";

const textValue = ref('');
const chatContent = ref([
  {
    author: '智能导诊系统',
    content: '您好，请问有什么能帮您的吗？',
  }
]);
const submitAbled = ref(true);
const blurShow = ref(false);

const affixChange = (affixed) => {
  blurShow.value = affixed;
}

// eslint-disable-next-line no-unused-vars
const chatClear = async () => {
  try {
    await ClearPatientChat();
    chatContent.value.length = 1;
  } catch (error) {
    console.error('Error:', error);
  }
}

const chatSubmit = async () => {
  if (!textValue.value) {
    return;
  }
  submitAbled.value = false;
  const submitContent = textValue.value;
  setTimeout(async () => {
    chatContent.value = [
      ...chatContent.value,
      {
        author: '您',
        content: submitContent,
      },
    ];
    textValue.value = '';
    const formData = new FormData();
    formData.append('prompt', submitContent);
    try {
      const response = await fetch(BaseURL + '/chat/stream', {
        method: 'POST',
        body: formData,
      });
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();
      // eslint-disable-next-line no-constant-condition
      chatContent.value = [
        ...chatContent.value,
        {
          author: '智能导诊系统',
          content: '',
        },
      ];
      const contentIndex = chatContent.value.length - 1;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const {done, value} = await reader.read();
        if (done) {
          submitAbled.value = true;
          break;
        }
        chatContent.value[contentIndex].content += textDecoder.decode(value);
      }
    } catch (error) {
      console.error('Error:', error);
      submitAbled.value = true;
    }
  }, 100);
}
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
        <a-affix :offset-bottom="20" @change="affixChange">
          <div v-show="blurShow" style="width: 100%;height: 115px;position: absolute; top: -20px; left: -2px;
          backdrop-filter: blur(40px);background-color: hsla(0, 0%, 100%, .8);"></div>
          <div style="width: 100%; display: flex; justify-content: space-between; padding: 0 24px 0 22px;">
            <a-textarea
                v-model:value="textValue"
                placeholder="请输入对话"
                :auto-size="{ minRows: 3, maxRows: 3 }"
            >
            </a-textarea>
            <div style="display: flex; justify-content: space-between; flex-direction: column">
              <a-button @click="chatSubmit" type="primary" :icon="h(SendOutlined)" :disabled="!submitAbled"
                        style="margin-left: 12px"/>
              <a-button @click="chatClear" danger :icon="h(DeleteOutlined)" :disabled="!submitAbled"
                        style="margin-left: 12px"/>
            </div>
          </div>
        </a-affix>
      </template>
      <a-list
          v-if="chatContent.length"
          :data-source="chatContent"
          item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item class="chat-content">
            <a-comment
                style="white-space: pre-line;"
                :author="item.author"
                :content="item.content"
            >
              <template #avatar>
                <a-avatar v-if="item.author === '您'" style="background-color: #52c41a">
                  <template #icon>
                    <UserOutlined/>
                  </template>
                </a-avatar>
                <a-avatar v-if="item.author !== '您'" style="background-color: #1890ff">
                  <template #icon>
                    <CommentOutlined/>
                  </template>
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
.chat-content {
  margin-inline: 0 0 !important;
}
</style>