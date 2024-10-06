<script setup>
import {h, onMounted, ref} from 'vue';
import {
  SendOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";
import * as echarts from 'echarts';

const textValue = ref('');
const chatContent = ref([
  {
    author: '系统提示',
    content: '您好，患者已加入对话',
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

let option = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'sankey',
      data: [
        {
          name: 'a'
        },
        {
          name: 'b'
        },
        {
          name: 'a1'
        },
        {
          name: 'a2'
        },
        {
          name: 'b1'
        },
        {
          name: 'c'
        }
      ],
      links: [
        {
          source: 'a',
          target: 'a1',
          value: 5
        },
        {
          source: 'a',
          target: 'a2',
          value: 3
        },
        {
          source: 'b',
          target: 'b1',
          value: 8
        },
        {
          source: 'a',
          target: 'b1',
          value: 3
        },
        {
          source: 'b1',
          target: 'a1',
          value: 1
        },
        {
          source: 'b1',
          target: 'c',
          value: 2
        }
      ],
      emphasis: {
        focus: 'adjacency'
      },
      lineStyle: {
        color: 'gradient',
        curveness: 0.5
      }
    }
  ]
}

function reSizeForm (check) {
 console.log(check)
}

onMounted(() => {
  reSizeForm(document.body.clientWidth);
  const MedicChart = echarts.init(document.getElementById('medicDOM'));
  MedicChart.setOption(option);
  MedicChart.resize();
  setTimeout(() => {
    MedicChart.resize();
    MedicChart.setOption(option, true);
    reSizeForm(document.body.clientWidth);
  }, 1000);
  window.onresize = function () {
    MedicChart.resize();
    MedicChart.setOption(option, true);
    reSizeForm(document.body.clientWidth);
  };
})
</script>
<template>
  <a-breadcrumb style="margin-bottom: 16px">
    <a-breadcrumb-item>首页</a-breadcrumb-item>
    <a-breadcrumb-item>线上问诊</a-breadcrumb-item>
  </a-breadcrumb>
  <a-typography-title :level="2">线上问诊系统</a-typography-title>
  <div id="doctor-medical-panel">
    <a-typography-paragraph id="doctor-medical-content-1">
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
    <a-typography-paragraph id="doctor-medical-content-2">
      <a-card style="max-width: 100%" :bodyStyle="{ position: 'relative' }">
        <div style="width:100%;height:400px;" id="medicDOM"></div>
      </a-card>
    </a-typography-paragraph>
  </div>
</template>
<style>
#doctor-medical-panel {
  display: flex;
  flex-wrap: wrap;
  column-gap: 14px;
}

#doctor-medical-content-1 {
  flex: 4 300px;
}

#doctor-medical-content-2 {
  flex: 6 450px;
}

.chat-content{
  margin-inline: 0 0 !important;
}
</style>