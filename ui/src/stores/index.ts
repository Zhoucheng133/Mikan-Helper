import { message } from "ant-design-vue";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import requets from "./requets";

export default defineStore("pinia", ()=>{
  interface Rule{
    id: string,
    type: string,
    value: string,
  }
  let nowPage = ref<string[]>(['settings']);
  let running=ref(false);
  let log=ref([]);
  let formData=ref({
    subscribeMode: true,
    rssLink: "",
    rules: [] as Rule[],
    updateFreq: 15,
    ariaLink: "",
    ariaSecret: "",
  });
  

  const setLog=(val: any)=>{
    log.value=val;
  }
  const setFormData=(val: any)=>{
    formData.value=val;
  }
  const setRunning=(val: boolean)=>{
    running.value=val;
  }

  const addRule=(val: any)=>{
    formData.value.rules.push(val);
  }
  const delRule=(id: string)=>{
    formData.value.rules=formData.value.rules.filter(item => item.id != id);
  }
  const toggleRun=(val: boolean)=>{
    if(val){
      if(formData.value.rssLink==""){
        message.error("RSS地址不能为空");
        running.value=false;
      }else if(formData.value.ariaLink==""){
        message.error("Aria2 地址不能为空");
        running.value=false;
      }else{
        requets().runServer();
      }
    }else{
      requets().stopServer();
    }
  }

  watch(formData, (newVal)=>{
    if(newVal.subscribeMode==false){
      formData.value.rssLink="https://mikanime.tv/RSS/Classic";
    }
    localStorage.setItem("settings", JSON.stringify(formData.value))
  }, {deep: true})

  return {nowPage, formData, addRule, delRule, running, toggleRun, setFormData, setRunning, log, setLog}
})