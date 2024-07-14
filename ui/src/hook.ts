import axios from "axios";


const baseURL="";
// const baseURL="http://192.168.31.40:8811";

async function initState(){
  const formData=await axios.get(`${baseURL}/api/status`);
  return formData.data;
}

const toggleRun=async (running: boolean, subscribemode:boolean, rsslink: string, rules: any, updatefreq: number, arialink: string, ariasecret: string, bangumi: any)=>{
  if(running){
    const response=await axios.post(`${baseURL}/api/stop`);
    if(!(response.data.status=='ok')){
      return false;
    }
  }else{
    const response=await axios.post(`${baseURL}/api/run`, {
      subscribemode: subscribemode,
      rsslink: rsslink,
      rules: rules,
      updatefreq: updatefreq,
      arialink: arialink,
      ariasecret: ariasecret,
      bangumi: bangumi
    });
    if(!(response.data.status=='ok')){
      return false;
    }
  }
  return true;
}

async function getLog(){
  const logData=await axios.get(`${baseURL}/api/log`);
  return logData.data;
}

export { initState, toggleRun, getLog };