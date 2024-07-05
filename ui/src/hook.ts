import axios from "axios";


const baseURL="http://127.0.0.1:8811"
// const baseURL="http://192.168.31.236:8811";

function showLog() {
  console.log("!!!");
}

async function initState(){
  const formData=await axios.get(`${baseURL}/api/status`);
  return formData.data;
}

function toggleRun(){

}

export { showLog, initState, toggleRun };