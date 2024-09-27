<script setup>
import {ref} from 'vue';
import {DownOutlined} from "@ant-design/icons-vue";

const newPatientOpen = ref(false);
const projectOptions = ref([
  {
    value: 'p2',
    label: 'B',
  },
  {
    value: 'p1',
    label: 'A',
  },
]);
const filterOptions = ref([
  {
    value: 'p2',
    label: 'B',
  },
  {
    value: 'p1',
    label: 'A',
  },
]);
const stateOptions = ref([
  {
    value: 'p2',
    label: 'B',
  },
  {
    value: 'p1',
    label: 'A',
  },
]);
const columns = ref([
  {
    title: '患者编号',
    width: 100,
    dataIndex: 'no',
    key: 'no',
    fixed: 'left',
  },
  {
    title: '患者姓名',
    width: 100,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '参与项目',
    dataIndex: 'project',
    key: 'project',
    width: 100,
  },
  {
    title: '填写方式',
    dataIndex: 'way',
    key: 'way',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    key: 'time',
    width: 150,
  },
  {
    title: '管理操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
]);
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    no: i,
    name: `Test ${i}`,
    project: 'A',
    way: '手动',
    time: '2021-09-01',
  });
}

const filterOption = (input, option) => {
  console.log(option);
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
<template>
  <a-breadcrumb style="margin-bottom: 16px">
    <a-breadcrumb-item>首页</a-breadcrumb-item>
    <a-breadcrumb-item>工作主页</a-breadcrumb-item>
  </a-breadcrumb>
  <a-typography-title :level="2">患者管理系统</a-typography-title>
  <a-typography-paragraph>
    <a-card title="查询条件" style="max-width: 100%" :bodyStyle="{ position: 'relative' }">
      <template #actions>
        <div style="width: 100%; display: flex; justify-content: right; padding-right: 24px">
          <a-space size="middle">
           <a-button>清空</a-button>
           <a-button type="primary">查询</a-button>
          </a-space>
        </div>
      </template>
      <a-form layout="inline" style="column-gap: 60px;row-gap: 24px">
        <a-form-item label="患者编号">
          <a-input class="search-item" placeholder="请输入编号" />
        </a-form-item>
        <a-form-item label="患者姓名">
          <a-input class="search-item" v-model:value="formState" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="参与项目">
          <a-select class="search-item" placeholder="请选择项目" allowClear show-search
                    :filter-option="filterOption" :options="projectOptions"/>
        </a-form-item>
        <a-form-item label="筛选方式">
          <a-select class="search-item" placeholder="请选择方式" allowClear show-search
                    :filter-option="filterOption" :options="filterOptions"/>
        </a-form-item>
        <a-form-item label="当前状态">
          <a-select class="search-item" placeholder="请选择状态" allowClear show-search
                    :filter-option="filterOption" :options="stateOptions"/>
        </a-form-item>
        <a-form-item label="最早日期">
          <a-date-picker class="search-item" v-model:value="value1" />
        </a-form-item>
        <a-form-item label="最晚日期">
          <a-date-picker class="search-item" v-model:value="value1" />
        </a-form-item>
      </a-form>
    </a-card>
  </a-typography-paragraph>
  <a-typography-paragraph>
    <a-card title="患者列表" style="max-width: 100%" :bodyStyle="{ position: 'relative' }">
      <template #extra>
        <a-dropdown trigger="click">
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1" @click="newPatientOpen = true">新建档案</a-menu-item>
              <a-menu-item key="2">批量导入</a-menu-item>
              <a-menu-item key="3">下载列表</a-menu-item>
            </a-menu>
          </template>
          <a-button type="text">
            操作
            <DownOutlined />
          </a-button>
        </a-dropdown>
      </template>
      <a-table :sticky="{offsetHeader: 64}" :columns="columns" :data-source="data"
               :scroll="{ x: true,y: false }" id="patient-table">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'"><a>操作</a></template>
        </template>
      </a-table>
    </a-card>
  </a-typography-paragraph>
  <a-drawer
      v-model:open="newPatientOpen"
      width="min(100%, 1080px)"
      title="新建档案"
      placement="right"
  >
    <template #footer>
      <div style="width: 100%; display: flex; justify-content: right; padding-right: 8px">
        <a-space size="middle">
          <a-button>清空</a-button>
          <a-button type="primary">提交</a-button>
        </a-space>
      </div>
    </template>
    <a-layout-content :style="{ margin: '0px', overflow: 'initial' }">
      <a-typography-title :level="3">基本信息</a-typography-title>
      <a-typography-paragraph>
        <a-form layout="inline" style="column-gap: 60px;row-gap: 24px">
          <a-form-item label="就诊日期">
            <a-date-picker class="search-item" v-model:value="value1" />
          </a-form-item>
          <a-form-item label="门诊号码">
            <a-input class="search-item" v-model:value="formState" placeholder="请输入登记号" />
          </a-form-item>
          <a-form-item label="患者姓名">
            <a-input class="search-item" v-model:value="formState" placeholder="请输入姓名" />
          </a-form-item>
          <a-form-item label="筛选方式">
            <a-select class="search-item" placeholder="请选择方式" allowClear show-search
                      :filter-option="filterOption" :options="filterOptions"/>
          </a-form-item>
          <a-form-item label="当前状态">
            <a-select class="search-item" placeholder="请选择状态" allowClear show-search
                      :filter-option="filterOption" :options="stateOptions"/>
          </a-form-item>
          <a-form-item label="身份证号">
            <a-input class="search-item" v-model:value="formState" placeholder="请输入身份证号" />
          </a-form-item>
          <a-form-item label="出生日期">
            <a-date-picker show-time class="search-item" v-model:value="value1" />
          </a-form-item>
          <a-form-item label="患者年龄">
            <a-input class="search-item" v-model:value="formState" placeholder="请输入年龄" />
          </a-form-item>
          <a-form-item label="电话号码">
            <a-input class="search-item" v-model:value="formState" placeholder="请输入电话" />
          </a-form-item>
        </a-form>
      </a-typography-paragraph>
    </a-layout-content>
  </a-drawer>
</template>
<style>
.search-item {
  width: 186px !important;
}

#patient-table col {
  min-width: 60px !important;
}
</style>