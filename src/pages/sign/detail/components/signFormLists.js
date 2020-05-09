import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Tag } from "antd";
import { actionCreators } from "../store";

class SignFormLists extends Component {
  componentDidMount(){
    //通过id不同判断要请求的页面数据，是未签核还是已签核的
    this.props.getPageData(this.props.id);
    
  }
  render(){
    const columns = [{
      title: '單號',
      dataIndex: 'formId',
      align:"center",
      render: (text, record) => <a 
      href="javascript:;" 
      onClick={() => this.props.handleFormIdClick(text, record.formName)}
      >{text}</a>
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
  const { signFormListData } = state.signReducer.applyTicketSignReducer;
  return{
    signFormListData
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(id){
      dispatch(actionCreators.getPageData(id))
    },
    handleFormIdClick(id, name){
      dispatch(actionCreators.formIdClick(id, name))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( SignFormLists )