import React from 'react';
import Card from "../../../../components/card";
import { MergeCellsTable } from "../../../../components/table/index";

export default ({ data=[] }) => {
    const columns = [{
      title: '工號',
      dataIndex: 'empno',
      align:"center",
    }, {
      title: '姓名',
      dataIndex: 'name',
      align:"center",
    }, {
      title: '航程類別',
      dataIndex: 'category',
      align:"center",
    }, {
      title: '行程',
      dataIndex: 'applyName',
      align:"center",
      children: [
        {title: '出發時間區間',dataIndex: 'dateSection',align:"center",},
        {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
        {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
      ]
    }]

    const mergeItems = ['empno', 'name', 'category'];

    return(
      <Card title="機票信息" className="flight-info">
        <MergeCellsTable
          data={data}
          columns={columns}
          rowKey={data.key}
          mergeItems={mergeItems}
        />
      </Card>
    )
}
  