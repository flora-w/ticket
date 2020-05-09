import React from 'react';
import { withRouter } from "react-router-dom";
import Card from "../../../components/card";
import { connect } from "react-redux";
import { actionCreators } from '../store'
import { MergeCellsTable } from "../../../components/table";
import QuoteStart from './quoteStart'
import { Tag } from 'antd';
import { getUrlParam } from "../../../utils";

const WillQuotePrice = ({ data, handleQuotePriceClick, backChange, category, location  }) => {
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    align:"center",
  }, {
    title: '性別',
    dataIndex: 'gender',
    align:"center",
  }, {
    title: '航程類別',
    dataIndex: 'category',
    align:"center",
  }, {
    title: '行程',
    dataIndex: 'applyName',
    align:"center",
    children: category !== 'backChangeTicketQuote'?  [
      {title: '出發時間區間',dataIndex: 'dateSection',align:"center",},
      {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
      {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
      {title: '金額',dataIndex: 'money',align:"center", render: text => <Tag color="red">{text}</Tag>},
    ] : [
      {title: '出發時間區間',dataIndex: 'dateSection',align:"center",},
      {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
      {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
    ]
  },{
    dataIndex: 'price',
    extraRender:  (text, record) => (
      <a 
        href="javascript:;"
        onClick={() => {
          const serialId = getUrlParam(location.search, 'formId');
          handleQuotePriceClick(record, serialId, category);
        }}
      >報價</a>
    ) 
  }]




  const mergeItems = ['gender', 'name', 'category', 'price'];
    return(
      <Card title="報價">
         <MergeCellsTable
          data={data}
          columns={columns}
          rowKey={data.key}
          mergeItems={mergeItems}
        />
        <QuoteStart />
      </Card>
    )
}
 
const mapStateToProps = ( state ) => {
  const { quotePrice, flight, backChange } = state.travelAgencyPlatformReducer;
  return{
    quotePrice, flight, backChange
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleQuotePriceClick(formData, serialId, category){
      if(category !== 'backChangeTicketQuote'){
        dispatch(actionCreators.quotePriceClick( formData, serialId ))
      }
      if(category === 'backChangeTicketQuote'){
        dispatch(actionCreators.backChangeTicketQuote( formData, serialId ))
      }
      
    }
  }
}
export default  withRouter(connect( mapStateToProps, mapDispatchToProps )( WillQuotePrice )) 