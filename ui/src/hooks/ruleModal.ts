import { ref } from "vue";
import stores from "../stores";
import { message } from "ant-design-vue";
import { nanoid } from "nanoid";

export default function(){
  let addForm=ref({
    id: "",
    type: "exclude",
    value: "",
  })
  let openRuleModal=ref(false);
  const showRuleModal=()=>{
    openRuleModal.value=true;
  }
  const addRuleHandler=()=>{
    if(addForm.value.value==""){
      message.error("没有输入内容！")
    }else{
      const newData = { ...addForm.value, id: nanoid() };
      stores().addRule(newData);
      openRuleModal.value=false;
      addForm.value.id="";
      addForm.value.value="";
      addForm.value.type="exclude";
    }
  }
  const delRuleHandler=(id: string)=>{
    if(!stores().running){
      stores().delRule(id);
    }
  }

  return {addForm, openRuleModal, showRuleModal, addRuleHandler, delRuleHandler};
}