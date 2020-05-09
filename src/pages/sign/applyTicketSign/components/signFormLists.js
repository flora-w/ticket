import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";

class SignFormLists extends Component {

  render(){
    const columns = [{
      title: '單號',
      dataIndex: 'formId',
      align:"center",
      render: (text, record) => (
        <Link 
        to={{pathname: '/sign/detail', 
          search: `?formId=${record.serialId}&formName=${record.formName}&id=${this.props.page}`}}
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
  const { signFormListData, page } = state.signReducer.applyTicketSignReducer;
  return{
    signFormListData, page
  }
}

export default connect( mapStateToProps, null )( SignFormLists )