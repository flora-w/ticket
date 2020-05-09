import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card } from "antd";
import { CommonTable } from "../../../components/table";

class BackAndChangeTicket extends Component {
 
  componentDidMount(){
    this.props.getPageData()
  }
  render(){
    const { backChangeList } =  this.props;
    const columns = [{
      title: '單號',
      dataIndex: 'SequenceID',
    }, {
      title: '表單名稱',
      dataIndex: 'Name',
    }, {
      title: '填單日期',
      dataIndex: 'ApplyDatetime',
    },{
      title: '報價截止時間',
      dataIndex: 'QuoteTime',
    },{
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/back-change-ticket/detail', 
          search: `?formId=${record.SerialID}`}}
          onClick={(getState)=>{}}
        >開始報價</Link>
      )
    }];
    return(
      <Card title="退改簽">
        <CommonTable 
         columns={columns}
         dataSource={backChangeList}
         rowKey={'SequenceID'}
        />
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { backChangeList } = state.travelAgencyPlatformReducer;
  return{backChangeList}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getBackAndChange())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( BackAndChangeTicket )