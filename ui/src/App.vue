<template>
  <div class="pageMain">
    <ConfigProvider :locale="zhCN">
      <a-menu v-model:selectedKeys="stores().nowPage" mode="horizontal" :items="nav().items" style="user-select: none;" />
      <div class="content">
        <div v-show="stores().nowPage[0]=='settings'" ><Settings/></div>
        <div v-show="stores().nowPage[0]=='aria'"><Aria /></div>
        <div v-show="stores().nowPage[0]=='logs'"><Logs /></div>
      </div>
    </ConfigProvider>
  </div>
</template>

<script setup lang="ts">
import nav from './stores/nav';
import stores from './stores';
import Settings from './components/Settings.vue';
import Aria from './components/Aria.vue';
import Logs from './components/Logs.vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<style scoped>
.pageMain{
  max-width: 1200px;
  margin: auto;
}
.content{
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>