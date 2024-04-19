<template>
  <div class="pageMain">
    <a-menu v-model:selectedKeys="stores().nowPage" mode="horizontal" :items="nav().items" style="user-select: none;" />
    <div class="content">
      <Settings v-show="stores().nowPage[0]=='settings'" />
      <Logs v-show="stores().nowPage[0]=='logs'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import nav from './stores/nav';
import stores from './stores';
import Settings from './components/Settings.vue';
import Logs from './components/Logs.vue';

</script>

<style scoped>
.pageMain{
  max-width: 1200px;
  margin: auto;
}
.content{
  margin-top: 30px;
}
</style>