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
  const [filteredList, setFilteredList]=useState<log[]>([]);
  const [useFilter, setUseFilter]=useState<string>("");

  const getLog=async ()=>{
    const response=await axios.get("/api");
    setList(response.data.reverse());
  }

  const filter=(val: string)=>{
    if(useFilter==val){
      setUseFilter("")
    }else{
      setUseFilter(val);
      if(val=="err"){
        setFilteredList(list.filter((item)=>item.type=="err"))
      }else if(val=="ok"){
        setFilteredList(list.filter((item)=>item.type=="ok"))
      }else{
        setFilteredList(list.filter((item)=>item.val.includes("下载")))
      }
    }
  }

  return (
    <div className="bg">
      <div className="logPanel">
        <div className="titleBar">
          <div className="title">Mikan Connector Log Panel</div>
          <div className={useFilter=="err" ? "bt_selected" : "bt"} onClick={()=>filter("err")} style={{marginLeft: "auto"}}>失败内容</div>
          <div className={useFilter=="ok" ? "bt_selected" : "bt"} onClick={()=>filter("ok")}>成功内容</div>
          <div className={useFilter=="download" ? "bt_selected" : "bt"} onClick={()=>filter("download")}>下载内容</div>
        </div>
        <div className="logList">
          {
            useFilter=="" ? list.map((item) => (
              <div className="logItem" key={item.time}>
                <div className="logType" style={{ color: item.type === "ok" ? "lime" : "red" }}>{item.type}</div>
                <div className="logVal">{item.val}</div>
                <div className="logTime">{item.time}</div>
              </div>
            )) : filteredList.map((item) => (
              <div className="logItem" key={item.time}>
                <div className="logType" style={{ color: item.type === "ok" ? "lime" : "red" }}>{item.type}</div>
                <div className="logVal">{item.val}</div>
                <div className="logTime">{item.time}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
