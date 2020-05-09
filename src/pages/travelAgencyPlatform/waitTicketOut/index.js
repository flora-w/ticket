import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card } from "antd";
import { CommonTable } from "../../../components/table";

class WaitForTicket extends Component {
 
  componentDidMount(){
    this.props.getPageData()
  }
  render(){
    const { waitForTicketList } =  this.props;
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
      title: '目前狀態',
      dataIndex: 'Status',
    },{
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/wait-ticket-out/detail', 
          search: `?formId=${record.SerialID}`}}
        >訂票</Link>
      )
    }];
    return(
      <Card title="待出票">
        <CommonTable 
         columns={columns}
         dataSource={waitForTicketList}
         rowKey={'SequenceID'}
        />
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { waitForTicketList } = state.travelAgencyPlatformReducer;
  return{waitForTicketList}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getWaitTicketOutList())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( WaitForTicket )