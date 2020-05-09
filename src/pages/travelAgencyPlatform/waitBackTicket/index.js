import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card, Tag } from "antd";
import { CommonTable } from "../../../components/table";

class  WaitBackTicket extends Component {
 
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
      title: '狀態',
      dataIndex: 'Status',
      render: text => <Tag color="green">{text}</Tag>
    },{
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/wait-back-ticket-detail', 
          search: `?formId=${record.SerialID}&formName=${record.Name}&id=1`}}
        >退票</Link>
      )
    }];
    
    return(
      <div>
        <Card title="待出票">
          <CommonTable
            columns={columns}
            dataSource={backChangeList}
            rowKey={'SequenceID'}
          />
        </Card>
      </div>
      
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
      dispatch(actionCreators.getWaitBackTicketList(1))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( WaitBackTicket )