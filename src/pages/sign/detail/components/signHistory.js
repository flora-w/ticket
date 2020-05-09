import React from 'react';
import { Table } from "antd";
import Card from "../../../../components/card";

export default  ({data}) => {
  const columns = [
    {title: '簽核人', dataIndex: 'sSignerName'},
    {title: '簽核步驟', dataIndex: 'sSignStepName'},
    {title: '簽核時間', dataIndex: 'sSignDateTime'},
    {title: '簽核結果', dataIndex: 'sResultName'},
    {title: '簽核意見', dataIndex: 'sComment'},
  ]
    return(
      <Card title="簽核歷程" className="sign-history">
        <Table 
        rowKey='sSignDateTime'
        columns={columns}
        dataSource={data}
        pagination={false}
        size="middle"
        bordered
        />
      </Card>
    )
}