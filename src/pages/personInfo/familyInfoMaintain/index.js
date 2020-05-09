import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Card, Divider, Popconfirm } from "antd";
import PeopleInfo from "../components/peopleInfo";
import AddNewPeople from "./components/addNewPeople";
import NoAuthority from '../../../commonPages/noAuthority/index';


import './index.less'

class FamilyInfoMaintain extends Component {

componentDidMount(){
  this.props.getPageData(this.props.history)
}
  render(){
    const { familyData, deleteFamilyInfo, baseInfo, handleEdit } = this.props;
    const columns1 = [
      {title: '姓名', dataIndex: 'name'},
      {title: '性別', dataIndex: 'sex'},
      {title: '關係', dataIndex: 'relationship'},
      {
        render: (text, record, index) => (
          <span>
            <a href="javascript:;" onClick={() => handleEdit({...record, index})}>編輯</a>
            <Divider type="vertical" />
            <Popconfirm 
            title="確定要刪除嗎?" 
            onConfirm={() => deleteFamilyInfo(baseInfo, record)} 
            onCancel={null} 
            okText="是" 
            cancelText="否">
            <a href="javascript:;">刪除</a>
            </Popconfirm>
          </span>
        ),
      },
    ]
    const columns2 = [
      {title: '證件類型',dataIndex: 'CertType',align:"center"}, 
      {title: '證件編號',dataIndex: 'CertNO',align:"center"},
      {title: '有效期',dataIndex: 'CertValidTime',align:"center"}, 
      {title: '簽注有效期',dataIndex: 'SignValidTime',align:"center"}, 
      {title: '入臺許可證有效期',dataIndex: 'TaiwanValidTime',align:"center"}, 
    ]
    return(
      <div>
        {!this.props.isAuth && <NoAuthority></NoAuthority>}
        {this.props.isAuth &&
          <Card className="family-info-maintain" title="眷屬信息">
            <AddNewPeople
              width={900}
            />
            <br/>
            <PeopleInfo
              data={familyData}
              columns1={columns1}
              columns2={columns2}
              rowKey1='name'
              rowKey2='CertType'
            />
          </Card>

        }
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { familyData, baseInfo , isAuth} = state.personInfoReducer.familyInfoMaintain;
  return{familyData, baseInfo ,isAuth}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(history){
      dispatch(actionCreators.getPageData(history))
    },
    deleteFamilyInfo(baseInfo, data){
      dispatch(actionCreators.deleteFamilyInfo(baseInfo, data))
    },
    handleEdit(data){
      dispatch(actionCreators.edit(data))
    }
  }
}
export default withRouter(connect( mapStateToProps, mapDispatchToProps )( FamilyInfoMaintain ))