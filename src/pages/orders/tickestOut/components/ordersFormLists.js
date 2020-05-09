import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { actionCreators } from "../store"

class OrdersFormLists extends Component {
  componentDidMount(){
    //通过id不同判断要请求的页面数据，是所有的單據还是簽核中單據的
    this.props.getPageData(this.props.id);   
  }
  render(){
    const columns = [{
      title: '單號',
      dataIndex: 'formId',
      align:"center",
      render: (text, record) => (
        <Link 
        to={{pathname: '/orders/details', 
          search: `?formId=${text}&formName=${record.formName}&id=${this.props.id}`}}
        >
          {text}
        </Link>
      )
    }, {
      title: '表單名稱',
      dataIndex: 'formName',
      align:"center"
    }, {
      title: '填單日期',
      dataIndex: 'fillDate',
      align:"center"
    }, {
      title: '填單人',
      dataIndex: 'applyName',
      align:"center"
    }, {
      title: '目前狀態',
      dataIndex: 'status',
      align:"center",
      render: text => <Tag color="blue">{text}</Tag>
    }]
    const { signFormListData } = this.props;
    return(
      <Table 
      columns={columns}
      dataSource={signFormListData}
      pagination={{hideOnSinglePage: true}}
      bordered={true} 
      rowKey={'formId'}
      size="middle"
      />
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { signFormListData } =state.ordersReducer.ticketsOutReducer;
  return{
    signFormListData
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(id){
      dispatch(actionCreators.getPageData(id))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( OrdersFormLists )