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
  interface Bangumi{
    id: string,
    ass: string,
    title: string,
  }
  let nowPage = ref<string[]>(['settings']);
  let running=ref(false);
  let log=ref([]);
  let formData=ref({
    subscribemode: true,
    rsslink: "",
    rules: [] as Rule[],
    updatefreq: 15,
    arialink: "",
    ariasecret: "",
    bangumi: [] as Bangumi[]
  });

  const addBangumi=(val: any)=>{
    formData.value.bangumi.push(val);
  }
  const delBangumi=(id: string)=>{
    formData.value.bangumi=formData.value.bangumi.filter(item => item.id != id);
  }

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
      if(formData.value.rsslink==""){
        message.error("RSS地址不能为空");
        running.value=false;
      }else if(formData.value.arialink==""){
        message.error("Aria2 地址不能为空");
        running.value=false;
      }else{
        requets().runServer();
      }
    }else{
      requets().stopServer();
    }
  }

  const saveSettings=()=>{
    localStorage.setItem("settings", JSON.stringify(formData.value))
    message.success("保存设置成功!")
  }

  watch(formData, (newVal)=>{
    if(newVal.subscribemode==false){
      formData.value.rsslink="https://mikanime.tv/RSS/Classic";
    }
  }, {deep: true})

  return {nowPage, formData, addRule, delRule, running, toggleRun, setFormData, setRunning, log, setLog, addBangumi, delBangumi, saveSettings}
})