import React, { Component } from 'react';
import { Row, Col, Select, Input } from "antd";
import { connect } from 'react-redux';
import { actionCreators } from "../store";

const Option = Select.Option;

class PersonInfo extends Component {
  render(){
    const { form: {getFieldDecorator}, handleFamilyChange, addPersonPageData:{relation}, baseInfo, editData } = this.props;
    const relation_ = relation&& relation.map(({Value}) => (<Option value={Value} key={Value}>{Value}</Option>))
    const style = {width: 100};
    const showEditInfo = {
      relation_edit: editData.relationship || null, 
      familyName_edit: editData.name || null, 
      sex_edit: editData.sex || null
    }
    return(
      <div>
        <Row>
          <Col span="7"><b>工號:</b> <span>{baseInfo.Empno}</span></Col>
          <Col span="7"><b>姓名:</b> <span>{baseInfo.ChName}</span></Col>
          <Col span="7"><b>部門:</b> <span>{baseInfo.Deptcode}</span></Col>
        </Row>
        <Row>
          <Col span="7">
            <b>關係:</b>
            {getFieldDecorator('relation', {initialValue: showEditInfo.relation_edit})(
              <Select size="small" style={style}>
                {relation_}
              </Select>
            )}
          </Col>
          <Col span="7">
            <b>眷屬姓名:</b>
            {getFieldDecorator('familyName', {initialValue: showEditInfo.familyName_edit})(
              <Input size="small" onChange={handleFamilyChange} style={style} />
            )}
          </Col>
          <Col span="7">
            <b>性別:</b>
            {getFieldDecorator('sex', {initialValue: showEditInfo.sex_edit})(
              <Select size="small" style={style}>
               <Option value='M'>男</Option>
               <Option value='F'>女</Option>
             </Select>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { addPersonPageData, baseInfo, isEdit, editData } = state.personInfoReducer.familyInfoMaintain;
  return{
    addPersonPageData,
    baseInfo,
    isEdit,
    editData
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleFamilyChange(e){
      dispatch(actionCreators.familyChange(e.target.value))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( PersonInfo )