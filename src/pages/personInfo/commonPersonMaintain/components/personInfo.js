import React, { Component } from 'react';
import { Row, Col, Select, Input } from "antd";
import { connect } from 'react-redux';
import { actionCreators } from "../store";

const Option = Select.Option;

class PersonInfo extends Component {
  render(){
    const { form: {getFieldDecorator}, addPersonPageData:{country}, baseInfo, editData } = this.props;
    const country_ = country.map(({Value}) => (<Option value={Value} key={Value}>{Value}</Option>))
    const style = {width: 100};
    const showEditInfo = {
      empno_edit: editData.LinkEmpNo || null, 
      name_edit: editData.LinkChName || null, 
      sex_edit: editData.LinkSex || null,
      nationality_edit: editData.Country || null,
      phone_edit: editData.Phone || null
    }
    if(baseInfo){
      return(
        <div>
          <Row>
            <Col span="7">
              <b>工號:</b>
              {getFieldDecorator('empno', {initialValue: showEditInfo.empno_edit})(
                <Input size="small" style={style} />
              )}
            </Col>
            <Col span="7">
              <b>姓名:</b> 
              {getFieldDecorator('chName', {initialValue: showEditInfo.name_edit})(
                <Input size="small" style={style} />
              )}
            </Col>
            <Col span={7}>
              <b>手機號:</b>
              {
                getFieldDecorator('Phone', {initialValue: showEditInfo.phone_edit})(
                <Input size="small" style={style} />
              )
              }
            </Col>
          </Row>
          <Row>
            <Col span="7">
              <b>性別:</b>
              {getFieldDecorator('sex', {initialValue: showEditInfo.sex_edit})(
                <Select size="small" style={style}>
                 <Option value='M'>男</Option>
                 <Option value='F'>女</Option>
               </Select>
              )}
            </Col>
            <Col span="7">
              <b>國籍:</b>
              {getFieldDecorator('nationality', {initialValue: showEditInfo.nationality_edit})(
                <Select size="small" style={style}>
                 {country_}
               </Select>
              )}
            </Col>
          </Row>
        </div>
      )
    }else{
      return null
    }
    
  }
}
  
const mapStateToProps = ( state ) => {
  const { addPersonPageData, baseInfo, isEdit, editData } = state.personInfoReducer.commonPeopleMaintain;
  return{
    addPersonPageData,
    baseInfo,
    isEdit,
    editData
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{}
}
export default connect( mapStateToProps, mapDispatchToProps )( PersonInfo )