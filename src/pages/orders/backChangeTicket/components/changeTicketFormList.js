import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../../../components/card';
import {MergeCellsTable} from '../../../../components/table/index'
import { Tag } from "antd";


export default ({data1=[]})=>{
  const columns = [ {
    title: '姓名',
    dataIndex: 'name',
    align: "center",
  },{
    title: '航程類別',
    dataIndex: 'category',
    align: "center",
  }, {
    title: '行程',
    dataIndex: 'applyName',
    align: "center",
    children: [
      { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
      { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
      { title: '航班', dataIndex: 'flight', align: "center", },
      { 
         title: '出發時間區間',
         dataIndex: 'flyDateTo', 
         align: "center", 
         render: (text, record) => <Tag color="red">{text + ' ' + record.flyStartTime + '~' + record.flyEndTime}</Tag>
      },
    ]
  }]
      const mergeItems = [ 'name', 'category'];
    return(
        <Card title="改簽行程" className="flight-info">
       < MergeCellsTable
        data={data1}
        columns={columns}
        rowKey={data1.key}
        mergeItems={mergeItems}/>
      </Card>
    )
}