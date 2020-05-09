import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button } from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";


class AuthorityMaintain extends Component  {

  state = {
    columns:[
      {title: '工號', dataIndex: 'EmpNo'},
      {title: '姓名', dataIndex: 'ChName'},
      {title: '管理員維護', dataIndex: 'AdminAuth', edit: true, editType: 'switch'},
      {title: '旅行社維護', dataIndex: 'Travel', edit: true, editType: 'switch'},
      {title: '報價時效維護', dataIndex: 'OfferTime', edit: true, editType: 'switch'},
      {title: '郵件提醒時效維護', dataIndex: 'MailTime', edit: true, editType: 'switch'},
      {title: '系統參數維護', dataIndex: 'SystemCode', edit: true, editType: 'switch'},
      {title: '爬網參數維護', dataIndex: 'WebParams', edit: true, editType: 'switch'},
      {title: '航空公司維護', dataIndex: 'TravelCompany', edit: true, editType: 'switch'},
      {title: '公里數維護', dataIndex: 'Kilometere', edit: true, editType: 'switch'},
      {title: '航班時刻表維護', dataIndex: 'FlightTime', edit: true, editType: 'switch'},
      {title: '假期維護', dataIndex: 'Holiday', edit: true, editType: 'switch'},
    ],
   authModalPageData:[
      {title: '工号', id: 'EmpNo', type: 'input', props: {onBlur: this.props.getName.bind(this)}},
      {title: '姓名', id: 'ChName', type: 'input', props: {disabled: true}},
      {title: '管理員維護', id: 'AdminAuth', type: 'radio'},
      {title: '旅行社維護', id: 'Travel', type: 'radio'},
      {title: '報價時效維護', id: 'OfferTime', type: 'radio'},
      {title: '郵件提醒時效維護', id: 'MailTime', type: 'radio'},
      {title: '系統參數維護', id: 'SystemCode', type: 'radio'},
      {title: '爬網參數維護', id: 'WebParams', type: 'radio'},
      {title: '航空公司維護', id: 'TravelCompany', type: 'radio'},
      {title: '公里數維護', id: 'Kilometere', type: 'radio'},
      {title: '航班時刻表維護', id: 'FlightTime', type: 'radio'},
      {title: '假期維護', id: 'Holiday', type: 'radio'},
    ]
  }

  componentDidMount(){
    this.props.getPageData();
  }
  
  render(){
    const { handleShowModalClick, showModal, addAuthOk, handleHideModalClick, tableData, saveAuth} = this.props;
    const { columns,  authModalPageData} = this.state;
    return (
      <Card title="權限維護">
        <Button 
        type="primary"
        onClick={handleShowModalClick.bind(this)}
        >
        新增
        </Button>
        <AddAuth
          pageData={authModalPageData}
          showModal={showModal}
          addAuthOk={addAuthOk}
          hideModal={handleHideModalClick}
          ref="abc"
        />
        <AuthMaintainTable 
          tableData={tableData}
          columns={columns}
          saveAuth={saveAuth}
        />
      </Card>
    )
  }  
}

const mapStateToProps = (state) => {
  const { tableData, showModal } = state.adminMaintainReducer;
  return {
    tableData, showModal
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getPageData())
    },
    saveAuth(row, table){
      dispatch(actionCreators.saveAuth(row, table))
    },
    handleShowModalClick(){
      this.refs.abc.resetFields();
      dispatch(actionCreators.showModal())
    },
    handleHideModalClick(){
      dispatch(actionCreators.hideModal())
    },
    getName(e){
      const setName = this.refs.abc.setFieldsValue;
      dispatch(actionCreators.getName(e.target.value, setName))
    },
    addAuthOk(values){
      console.log(values)
      dispatch(actionCreators.addAuthOk())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorityMaintain)