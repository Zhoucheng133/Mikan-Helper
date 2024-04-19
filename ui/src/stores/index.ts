import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("pinia", ()=>{
  let nowPage = ref<string[]>(['settings']);

  let formData=ref({
    subscribeMode: true,
    rssLink: "",
    rules: [
      {
        "type": "exclude",
        "value": "CHT"
      },
      {
        "type": "include",
        "value": "1080P"
      },
      {
        "type": "startWith",
        "value": "[ANi]"
      },
      {
        "type": "include",
        "value": "CHS"
      }
    ]
  })

  const addRule=(val: any)=>{
    formData.value.rules.push(val);
  }

  return {nowPage, formData, addRule}
})