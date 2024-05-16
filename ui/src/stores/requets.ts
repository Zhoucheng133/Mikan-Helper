import axios from "axios";
import { defineStore } from "pinia";
import stores from ".";

export default defineStore('requests', ()=>{
  const baseURL="http://127.0.0.1:8811";
  const getStatus=async ()=>{
    const response=await axios.get(baseURL+"/api/status");
    if(response.data.status=="ok"){
      stores().setRunning(true);
    }else{
      stores().setRunning(false);
    }
    if(response.data.formData.rsslink!=""){
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
  const runServer=async ()=>{
    const data=stores().formData;
    const response=await axios.post(baseURL+"/api/run", data);
    if(response.data.status=="ok"){
      stores().setRunning(true);
    }
  }
  const stopServer=async ()=>{
    const response=await axios.post(baseURL+"/api/stop");
    if(response.data.status=="ok"){
      stores().setRunning(false);
    }
  }

  return {getStatus, getLog, runServer, stopServer}
})