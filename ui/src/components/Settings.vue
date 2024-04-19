<template>
  <div class="form">
    <a-form :model="stores().formData" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="运行模式">
        <a-radio-group v-model:value="stores().formData.subscribeMode" style="user-select: none;">
          <a-radio-button :value="true">使用订阅模式</a-radio-button>
          <a-radio-button :value="false">使用列表模式</a-radio-button>
        </a-radio-group>
        <a-tooltip placement="bottomLeft" :title="modeTip" arrow-point-at-center>
          <a-button :icon="h(QuestionOutlined)" type="text" style="margin-left: 10px;"></a-button>
        </a-tooltip>
      </a-form-item>
      <a-form-item :label="rssLabel">
        <a-input v-model:value="stores().formData.rssLink" :disabled="!stores().formData.subscribeMode" />
      </a-form-item>
      <a-form-item label="规则">
        <a-button style="margin-bottom: 10px;" @click="showRuleModal">添加规则</a-button>
        <a-table :columns="ruleTable().columns" :data-source="stores().formData.rules" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'type'">
              <a-tag :color="record.type=='include'?'green':record.type=='exclude'?'red':'blue'">{{ record.type=='include'?'包含':record.type=='exclude'?'排除':'以...为开头' }}</a-tag>
            </template>
            <template v-if="column.key === 'op'">
              <div class="delButton" @click="delRuleHandler(record.id)">删除</div>
            </template>
          </template>
        </a-table>
      </a-form-item>
    </a-form>
  </div>
  <a-modal v-model:open="openRuleModal" centered height="300px" okText="添加" title="添加规则" @ok="addRuleHandler">
    <a-form :model="addForm" :label-col="{ style: { width: '80px' } }" :wrapper-col=" { style: { width: '300px' } }">
      <a-form-item label="规则类别">
        <a-select v-model:value="addForm.type">
          <a-select-option value="exclude">排除</a-select-option>
          <a-select-option value="include">包含</a-select-option>
          <a-select-option value="startWith">以...为开头</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="值">
        <a-input v-model:value="addForm.value"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import stores from '../stores';
import { computed, h, ref, watch } from 'vue';
import { QuestionOutlined } from '@ant-design/icons-vue';
import ruleTable from '../hooks/ruleTable';
import { message } from 'ant-design-vue';
import { nanoid } from 'nanoid'

const modeTip=computed(()=>{
  return stores().formData.subscribeMode ? "订阅模式需要在Mikan Project上注册并且选择需要番剧订阅" : "列表模式将会从所有的番剧列表中筛选需要下载的内容进行下载"
})
const rssLabel=computed(()=>{
  return stores().formData.subscribeMode ? "订阅的RSS链接" : "列表RSS链接"
})
const labelCol = { style: { width: '150px' } };
const wrapperCol = { style: { width: '800px' } };

let openRuleModal=ref(false);
const showRuleModal=()=>{
  openRuleModal.value=true;
}
let addForm=ref({
  id: "",
  type: "exclude",
  value: "",
})
const addRuleHandler=()=>{
  if(addForm.value.value==""){
    message.error("没有输入内容！")
  }else{
    const newData = { ...addForm.value, id: nanoid() };
    stores().addRule(newData);
    openRuleModal.value=false;
    addForm.value.id="";
  }
}
const delRuleHandler=(id: string)=>{
  stores().delRule(id);
}

watch(stores().formData, (newVal)=>{
  if(newVal.subscribeMode==false){
    stores().formData.rssLink="https://mikanime.tv/RSS/Classic";
  }else{
    stores().formData.rssLink="";
  }
}, {deep: true})
</script>

<style scoped>
.form{
  display: grid;
  justify-content: center;
  user-select: none;
}
.delButton:hover{
  color: darkred;
}
.delButton{
  cursor: pointer;
  color: red;
  transition: color linear .2s;
}
</style>