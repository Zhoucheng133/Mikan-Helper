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

  const getLog=async ()=>{
    const response=await axios.get("/api");
    // console.log(response.data);
    setList(response.data.reverse());
  }

  return (
    <div className="bg">
      <div className="logPanel">
        <div className="title">Mikan Connector Log Panel</div>
        <div className="logList">
          {
            list.map((item)=>{
              return <div className="logItem" key={item.time}>
                <div className="logType" style={{color: item.type=="ok"?"lime":"red"}} >{item.type}</div>
                <div className="logVal">{item.val}</div>
                <div className="logTime">{item.time}</div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
