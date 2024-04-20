import { message } from "ant-design-vue";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export default defineStore("pinia", ()=>{
  let nowPage = ref<string[]>(['settings']);

  interface Rule{
    id: string,
    type: string,
    value: string,
  }

  let running=ref(false);
  let log=ref([]);

  const setLog=(val: any)=>{
    log.value=val;
  }

  let formData=ref({
    subscribeMode: true,
    rssLink: "",
    rules: [] as Rule[],
    updateFreq: 15,
    airaLink: "",
    airaSecret: "",
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
      if(formData.value.rssLink==""){
        message.error("RSS地址不能为空");
        running.value=false;
      }else if(ariaData.value.ariaLink==""){
        message.error("Aria2 地址不能为空");
        running.value=false;
      }
      // TODO 运行服务
    }else{
      // TODO 停止服务
    }
  }
  const setFormData=(val: any)=>{
    formData.value=val;
  }
  const setRunning=(val: boolean)=>{
    running.value=val;
  }

  watch(formData, (newVal)=>{
    if(newVal.subscribeMode==false){
      formData.value.rssLink="https://mikanime.tv/RSS/Classic";
    }
    localStorage.setItem("settings", JSON.stringify(formData.value))
  }, {deep: true})

  watch(ariaData, ()=>{
    localStorage.setItem("aria", JSON.stringify(ariaData.value));
  }, {deep: true})

  return {nowPage, formData, addRule, delRule, running, toggleRun, setFormData, setRunning, log, setLog}
})