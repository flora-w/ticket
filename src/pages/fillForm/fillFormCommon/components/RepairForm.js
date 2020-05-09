import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Radio, Button, Icon, Input, DatePicker   } from "antd";
import { actionCreators } from "../store";
import { compose } from "../../../../utils";
// import hComponent from "../../components/hComponent";

import Flight from '../../components/flightSelect';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
class RepairForm extends Component {


  getFlightInfo = (value) => {
    this.props.getFlightInfo(value);
  }

componentWillUnmount(){
  this.props.resetAllState();
}

  render(){
    const { 
      form: {getFieldDecorator}, 
      showVisaDate,
      hanldAreaSelect,
      isAssistant,
      pageData
    } = this.props;
    const { 
      area,
      userInfo,
      peoples,
      flightPlace,
      chargeDept} = pageData;

     //区域
     const area_ = area.map(v => (<Radio value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Radio>));
     //挂账部门
    const chargeDept_ = chargeDept.map(v => (<Option value={v} key={v}>{v}</Option>));
     //航程数据
     const flightData = {peoples, flightPlace, userInfo};
    
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 8
      },
    };
    return(
      <Form onSubmit={this.handleSubmit}>    

        <FormItem
          {...formItemLayout}
          label="區域"
        >
          {getFieldDecorator('area', {
            rules: [{
              required: true, message: '請選擇區域',
            }],
          })(
            <RadioGroup onChange={hanldAreaSelect}>
             {area_}
            </RadioGroup>
          )}
        </FormItem>

        {
          showVisaDate && 
          <FormItem
            {...formItemLayout}
            label="簽證有效期"
          >
            {getFieldDecorator('visaDate', {
              rules: [{
                required: true, message: '請選擇簽證有效期',
              }],
            })(
              <DatePicker size="small" />
            )}
          </FormItem>
        }

        <Flight 
        form={this.props.form} 
        getFlightInfo={this.getFlightInfo} 
        isAssistant={isAssistant}
        pageData={flightData}/>

        <FormItem {...formItemLayout} label="掛賬部門">
        {getFieldDecorator('gz_dept', 
        {initialValue: chargeDept[0]},
        {
              rules: [{
                required: true, message: '請選擇掛賬部門',
              }],
            })(
              <Select>
                {chargeDept_}
              </Select>
            )}
      </FormItem>

      <FormItem {...formItemLayout} label="備註">
        {getFieldDecorator('mark', {
              rules: [{
                required: true, message: '請填寫備註',
              }],
            })(
              <TextArea />
            )}
      </FormItem>

      <FormItem {...formItemLayout} label=" " colon={false}>
        <Button type="primary" htmlType="submit">提交</Button>
      </FormItem>

      </Form>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { 
    showVisaDate,  
    flightInfo, 
    isAssistant,
    pageData
     } = state.fillFormReducer.fillFormCommonReducer;
  return{ 
    showVisaDate,  
    flightInfo, 
    isAssistant,
    pageData }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleFlightChange(e){
      dispatch(actionCreators.flightChange(e.target.value));
    },
    resetAllState(){
      dispatch(actionCreators.resetState());
    },
    hanldAreaSelect(e){
      dispatch(actionCreators.areaSelect(e.target.value));
    },
    getFlightInfo(value){
      dispatch(actionCreators.flightInfo(value))
    }

  }
}
// export default connect( mapStateToProps, mapDispatchToProps )( Form.create()(BusinessTripAndBack) );
export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  Form.create()
)(RepairForm);