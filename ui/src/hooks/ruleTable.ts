export default function(){
  const columns=[
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: "120px",
      filters: [
        { text: '排除', value: 'exclude' },
        { text: '包含', value: 'include' },
        { text: '以...为开头', value: 'startWith' }
      ],
      onFilter: (value: string, record: any) => record.type==value,
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      width: "80px",
    },
  ]

  return {columns}
}