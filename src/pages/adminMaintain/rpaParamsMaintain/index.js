import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button ,Table} from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/index';
import Upload from '../../../components/upload'


class RpaParamsMaintain extends Component  {

  state = {
    columns:[
      {title: '名稱', dataIndex: 'Name',align:'center'},
      {title: '費用', dataIndex: 'Value',align:'center',edit:true,type:'input'},
    ],
  }
  componentDidMount(){
    this.props.getPageData();
  }
  
  render(){
    const {  addAuthOk, rpaData ,saveAuth} = this.props;
    const { columns,authModalPageData} = this.state;
    return (
      <div>
        {
          !this.props.isAuthority && 
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="爬網維護">

            <AuthMaintainTable 
              tableData={rpaData}
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
  const { rpaData ,isAuthority ,showModal } = state.adminMaintainReducer;
  return {
    rpaData, isAuthority ,showModal
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getNetPageData())
    },
    saveAuth(row, table){
      dispatch(actionCreators.editGetNetData(row))
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RpaParamsMaintain)