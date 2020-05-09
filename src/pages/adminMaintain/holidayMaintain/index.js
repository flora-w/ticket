import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button ,Table} from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/index';

  let a = null;
class HolidayMaintain extends Component  {

  state = {
    columns:[
      {title: '假期開始時間', dataIndex: 'Code',align:'center'},
      {title: '假期結束時間', dataIndex: 'Name',align:'center'},
      {title:'狀態',dataIndex:'State',align:'center',edit:true,editType:'SWITCH'}
    ],
    authModalPageData:[
      {title: '假期開始時間', id: 'Code', type: 'DATEPICKER'},
      {title: '假期開始時間', id: 'Name', type: 'DATEPICKER'},
    ],
  }
  componentDidMount(){
    this.props.getPageData();
  }
  
  render(){
    const { handleShowModalClick, showModal, addAuthOk, handleHideModalClick, holidayData ,saveAuth} = this.props;
    const { columns,authModalPageData} = this.state;
    return (
      <div>
        {
          !this.props.isAuthority && 
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="假期維護">
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
              tableData={holidayData}
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
  const { holidayData ,isAuthority ,showModal } = state.adminMaintainReducer;
  return {
    holidayData, isAuthority ,showModal
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getHolidayData())
    },
    saveAuth(row){
      dispatch(actionCreators.editHoliday(row))
    },
    handleShowModalClick(){
      this.refs.abc.resetFields();
      dispatch(actionCreators.showModal())
    },
    handleHideModalClick(){
      dispatch(actionCreators.hideModal())
    },
    addAuthOk(values){
      dispatch(actionCreators.addHoliday(values))
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
      dispatch(actionCreators.changeBtnState(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HolidayMaintain)