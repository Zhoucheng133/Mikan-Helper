import { MenuProps } from "ant-design-vue";
import { defineStore } from "pinia";
import { h, ref } from "vue";
import { DownloadOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons-vue';

export default defineStore('nav', ()=>{
  const items = ref<MenuProps['items']>([
    {
      key: 'settings',
      icon: () => h(SettingOutlined),
      label: '系统设置',
      title: '设置',
    },
    {
      key: 'aria',
      icon: () => h(DownloadOutlined),
      label: 'Aria2 设置',
      title: 'Aria2 设置',
    },
    {
      key: 'logs',
      icon: () => h(UnorderedListOutlined),
      label: '日志',
      title: '日志',
    },
  ])
  return {items}
})