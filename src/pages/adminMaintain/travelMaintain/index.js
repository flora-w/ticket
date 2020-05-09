import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button } from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/index';


class AuthorityMaintain extends Component  {

  state = {
    columns:[
      {title: '旅行社帳號', dataIndex: 'TravelName'},
      {title: '聯係人', dataIndex: 'Contact',edit: true, editType: 'INPUT'},
      {title: '電話', dataIndex: 'Telephone', edit: true, editType: 'INPUT'},
      {title: '郵箱', dataIndex: 'Mailbox', edit: true, editType: 'INPUT'},
      {title: '狀態', dataIndex: 'IsValid', edit: true, editType: 'switch'},
    ],
   authModalPageData:[
      {title: '旅行社帳號', id: 'TravelName', type: 'input'},
      {title: '聯係人', id: 'Contact', type: 'input',},
      {title: '電話', id: 'Telephone', type: 'input'},
      {title: '郵箱', id: 'Mailbox', type: 'input'},
      {title: '狀態', id: 'IsValid', type: 'radio'},
    ]
  }

  componentDidMount(){
    this.props.getPageData();
  }
  
  render(){
    const { handleShowModalClick, showModal, addAuthOk, handleHideModalClick, travelData, saveAuth} = this.props;
    const { columns,  authModalPageData} = this.state;
    return (
      <div>
        {
          !this.props.isAuthority && 
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="旅行社維護">
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
              tableData={travelData}
              columns={columns}
              saveAuth={saveAuth}
              scroll={{x:700}}
              noFixed={true}
            />
          </Card>
        }
      </div>
    )
  }  
  
  componentWillUnmount() {
    this.props.changeAuth();
  }
  
}

const mapStateToProps = (state) => {
  const { travelData, showModal, isAuthority, } = state.adminMaintainReducer;
  return {
    travelData, showModal, isAuthority,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getTravelData())
    },
    saveAuth(row, table){
      dispatch(actionCreators.travelSaveAuth(row, table))
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
      dispatch(actionCreators.addTravel(values))
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorityMaintain)