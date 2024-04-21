import { message } from "ant-design-vue";
import { nanoid } from "nanoid";
import { ref } from "vue";
import stores from "../stores";

export default function(){
  let openBangumiModal=ref(false);
  const showBangumiModal=()=>{
    openBangumiModal.value=true;
  }
  let bangumiForm=ref({
    id: "",
    ass: "",
    title: "",
  })

  const addBangumiHandler=()=>{
    if(bangumiForm.value.title==""){
      message.error("没有输入标题");
    }else if(bangumiForm.value.ass==""){
      message.error("没有输入字幕组");
    }else{
      const newData = { ...bangumiForm.value, id: nanoid() };
      stores().addBangumi(newData);
      openBangumiModal.value=false;
      bangumiForm.value.ass="";
      bangumiForm.value.id="";
      bangumiForm.value.title="";
    }
  }

  return {openBangumiModal, showBangumiModal, bangumiForm, addBangumiHandler};
}