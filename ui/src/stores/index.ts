import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("pinia", ()=>{
  let nowPage = ref<string[]>(['aria']);

  interface Rule{
    id: string,
    type: string,
    value: string,
  }

  let running=ref(false);

  let formData=ref({
    subscribeMode: true,
    rssLink: "",
    rules: [] as Rule[],
    updateFreq: 15,
  });

  let ariaData=ref({
    ariaLink: "",
    ariaSecret: "",
  });

  const addRule=(val: any)=>{
    formData.value.rules.push(val);
  }
  const delRule=(id: string)=>{
    formData.value.rules=formData.value.rules.filter(item => item.id != id);
  }
  const toggleRun=(val: boolean)=>{
    if(val){
      // TODO 运行服务
    }else{
      // TODO 停止服务
    }
  }
  const setFormData=(val: any)=>{
    formData.value=val;
  }
  const setAriaData=(val: any)=>{
    ariaData.value=val;
  }

  return {nowPage, formData, addRule, delRule, running, toggleRun, setFormData, ariaData, setAriaData}
})