export default function(){
  const columns=[
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type',
      width: "120px",
      filters: [
        { text: '成功', value: 'ok' },
        { text: '下载', value: 'download' },
        { text: '错误', value: 'err' },
      ],
      onFilter: (value: string, record: any) => record.type==value,
    },
    {
      title: '内容',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: "200px",
    },
  ]

  return {columns}
}