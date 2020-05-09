import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button ,Table} from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/index';
import Upload from '../../../components/upload'


class CompanyMaintain extends Component  {

  state = {
    columns:[
      {title: '航空公司名', dataIndex: 'Name',align:'center',edit:true,type:'input'},
      {title: '代號', dataIndex: 'Code',align:'center',edit:true,type:'input'},
    ],
    authModalPageData:[
      {title: '代碼', id: 'Code', type: 'input'},
      {title: '航空公司名', id: 'Name', type: 'input'},
    ],
  }
  componentDidMount(){
    this.props.getPageData();
  }
  
  render(){
    const { handleShowModalClick, showModal, addAuthOk, handleHideModalClick, airlineCompanyData ,haneleEdit,saveAuth} = this.props;
    const { columns,authModalPageData} = this.state;
    return (
      <div>
        {
          !this.props.isAuthority && 
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="航空公司維護">
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
              tableData={airlineCompanyData}
              columns={columns}
              saveAuth={saveAuth}
              scroll={{x:300}}
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
  const { airlineCompanyData ,isAuthority ,showModal } = state.adminMaintainReducer;
  return {
    airlineCompanyData, isAuthority ,showModal
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getAirlineCompanyData())
    },
    saveAuth(row, table){
      dispatch(actionCreators.airlineCompanyEdit(row))
    },
    handleShowModalClick(){
      this.refs.abc.resetFields();
      dispatch(actionCreators.showModal())
    },
    handleHideModalClick(){
      dispatch(actionCreators.hideModal())
    },
    haneleEdit(record,e){
        dispatch(actionCreators.airlineCompanyEdit(record))
    },
    addAuthOk(values){
      dispatch(actionCreators.airlineCompanyAdd(values))
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
      dispatch(actionCreators.changeBtnState(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyMaintain)