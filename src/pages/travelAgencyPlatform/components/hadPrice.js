import React from 'react';
import Card from "../../../components/card";
import { connect } from "react-redux";
import { actionCreators } from '../store'
import { MergeCellsTable } from "../../../components/table";
import { Tag } from "antd";

const HadPrice = ({ hadQuote, handleQuotePriceClick, backChange }) => {
  const columns1 = [ {
    title: '姓名',
    dataIndex: 'name',
    align:"center",
  }, {
    title: '性別',
    dataIndex: 'gender',
    align:"center",
  },{
    title: '航程類別',
    dataIndex: 'category',
    align:"center",
  }, {
    title: '行程',
    align:"center",
    children: [
      {title: '出發時間區間',dataIndex: 'dateSection',align:"center",},
      {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
      {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
      {title: '航班',dataIndex: 'flightNo',align:"center",},
      {
        title: '金額',
        dataIndex: 'money',
        align:"center",
        render: text => <Tag color="red">{`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Tag>
      },
    ]
  },{
    dataIndex: 'price',
    extraRender:  (text, record) => (
      <a 
      href="javascript:;"
      onClick={() => handleQuotePriceClick(record, true)}
      >修改</a>
    ) 
  }]
  const columns2 = [ {
    title: '姓名',
    dataIndex: 'name',
    align:"center",
  }, {
    title: '性別',
    dataIndex: 'gender',
    align:"center",
  },{
    title: '航程類別',
    dataIndex: 'category',
    align:"center",
  }, {
    title: '行程',
    align:"center",
    children: [
      {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
      {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
    ]
  },{
    dataIndex: 'price',
    extraRender: (text, record) => (
      <a 
      href="javascript:;"
      onClick={() => handleQuotePriceClick(record, true)}
      >查看</a>
    ) 
  }]
  const mergeItems = ['name', 'gender', 'category', 'price'];
  hadQuote.forEach(v=>{
    if(v.placeFrom){
      v.fromAirport = v.placeFrom;
      v.arriveAirport = v.placeTo
    }
  })
    return(
      <Card title="已報價">
      {
        hadQuote.length > 0 &&
        <MergeCellsTable
          data={hadQuote}
          columns={backChange? columns2 : columns1}
          rowKey={hadQuote.key}
          mergeItems={mergeItems}
        />
      }  
      </Card>
    )
}
const mapStateToProps = ( state ) => {
  const { hadQuote, backChange } = state.travelAgencyPlatformReducer;
  return{
    hadQuote, backChange
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleQuotePriceClick(formData, edit){
      dispatch(actionCreators.quotePriceClick( formData,null, edit ))
    }
  }
}
export default  connect( mapStateToProps, mapDispatchToProps )( HadPrice ) 