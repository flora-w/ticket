import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Radio, Button, Upload,  Input, DatePicker, Icon  } from "antd";
import { actionCreators } from "../store";
import { compose } from "../../../../utils";
// import hComponent from "../../components/hComponent";

import Flight from '../../components/flightSelect';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
class Resign extends Component {


  getFlightInfo = (value) => {
    this.props.getFlightInfo(value);
  }

componentWillUnmount(){
  this.props.resetAllState();
}

  render(){
    const { 
      form: {getFieldDecorator}, 
      handleCategoryChange,
      showVisaDate,
      hanldAreaSelect,
      isAssistant,
      pageData
    } = this.props;
    const { 
      danhao,
      area,
      userInfo,
      peoples,
      flightPlace,
      lz_gr_zdItem,
      chargeDept} = pageData;
       //类别
    const category_ = lz_gr_zdItem.map(v => (<Radio value={v.parmCode} key={v.parmCode}>{v.parmValue}</Radio>));
    //区域
    const area_ = area.map(v => (<Radio value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Radio>));
     //返台述职单号
    const danhao2_ = danhao.FanTai && danhao.FanTai.map(v => (<Option value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Option>));
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
          label="類別"
        >
          {getFieldDecorator('category', {
            rules: [{
              required: true, message: '請選擇類別',
            }],
          })(
            <RadioGroup onChange={handleCategoryChange}>
              {category_}
            </RadioGroup>
          )}
        </FormItem>
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
        isResign={true}
        pageData={flightData}/>

        <FormItem {...formItemLayout} label="上傳附件">
        {getFieldDecorator('gz_dept', {
              rules: [{
                required: true, message: '請上傳附件',
              }],
            })(
            <Upload 
            name= 'file'

            >
              <Button>
                <Icon type="upload" /> 點擊上傳
              </Button>
            </Upload>
            )}
      </FormItem>

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
    showCc_formid, 
    showFtsz_formid, 
    showOther, 
    showFiveUpload, 
    showVisaDate,  
    flightInfo, 
    isAssistant,
    showFtszNameAndRelationship,
    pageData } = state.fillFormReducer.fillFormCommonReducer;
  return{ 
    showCc_formid, 
    showFtsz_formid, 
    showOther, 
    showFiveUpload, 
    showVisaDate,  
    flightInfo, 
    isAssistant,
    showFtszNameAndRelationship,
    pageData }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleFlightChange(e){
      dispatch(actionCreators.flightChange(e.target.value));
    },
    handleCategoryChange(e){
      dispatch(actionCreators.categoryChange(e.target.value));
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
)(Resign);