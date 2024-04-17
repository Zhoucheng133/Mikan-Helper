import { useEffect, useState } from "react"
import "./style.css"
import axios from "axios"

function App() {
  
  useEffect(()=>{
    getLog()
  }, [])

  interface log{
    time: string,
    type: string,
    val: string
  }

  const [list, setList]=useState<log[]>([]);
  const [selected, setSelected]=useState<string>("");

  const getLog=async ()=>{
    // const response=await axios.get("/api");
    const response=await axios.get("http://localhost:3000/item");
    setList(response.data.reverse());
  }

  const filter=(val: string)=>{
    if(selected==val){
      setSelected("")
    }else{
      setSelected(val);
    }
  }

  const filterItem=(val: log)=>{
    if(selected==""){
      return true;
    }else if(selected=="ok"){
      if(val.type=="ok"){
        return true;
      }else{
        return false;
      }
    }else if(selected=="err"){
      if(val.type=="err"){
        return true;
      }else{
        return false;
      }
    }else{
      if(val.val.includes("下载")){
        return true;
      }else{
        return false;
      }
    }
  }

  return (
    <div className="bg">
      <div className="logPanel">
        <div className="titleBar">
          <div className="title">Mikan Connector Log Panel</div>
          <div className={selected=="err" ? "bt_selected" : "bt"} onClick={()=>filter("err")} style={{marginLeft: "auto"}}>失败内容</div>
          <div className={selected=="ok" ? "bt_selected" : "bt"} onClick={()=>filter("ok")}>成功内容</div>
          <div className={selected=="download" ? "bt_selected" : "bt"} onClick={()=>filter("download")}>下载内容</div>
        </div>
        <div className="logList">
          {
            list.map((item)=>{
              if(filterItem(item)){
                return <div className="logItem" key={item.time}>
                  <div className="logType" style={{color: item.type=="ok"?"lime":"red"}} >{item.type}</div>
                  <div className="logVal">{item.val}</div>
                  <div className="logTime">{item.time}</div>
                </div>
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
