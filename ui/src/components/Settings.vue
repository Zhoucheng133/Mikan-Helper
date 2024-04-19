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
        <a-table :columns="ruleTable().columns">

        </a-table>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import stores from '../stores';
import { computed, h, watch } from 'vue';
import { QuestionOutlined } from '@ant-design/icons-vue';
import ruleTable from '../hooks/ruleTable';

const modeTip=computed(()=>{
  return stores().formData.subscribeMode ? "订阅模式需要在Mikan Project上注册并且选择需要番剧订阅" : "列表模式将会从所有的番剧列表中筛选需要下载的内容进行下载"
})
const rssLabel=computed(()=>{
  return stores().formData.subscribeMode ? "订阅的RSS链接" : "列表RSS链接"
})
const labelCol = { style: { width: '150px' } };
const wrapperCol = { style: { width: '800px' } };

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
</style>