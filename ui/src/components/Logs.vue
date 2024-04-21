<template>
  <div style="user-select: none;">
    <a-button type="primary" style="margin-bottom: 10px;" @click="requets().getLog();">刷新日志</a-button>
    <a-table :columns="logTable().columns" :data-source="stores().log">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'type'">
          <a-tag :color="record.type=='ok'?'green': record.type=='err' ? 'red' : 'blue' ">{{ record.type=='ok'?'成功':record.type=='err' ? '错误' : '下载' }}</a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import logTable from '../hooks/logTable';
import stores from '../stores';
import requets from '../stores/requets';
</script>