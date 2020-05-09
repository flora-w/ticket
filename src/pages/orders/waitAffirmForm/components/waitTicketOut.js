import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Checkbox } from 'antd';
import Card from '../../../../components/card';
import {MergeCellsTable} from '../../../../components/table/index'



export default ({ data1=[] }) => {
  
    const columns = [{
        title: '工號',
        dataIndex: 'empno',
        align:"center",
      },{
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
        {title: '出發時間',dataIndex: 'dateSection',align:"center",},
        {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
        {title: '到達機場',dataIndex: 'arriveAirport',align:"center",}
      ]
    }]

    const mergeItems = [ 'empno', 'name', 'category'];

    return(
      <Card title="行程信息" className="flight-info">
        <MergeCellsTable
          data={data1}
          columns={columns}
          rowKey={data1.key}
          mergeItems={mergeItems}
        />
      </Card>
    )
}