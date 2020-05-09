import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card } from "antd";
import { CommonTable } from "../../../components/table";

class  TicketOut extends Component {
 
  componentDidMount(){
    this.props.getPageData()
  }
  render(){
    const { ticketOutList1, ticketOutList2 } =  this.props;
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
      title: '出票日期',
      dataIndex: 'TicketTime',
    },{
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/ticket-out/detail', 
          search: `?formId=${record.SerialID}&formName=${record.Name}`}}
        >查看</Link>
      )
    }];
    
    return(
      <div>
        <Card title="已出票">
          <CommonTable
            columns={columns}
            dataSource={ticketOutList1}
            rowKey={'SequenceID'}
          />
        </Card>
        <Card title="退改机票">
          <CommonTable
            columns={columns}
            dataSource={ticketOutList2}
            rowKey={'SequenceID'}
          />
        </Card>
      </div>
      
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { ticketOutList1, ticketOutList2 } = state.travelAgencyPlatformReducer;
  return{ticketOutList1, ticketOutList2}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getTicketOutList())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( TicketOut )