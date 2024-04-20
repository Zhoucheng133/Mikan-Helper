import axios from "axios";
import { defineStore } from "pinia";
import stores from ".";

export default defineStore('requests', ()=>{
  const baseURL="http://localhost:8811";
  const getStatus=async ()=>{
    const response=await axios.get(baseURL+"/api/status");
    if(response.data.status=="ok"){
      stores().setRunning(true);
    }else{
      stores().setRunning(false);
    }
    // console.log(response.data);
    if(response.data.formData.rssLink!=""){
      stores().setFormData(response.data.formData);
    }
  }
  const getLog=async ()=>{
    const response=await axios.get(baseURL+"/api/log");
    if(response.data.status=="ok"){
      // console.log(response.data);
      stores().setLog(response.data.log.reverse());
    }
  }
  const runServer=()=>{

  }
  const stopServer=()=>{

  }

  return {getStatus, getLog, runServer, stopServer}
})