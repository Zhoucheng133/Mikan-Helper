export default function(){
  const columns=[
    {
      title: '字幕组',
      dataIndex: 'ass',
      key: 'ass',
      width: "150px",
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      width: "80px",
    }
  ]

  return {columns}
}