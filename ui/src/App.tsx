import { useEffect, useState } from "react";
import "./styles/style.css"
import { FloatButton, Tag, Switch, Radio } from 'antd';
import { showLog, initState, toggleRun } from "./hook";


function App() {
  const [width, setWidth] = useState(window.innerWidth);

  const [formData, setFormData]=useState({});
  const [running, setRunning]=useState(false);
  const [mode, setMode]=useState("subscribe");

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    init();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bgStyle = {
    width: width > 800 ? '800px' : '100vw',
  };

  async function init(){
    const initData=await initState();
    try {
      setFormData(initData.formData);
      setRunning(initData.status=='false'?false:true);
    } catch (e) {
      console.log(e);
    }
  }

  function toggle(){
    toggleRun();
    setRunning(!running);
  }

  function changeMode(value: any){
    setMode(value.target.value);
  }

  return (
    <div className="bg" style={bgStyle}>
      <FloatButton onClick={() => showLog()} />
      <div className="form">
        <div className="item">
          <div className="label">运行状态</div>
          <div className="content">
            { running && <Tag color="success">运行中</Tag>}
            { !running && <Tag color="warning">等待中</Tag>}
            <Switch style={{'marginLeft': '10px'}} value={running} onChange={()=>toggle()}/>
          </div>
        </div>
        <div className="item">
          <div className="label">运行状态</div>
          <div className="content">
            <Radio.Group defaultValue="subscribe" buttonStyle="solid" value={mode} onChange={(value)=>changeMode(value)} disabled={running}>
              <Radio.Button value="subscribe">订阅</Radio.Button>
              <Radio.Button value="list">列表</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  )
}


export default App
