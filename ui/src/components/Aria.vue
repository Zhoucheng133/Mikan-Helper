<template>
  <div class="form">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="加载Aria配置">
        <a-button @click="getAria" type="text" style="color: #1677ff;" >从浏览器中加载Aria配置</a-button>
      </a-form-item>
      <a-form-item label="Aria2 地址">
        <a-input v-model:value="stores().ariaData.ariaLink" />
      </a-form-item>
      <a-form-item label="Aria2 密钥">
        <a-input v-model:value="stores().ariaData.ariaSecret" placeholder="没有则留空" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import stores from '../stores';
import { watch } from 'vue';
const labelCol = { style: { width: '150px' } };
const wrapperCol = { style: { width: '800px' } };

const getAria=()=>{
  const aira=localStorage.getItem("aria");
  if(aira){
    const jsonAria=JSON.parse(aira);
    stores().setAriaData(jsonAria);
  }else{
    message.error("浏览器中没有记录Aria配置")
  }
}
watch(stores().ariaData, (newVal)=>{
  localStorage.setItem("aria", JSON.stringify(newVal));
}, {deep: true})
</script>

<style scoped>
.form{
  display: grid;
  justify-content: center;
  user-select: none;
}
</style>