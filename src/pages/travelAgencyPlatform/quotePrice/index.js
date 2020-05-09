import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card } from "antd";
import { CommonTable } from "../../../components/table";
import { formatDate } from "../../../utils";

class QuotePrice extends Component {
 
  componentDidMount(){
    this.props.getPageData()
  }
  render(){
    const { quotePrice } =  this.props;
    const columns = [{
      title: '單號',
      dataIndex: 'SequenceID',
    }, {
      title: '表單名稱',
      dataIndex: 'Name',
    }, {
      title: '填單日期',
      dataIndex: 'ApplyDatetime',
      render: text => (formatDate(text, '-', true))
    },{
      title: '報價截止時間',
      dataIndex: 'QuoteTime',
      render: text => (formatDate(text, '-', true))
    },{
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/quote-price/detail', 
          search: `?formId=${record.SerialID}`}}
        >報價</Link>
      )
    }];
    return(
      <Card title="報價">
        <CommonTable 
         columns={columns}
         dataSource={quotePrice}
         rowKey={'SequenceID'}
        />
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { quotePrice } = state.travelAgencyPlatformReducer;
  return{quotePrice}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getPageData())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( QuotePrice )