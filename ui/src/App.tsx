import { useEffect, useState } from "react";
import "./styles/style.css"
import { Tag, Switch, Radio, Input, InputNumber, Button, Table, Modal, Select, message } from 'antd';
import { initState, toggleRun, getLog } from "./hook";
import { nanoid } from "nanoid";


function App() {
  const [width, setWidth] = useState(window.innerWidth);

  const [running, setRunning]=useState(false);
  const [mode, setMode]=useState("subscribe");
  const [rssLink, setRssLink]=useState("");
  const [freq, setFreq]=useState(15);
  const [airaLink, setAriaLink]=useState("");
  const [airaSecret, setAriaSecret]=useState("");
  const [bangumi, setBangumi]=useState<any[]>([]);
  const [rules, setRules]=useState<any[]>([]);
  const [openAddBangumi, setOpenAddBangumi]=useState(false);
  const [bangumiName, setBangumiName]=useState("");
  const [bangumiAss, setBangumiAss]=useState("");
  const [openAddRule, setOpenAddRule]=useState(false);
  const [ruleType, setRuleType]=useState("exclude");
  const [ruleValue, setRuleValue]=useState("");
  // const [logs, setLogs]=useState<any[]>([]);
  
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
      setRunning(initData.status=='false'?false:true);
      setMode(initData.formData.subscribemode==true?'subscribe':'list');
      setRssLink(initData.formData.rsslink);
      setFreq(initData.formData.updatefreq);
      setAriaLink(initData.formData.arialink);
      setAriaSecret(initData.formData.ariasecret);
      setBangumi(initData.formData.bangumi);
      setRules(initData.formData.rules);
    } catch (e) {
      console.log(e);
    }
  }

  function addRule(){
    setOpenAddRule(true);
  }

  function addRuleHandler(){
    setRules([...rules, {
      id: nanoid(),
      type: ruleType,
      value: ruleValue,
    }]);
    modalCancel();
  }

  function delRule(id: string){
    let data=rules;
    data=data.filter(item=>item.id!=id);
    setRules(data);
  }

  function delBangumi(id: string){
    let data=bangumi;
    data=data.filter(item=>item.id!=id);
    setBangumi(data);
  }
  
  function addBangumi(){
    setOpenAddBangumi(true);
  }

  function addBangumiHanlder(){
    const newItem={
      id: nanoid(),
      ass: bangumiAss,
      title: bangumiName,
    }
    setBangumi([...bangumi, newItem]);
    modalCancel();
  }

  function modalCancel(){
    setOpenAddBangumi(false);
    setOpenAddRule(false);
    setBangumiName("");
    setBangumiAss("");
    setRuleType("exclude");
    setRuleValue("");
  }

  const RuleColumn=[
    {
      title: '类型',
      width: '70px',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) =>{
        if(text=='exclude'){
          return <Tag color="red">排除</Tag>
        }else{
          return <Tag color="success">包含</Tag>
        }
      }
    },
    {
      title: "值",
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '操作',
      width: '70px',
      key: 'operation',
      render: (_: any, record: any) => (
        <Button type="text" danger onClick={()=>delRule(record.id)} disabled={running}>删除</Button>
      ),
    }
  ]

  const BangumiColumn=[
    {
      title: '字幕组',
      dataIndex: 'ass',
      key: 'ass',
      render: (text: string) => <Tag>{text}</Tag>
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '操作',
      key: 'operation',
      width: '70px',
      render: (_: any, record: any) => (
          <Button type="text" danger onClick={()=>delBangumi(record.id)} disabled={running}>删除</Button>
      ),
    }
  ]

  async function toggle(){
    if(rssLink.length==0){
      message.error("没有输入RSS链接");
      return;
    }else if(airaLink.length==0){
      message.error("没有输入Aria地址")
      return;
    }
    const response=await toggleRun(running, mode=='subscribe'? true: false, rssLink, rules, freq, airaLink, airaSecret, bangumi);
    if(response){
      setRunning(!running);
    }
  }

  function changeMode(value: any){
    if(value.target.value=='subscribe'){
      setRssLink('https://mikanime.tv/RSS/Classic');
    }
    setMode(value.target.value);
  }

  async function showLog(){
    const response=await getLog();
    // console.log(response.log);
    
    if(!response.status){
      message.error('获取日志失败');
      return;
    }
    Modal.info({
      title: '日志',
      centered: true,
      width: width<720?width-20 : 700,
      content: (
        <div className="logBg">
          {
            response.log.slice().reverse().map((item: any, index: number)=>
              <div key={index} className="logItem" style={item.type=='ok'?{"color": "green"}:item.type=='err'?{"color": "red"}:{"color": "blue"}}>
                <div className="logTitle">{item.value}</div>
                <div className="logTime">{item.time}</div>
              </div>
            )
          }
        </div>
      ),
      onOk() {},
    });
  }

  return (
    <div className="bg" style={bgStyle}>
      <div className="form">
        <div className="item">
          <div className="label">运行状态</div>
          <div className="content">
            { running && <Tag color="success">运行中</Tag>}
            { !running && <Tag color="warning">等待中</Tag>}
            <Switch style={{'marginLeft': '10px'}} value={running} onChange={()=>toggle()}/>
            <Button type="link" style={{"marginLeft": "10px"}} onClick={()=>showLog()}>日志</Button>
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
        <div className="item">
          <div className="label">RSS 链接</div>
          <div className="content">
            <Input value={rssLink} onChange={(e) => setRssLink(e.target.value)} disabled={running || mode=='subscribe'}/>
          </div>
        </div>
        <div className="item">
          <div className="label">更新频率</div>
          <div className="content">
            <InputNumber min={1} max={120} value={freq} disabled={running} onChange={(value)=>setFreq(value==null?15:value)}/>
            <div style={{'marginLeft': '5px'}}>分钟</div>
          </div>
        </div>
        <div className="item">
          <div className="label">Aria 地址</div>
          <div className="content">
            <Input value={airaLink} onChange={(e) => setAriaLink(e.target.value)} disabled={running} />
          </div>
        </div>
        <div className="item">
          <div className="label">Aria 密钥</div>
          <div className="content">
            <Input.Password value={airaSecret} onChange={(e) => setAriaSecret(e.target.value)} disabled={running}/>
          </div>
        </div>
        {
          mode=='list' &&
          <hr color="lightgrey"/>
        }
        {
          mode=='list' &&
          <div className="item">
            <div className="label">手动添加</div>
            <div className="content">
              <Button onClick={()=>addBangumi()} disabled={running}>添加番剧</Button>
            </div>
          </div>
        }
        {
          mode=='list' &&
          <Table rowKey="id" style={{"marginTop": '10px'}} columns={BangumiColumn} dataSource={bangumi} pagination={false} />
        }
        <hr color="lightgrey"/>
        <div className="item">
          <div className="label">规则</div>
          <div className="content">
            <Button onClick={() => addRule()} disabled={running}>添加规则</Button>
          </div>
        </div>
        <Table rowKey="id" style={{"marginTop": '10px'}} columns={RuleColumn} dataSource={rules} pagination={false}/>
      </div>
      <Modal
        open={openAddBangumi}
        title="添加番剧"
        onOk={()=>addBangumiHanlder()}
        centered={true}
        onCancel={()=>modalCancel()}
      >
        <div className="item">
          <div className="label">字幕组</div>
          <div className="content">
            <Input value={bangumiAss} onChange={(e) => setBangumiAss(e.target.value)}></Input>
          </div>
        </div>
        <div className="item">
          <div className="label">标题</div>
          <div className="content">
            <Input value={bangumiName} onChange={(e) => setBangumiName(e.target.value)}></Input>
          </div>
        </div>
      </Modal>

      <Modal
        open={openAddRule}
        title="添加规则"
        onOk={()=>addRuleHandler()}
        centered={true}
        onCancel={()=>modalCancel()}
      >
        <div className="item">
          <div className="label">规则类型</div>
          <div className="content">
            <Select value={ruleType} onChange={(value)=>setRuleType(value)}>
              <Select.Option value="exclude">排除</Select.Option>
              <Select.Option value="include">包含</Select.Option>
            </Select>
          </div>
        </div>
        <div className="item">
          <div className="label">值</div>
          <div className="content">
            <Input value={ruleValue} onChange={(e) => setRuleValue(e.target.value)}></Input>
          </div>
        </div>
      </Modal>
    </div>
  )
}


export default App
