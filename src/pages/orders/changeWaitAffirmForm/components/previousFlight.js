import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Checkbox } from 'antd';
import Card from '../../../../components/card';
import {MergeCellsTable} from '../../../../components/table/index'



export default ({ data=[] }) => {
  
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      align:"center",
    },{
      title: '航程類別',
      dataIndex: 'category',
      align:"center",
    }, {
      title: '行程',
      dataIndex: 'applyName',
      align:"center",
      children: [
        {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
        {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
        {title: '航班',dataIndex: 'flightNo',align:"center",},
        {title: '起飛時間',dataIndex: 'dateSection',align:"center",},
        {title: '金額',dataIndex: 'money',align:"center",},
      ]
    }]

    const mergeItems = [ 'sex', 'name', 'category'];

    return(
      <Card title="原行程" className="flight-info">
        <MergeCellsTable
          data={data}
          columns={columns}
          rowKey={data.key}
          mergeItems={mergeItems}
        />
      </Card>
    )
}