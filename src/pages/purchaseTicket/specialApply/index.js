import React, { Component } from 'react';
import { connect } from 'react-redux';
import {actionCreators} from "./store"
import {withRouter} from 'react-router-dom';
import {Form, Row, Col, Tag, Radio, DatePicker, Button, Input} from "antd";
import { compose, showNotification } from "../../../utils";
import TravelType from '../springFestivalApply/components/travelType'
import OneByOne from '../components/onebyone';
import ShowPersonInfo from '../components/showPersonInfo';
import ShowTripInfo from '../components/showTripInfo';
import './index.less';

const FormItem = Form.Item,
      RadioGroup = Radio.Group,
      TextArea = Input.TextArea;
class SpecialApply extends Component {
  constructor(props){
    super(props);
    this.state = {
      labelStyle: {marginLeft: 24, color: 'rgba(0,0,0,.85)'},
      formItemLayout: {
        labelCol: {
          span: 3,
        },
        wrapperCol: {
          span: 20
        },
      }
    }
  }
  getFlightInfo = (value) => {
      this.props.getFlightInfo(value);
  }
  
  componentDidMount() {
    this.props.getPageData()
  }

  componentWillUnmount(){
    this.props.resetAllState();
  }
  render(){
    const { form, form: {getFieldDecorator}, baseInfo, hanldAreaSelect, showVisaDate, location, getJourneyData, personType, place, airport, submitTime, handleAddPerson, getFrequentContacts, frequentContacts, currentContacts, handleOptionChange, handleSubmit, personInfo, getFlyType, loading, handleDeletePerson, TripType, journeyData
    }= this.props
    const { labelStyle, formItemLayout } = this.state;
    
    return(
      <div className="apply-form-SpecialApply">
      <Row className="row-person-info">
          <Col span="1"></Col>
          <Col className="info-title" span="6" >填單人工號 <Tag color="cyan">{baseInfo.Empno}</Tag></Col>
          <Col className="info-title" span="4" >姓名 <Tag color="cyan">{baseInfo.ChName}</Tag></Col>
          <Col className="info-title" span="3" >部門 <Tag color="cyan">{baseInfo.Deptcode}</Tag></Col>
          <Col className="info-title" span="3"></Col>
        </Row>
        <Form onSubmit={handleSubmit.bind(this,form, this.props.history)}>
          <FormItem {...formItemLayout} label="類別">
              {getFieldDecorator('category', {
                  initialValue: personType.length > 0 ? personType[0].Code : '',
                  rules: [{
                      required: true, message: '請選擇類別',
                  }],
              })(
                  <RadioGroup >
                      {
                        personType.map(v=> (
                          <Radio value={v.Code} key={v.Code}>{v.Name}</Radio>
                        ))
                      }
                  </RadioGroup>
              )}
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="區域"
          >
              {getFieldDecorator('area', {
                  initialValue: place.length > 0 ? place[0].Code : '',
                  rules: [{
                      required: true, message: '請選擇區域',
                  }],
              })(
                  <RadioGroup onChange={hanldAreaSelect}>
                      {
                        place.map( v => (
                          <Radio value={v.Code} key={v.Code}>{v.Value}</Radio>
                        ))
                      }
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
                      <DatePicker size="defalute" />
                  )}
              </FormItem>
          }
          <TravelType 
              style={{...labelStyle}}  
              airport={airport}
              location={location}
              getJourneyData={getJourneyData}
              submitTime={submitTime}
              isSpecial={true}
              getType={getFlyType}
            />
          {
            journeyData.length > 0 &&
            <ShowTripInfo 
                tripType={TripType}
                data={journeyData}
              />
          }
          <Row>
            <Col span={24}>
              <label htmlFor="" style={{...labelStyle}}>新增乘機人信息:</label>
            </Col>
            <OneByOne 
                handleAddPerson={handleAddPerson} 
                getFrequentContacts={getFrequentContacts}
                frequentContacts={frequentContacts}
                currentContacts={currentContacts}
                handleOptionChange={handleOptionChange}
              />
          </Row>
          {
            personInfo.length > 0 &&
            <ShowPersonInfo 
              data={personInfo}
              handleDelete={handleDeletePerson}
            />}
          <FormItem
              {...formItemLayout}
              label="備注"
          >
              {getFieldDecorator('Remark')(
                  <TextArea autosize={{minRows:3, maxRows: 8}}/>
              )}
          </FormItem>
          <FormItem {...formItemLayout} label=" " colon={false}>
            <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => {
  const {
    baseInfo,
    showVisaDate,
    isAssistant,
    personType,
    place,
    airport,
    submitTime,
    frequentContacts,
    currentContacts,
    personInfo,
    loading,
    TripType,
    journeyData
  } = state.fillFormReducer.specialApplyReducer;
  return {
    baseInfo,
    showVisaDate,
    isAssistant,
    personType,
    place,
    airport,
    submitTime,
    frequentContacts,
    currentContacts,
    personInfo,
    loading,
    TripType,
    journeyData
  }

}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData() {
      dispatch(actionCreators.getPageData());
    },
    getFlyType(type) {
      dispatch(actionCreators.saveTripType(type))
    },
    getFrequentContacts({LinkChName}) {
      dispatch(actionCreators.getFrequentContacts(LinkChName));
    },
    handleOptionChange(id) {
      dispatch(actionCreators.changeFrequentContact(id))
    },
    // handleCategoryChange(e){
    //   dispatch(actionCreators.categoryChange(e.target.value));
    // },
    hanldAreaSelect(e){
      dispatch(actionCreators.chooseForegin(e.target.value))
    },
    handleDeletePerson(id) {
      dispatch(actionCreators.getDeleteId(id));
    },
    handleAddPerson(form, e) {
      e.preventDefault();
      const data = form.getFieldsValue()
      let index = 0, values = Object.values(data);
      for(let i = 0, len = values.length; i< len; i++) {
        if(values[i]) {
          index++;
        }
      }
      if(index < 9) {
        showNotification({type: 'warning', message: '新增失敗', description: '新增人員信息不完整'})
        return 
      }
      dispatch(actionCreators.addFrequentContact(data))
      form.resetFields(['LinkEmpNo']);
    },
    getJourneyData(data) {
      dispatch(actionCreators.saveJourneyData(data))
    },
    handleSubmit(form,history, e){
      e.preventDefault();
      dispatch(actionCreators.submit(form.getFieldsValue(), history))
    },
    resetAllState(){
      dispatch(actionCreators.resetState());
    },
  }
}

export default compose(
  withRouter,
  connect( mapStateToProps, mapDispatchToProps ),
  Form.create()
)(SpecialApply);