import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("pinia", ()=>{
  let nowPage = ref<string[]>(['settings']);

  let formData=ref({
    subscribeMode: true,
    rssLink: "",
    rules: [
      // 以下内容仅做测试
      {
        id: "123",
        type: "exclude",
        value: "CHT"
      },
      {
        id: "456",
        type: "include",
        value: "1080P"
      },
      {
        id: "8989",
        type: "startWith",
        value: "[ANi]"
      },
      {
        id: "090",
        type: "include",
        value: "CHS"
      }
    ]
  })

  const addRule=(val: any)=>{
    formData.value.rules.push(val);
  }
  const delRule=(id: string)=>{
    formData.value.rules=formData.value.rules.filter(item => item.id != id);
  }

  return {nowPage, formData, addRule, delRule}
})