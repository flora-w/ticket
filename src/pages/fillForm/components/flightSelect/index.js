import React, { Component} from 'react';
import { DatePicker, TimePicker, Row, Col,  Switch, Icon, Form, Select, Radio, Input, Modal, Button, message} from "antd";
import moment from 'moment';
import PropTypes from 'prop-types';
import ShowTicketInfor from "./showTicketInfor";

import './index.less'
import { empnoChange } from '../../fillFormCommon/store/actionCreators';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
let id = 1;

//航程地点
const places = (flightPlaces) => {
 return flightPlaces.map((v) => ( <Option value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Option>))
}
  //显示乘机人
const  showPeople = (people) => {
    if(people.length>0){
     return people.map((v, i) => (
        <Option value={v.ChName} key={v.ChName}>{v.ChName}</Option>
      ))
    }
    return null;
  }

const format = 'HH:mm';

class Time extends Component {
  state = {
    readOnly: true,
    time: ''
  }

  startTimeOnChange = (time, timeString) => {
    this.setState({time: timeString, readOnly: false})
  }

  getMin = () => {
    let time = this.state.time;
    if(time !== ''){
      let timeArr = time.split(':');
      let from = timeArr[0] * 60 + parseInt(timeArr[1]) - 150;
      from = from < 0? 20*60 + from : from;
      let to = timeArr[0] * 60 + parseInt(timeArr[1]) + 150;
      return {from, to};
    }
    return null;
  }

  range = ( type, currH ) => {
    // let m = this.getMin();
    // let hf = Math.floor(m.from / 60);
    // let ht = Math.floor(m.to / 60);
    // let mf = Math.floor(m.from % 60); 
    // let mt = Math.floor(m.to % 60);
    // let from = h - 2;
    // let to = h + 2;
    // let arrM = [];
    // //小時
    // let arrH = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    // if(hf > ht){
    //   arrH.slice(-arrH.indexOf(hf)-1);
    // }
    // arrH = arrH.slice(arrH.indexOf(h) - 1, arrH.indexOf(h) + 2);
    

    // //分鐘前後不能選
    // if(currH && (currH == from || currH == to)){
    //   for(let i=m; i<=60; i++){
    //     arrM.push(i);
    //   }
    //   for(let i=0; i<=m; i++){
    //     arrM.push(i)
    //   }
    // }

    // if(type === 'h'){
    //   return arrH;
    // }
    // if(type === 'm'){
    //   return arrM;
    // }
  }

  disabledHours = () => {
    // return this.range('h');
  }
  disabledMinutes = (currH) => {
    // return this.range('m', currH);
  }
  render(){
    const { id1, id2, form: {getFieldDecorator} } = this.props
    const { readOnly } = this.state; 
    const format = 'HH:mm';
    return(
      <div className="time-from-to-content">
        {getFieldDecorator(id1)(
              <TimePicker 
              placeholder="開始" 
              format={format}
              onChange={this.startTimeOnChange}/>
            )}
            {getFieldDecorator(id2)(
             <TimePicker 
             placeholder="結束" 
             disabled={readOnly}  
             format={format}
             disabledHours={this.disabledHours}
             disabledMinutes={this.disabledMinutes}/>
            )}
      </div>
    )
  }
}




//单程
const FlightOne = (props) => {
    const { getFieldDecorator } = props.form;
    const { k = 1, handleSwitcher, pageData: {peoples, flightPlace, userInfo} } = props;
    const formItems = (
      <Row>
        <Col offset="3">
          <Col span="4"  className="flight-one-1">
            <div className="flight-one-11">
              {getFieldDecorator('place_from' + k)(
                <Select placeholder="出發機場">
                   {places(flightPlace)}
                </Select>
              )}
              {getFieldDecorator('place_to' + k)(
                <Select placeholder="到達機場" >
                   {places(flightPlace)}
                </Select>
              )}

            </div>
            <div className="flight-one-switcher"><span onClick={() => handleSwitcher( k )}>換</span></div>
          </Col>
          <Col span="4" offset="2" className="flight-one-2">
            {getFieldDecorator('date_from' + k)(
              <DatePicker placeholder="出發日期" />
            )}
          </Col>
          <Col span="3" className="time-from-to-title">
            <span>起飛時間區間:&nbsp;&nbsp;&nbsp;</span>
          </Col>
          <Col span="4" className="time-from-to-content">
          {getFieldDecorator('time_from1_' + k)(
              <TimePicker format={format} placeholder="開始"/>
            )}
            {getFieldDecorator('time_from2_' + k)(
             <TimePicker format={format} placeholder="結束"/>
            )}
          </Col>
          
          <Col offset='1' span="4" className="car-need">
          <span span="3" >交通車安排:&nbsp;&nbsp;</span>
          {getFieldDecorator('car_need' + k, {valuePropName: 'checked', initialValue: false})(
              <Switch checkedChildren="有" unCheckedChildren="无"/>
            )}
          </Col>
          </Col>
      </Row>
    )
    return(
      formItems
    )
  }
    


//往返
const FlightTwo = (props) =>  {
  const { form: {getFieldDecorator}, handleSwitcher ,pageData: {peoples, flightPlace, userInfo} } = props;
    return(
      <Row>
        <Col offset="3">
        <Col span="4"  className="flight-one-1">
          <div className="flight-one-11">
            {getFieldDecorator('place_from')(
              <Select placeholder="出發機場">
                {places(flightPlace)}
              </Select>
            )}
            {getFieldDecorator('place_to')(
              <Select placeholder="到達機場" >
                 {places(flightPlace)}
              </Select>
            )}
          </div>
          <div className="flight-one-switcher"><span  onClick={() => handleSwitcher('')}>換</span></div>
        </Col>
        <Col span="4" offset="2" className="flight-one-2">
          {getFieldDecorator('date_from')(
            <DatePicker placeholder="出發日期"  format="YYYY-MM-DD"/>
          )}
          {getFieldDecorator('date_back')(
            <DatePicker placeholder="返回日期" format="YYYY-MM-DD"/>
          )}
        </Col>
        <Col span="3" className="time-from-to-title">
          <span>起飛時間區間:&nbsp;&nbsp;&nbsp;</span>
        </Col>
        <Col span="4" className="time-from-to-content">
          {getFieldDecorator('time_from1_')(
            <TimePicker format={format}  placeholder="開始" />
          )}
          {getFieldDecorator('time_from2_')(
           <TimePicker format={format} placeholder="結束"/>

          )}
        </Col>
        <Col offset='1' span="4" className="car-need">
          <span span="3" >交通車安排:&nbsp;&nbsp;</span>
          {getFieldDecorator('car_need',{valuePropName: 'checked', initialValue: false})(
              <Switch checkedChildren="有" unCheckedChildren="无"/>
            )}
          </Col>
        </Col>
      </Row>
    )
}


//多程
const FlightMany = (props) => {


  //添加航程
 const add = () => {
    const { form } = props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(++id);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
//刪除航程
const remove = (k) => {
  const { form } = props;
  const keys = form.getFieldValue('keys');
  form.setFieldsValue({
    keys: keys.filter(key => key !== k),
  });
}

  //顯示航程
  const showFlight = () => {
    const { getFieldDecorator, getFieldValue } = props.form;
    const {pageData: { flightPlace}} = props;
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    return keys.map((k, i)=> {
      return <div className="content" key={i}>
        <span className="order">{i+1}</span>
        <Row>
        <Col offset="3" className="content-info">
          <Col span="4" className="flight-one-1">
            <div className="flight-one-11">
              {getFieldDecorator('place_from' + k)(
                <Select placeholder="出發機場">
                  {places(flightPlace)}
                </Select>
              )}
              {getFieldDecorator('place_to' + k)(
                <Select placeholder="到達機場" >
                  {places(flightPlace)}
                </Select>
              )}

            </div>
            <div className="flight-one-switcher"><span onClick={() => props.handleSwitcher( k )}>換</span></div>
          </Col>
          <Col span="4" offset="2" className="flight-one-2">
            {getFieldDecorator('date_from' + k)(
              <DatePicker placeholder="出發日期" />
            )}
          </Col>
          <Col span="3" className="time-from-to-title">
            <span>起飛時間區間:&nbsp;&nbsp;&nbsp;</span>
          </Col>
          <Col span="4" className="time-from-to-content">
            {getFieldDecorator('time_from1_' + k)(
              <TimePicker format={format} placeholder="開始"/>
            )}
            {getFieldDecorator('time_from2_' + k)(
              <TimePicker format={format} placeholder="結束"/>
            )}
          </Col>
          <Col offset='1' span="4" className="car-need">
          <span span="3" >交通車安排:&nbsp;&nbsp;</span>
          {getFieldDecorator('car_need' + k, {valuePropName: 'checked', initialValue: false})(
              <Switch checkedChildren="有" unCheckedChildren="无"/>
            )}
          </Col>
        </Col>

      </Row>
        <span className="close" onClick={() => remove(k)}>
          <Icon type="close" />
        </span>
      </div>
    })
  }
    return(
      <div className="manyWay">
          {showFlight()}
          <Col offset="3">
            <div className="add" onClick={add}><Icon type="plus" />添加航程</div>
          </Col>
      </div>
    )
    
}

//当有助理代填时
const ShowPeopleInfo = ( {form:{getFieldDecorator}, onEmpnoChange, assistanApplyPeopleInfo} ) => {
  //乘機人姓名
  const peopleName = assistanApplyPeopleInfo.peopleNames.map(v => (
      <Option key={v} value={v}>{v}</Option>
    ))
//國籍
const nationality = assistanApplyPeopleInfo.nationality.map(v => (
  <Option key={v} value={v}>{v}</Option>
))
//證件類型
const certificateCategory = assistanApplyPeopleInfo.certificateCategory.map(v => (
  <Option key={v} value={v}>{v}</Option>
))

  return(
    <div>
      <Row className="row">
        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 乘車人工號:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('empno_a',
            {
              rules: [{ required: true, message: '請填寫乘機人工號' }],
            })(
              <Input onBlur={onEmpnoChange} />
            )}
        </Col>
        <Col span="5" className="assistant-titile"><span className="request-star">*</span>  乘車人姓名:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('person_a',
            {
              rules: [{ required: true, message: '乘機人姓名' }],
            })(
              <Select className="customer" >
               {peopleName}
              </Select>
            )}
        </Col>
      </Row>
      <Row className="row">
      <Col span="3" className="assistant-titile"><span className="request-star">*</span> 乘機人所在部門:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('dept_a',
            {initialValue: assistanApplyPeopleInfo.dept},
            {
              rules: [{ required: true, message: '乘機人所在部門' }],
            })(
              <Input disabled  />
            )}
        </Col>
        <Col span="5" className="assistant-titile"><span className="request-star">*</span>  掛賬部門:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('chargeDept_a',
          {initialValue: assistanApplyPeopleInfo.dept},
            {
              rules: [{ required: true, message: '請選擇掛賬部門' }],
            })(
              <Input />
            )}
        </Col>
      </Row>
      <Row className="row">
      <Col span="3" className="assistant-titile"><span className="request-star">*</span> 國籍:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('nationality_a',
            {
              rules: [{ required: true, message: '國籍' }],
            })(
              <Select className="customer" >
              {nationality}
              </Select>
            )}
        </Col>
        
        <Col span="5" className="assistant-titile"><span className="request-star">*</span>  手機:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('phone_a',
            {
              rules: [{ required: true, message: 'phone' }],
            })(
              <Input />
            )}
        </Col>
      </Row>
      <Row className="row">
        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 證件類型:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('zjCategory_a',
            {
              rules: [{ required: true, message: '證件類型' }],
            })(
              <Select className="customer" >
                {certificateCategory}
              </Select>
            )}
        </Col>
        <Col span="5" className="assistant-titile"><span className="request-star">*</span>  證件號:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('zjNo_a',
            {
              rules: [{ required: true, message: 'zjNo' }],
            })(
              <Input />
            )}
        </Col>
      </Row>
      <Row className="row">
        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 證件有效期:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('zjDate_a',
            {
              rules: [{ required: true, message: '證件有效期' }],
            })(
              <DatePicker placeholder="證件有效期" format="YYYY-MM-DD" />
            )}
        </Col>
      </Row>
    </div>
   
  )

}

//編輯
const Edit = ({editData, handleSwitcher, isAssistant, onEmpnoChange, assistanApplyPeopleInfo, pageData: {peoples, flightPlace, userInfo}, form: {getFieldDecorator}}) => {
  const formItemLayout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 6
    },
  };
  let peopleName = null, nationality = null, certificateCategory = null
  if(assistanApplyPeopleInfo){
     //乘機人姓名
   peopleName = assistanApplyPeopleInfo.peopleNames.map(v => (
    <Option key={v} value={v}>{v}</Option>
  ))
  //國籍
   nationality = assistanApplyPeopleInfo.nationality.map(v => (
    <Option key={v} value={v}>{v}</Option>
  ))
  //證件類型
   certificateCategory = assistanApplyPeopleInfo.certificateCategory.map(v => (
    <Option key={v} value={v}>{v}</Option>
  ))
  }
 
  return (
    <div className="flight-container">
    {
      isAssistant&&
      <div>
      <Row className="row">
        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 乘車人工號:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('empno_edit', { initialValue: editData.personInfo.empno },
            {
              rules: [{ required: true, message: '乘車人工號', }],
            })(
              <Input onBlur={onEmpnoChange} />
            )}
        </Col>
        <Col span="5" className="assistant-titile"><span className="request-star">*</span>  乘機人姓名:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('person_edit', { initialValue: editData.person },
            {
              rules: [{ required: true, message: '乘機人姓名' }],
            })(
              <Select className="customer" >
                {peopleName}
             </Select>
            )}
        </Col>
      </Row>
      <Row className="row">
      <Col span="3" className="assistant-titile"><span className="request-star">*</span> 乘機人所在部門:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('dept_edit',{ initialValue: editData.personInfo.dept },
            {
              rules: [{ required: true, message: '乘機人所在部門' }],
            })(
              <Input disabled  />
            )}
        </Col>
        <Col span="5" className="assistant-titile"><span className="request-star">*</span>  掛賬部門:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('chargeDept_edit',{ initialValue: editData.personInfo.chargeDept },
            {
              rules: [{ required: true, message: '請選擇掛賬部門' }],
            })(
              <Input />
            )}
        </Col>
      </Row>
      <Row className="row">
      <Col span="3" className="assistant-titile"><span className="request-star">*</span> 國籍:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('nationality_edit',{ initialValue: editData.personInfo.nationality },
            {
              rules: [{ required: true, message: '國籍' }],
            })(
              <Select className="customer" >
                {nationality}
              </Select>
            )}
        </Col>
        <Col span="5" className="assistant-titile"><span className="request-star">*</span>  手機:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('phone_edit',{ initialValue: editData.personInfo.phone },
            {
              rules: [{ required: true, message: 'phone' }],
            })(
              <Input />
            )}
        </Col>
      </Row>
      <Row className="row">
        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 證件類型:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('zjCategory_edit',{ initialValue: editData.personInfo.zjCategory },
            {
              rules: [{ required: true, message: '證件類型' }],
            })(
              <Select className="customer" >
                {certificateCategory}
              </Select>
            )}
        </Col>
        <Col span="5" className="assistant-titile"><span className="request-star">*</span>  證件號:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('zjNo_edit',{ initialValue: editData.personInfo.zjNo },
            {
              rules: [{ required: true, message: 'zjNo' }],
            })(
              <Input />
            )}
        </Col>
      </Row>
      <Row className="row">
        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 證件有效期:&nbsp;</Col>
        <Col span="5">
          {getFieldDecorator('zjDate_edit',{ initialValue: moment(editData.personInfo.zjDate) },
            {
              rules: [{ required: true, message: '證件有效期' }],
            })(
              <DatePicker placeholder="證件有效期" format="YYYY-MM-DD" />
            )}
        </Col>
      </Row>
    </div>
    }
    {
      !isAssistant&&
      <FormItem {...formItemLayout} label="乘機人">
        {getFieldDecorator('person_edit', { initialValue: editData.person },
          {
            rules: [{ required: true, message: '請選擇乘機人' }],
          })(
            <Select className="customer_edit" >
              {showPeople([...userInfo, ...peoples])}
            </Select>
          )}
      </FormItem>
    }
      <div className="flight">
        <Row>
          <Col offset="3">
            <Col span="4" className="flight-one-1">
              <div className="flight-one-11">
                {getFieldDecorator('place_from_edit', { initialValue: editData.data[0].placeFrom })(
                  <Select placeholder="出發機場">
                    {places(flightPlace)}
                  </Select>
                )}
                {getFieldDecorator('place_to_edit',  { initialValue: editData.data[0].placeTo })(
                  <Select placeholder="到達機場" >
                    {places(flightPlace)}
                  </Select>
                )}
              </div>
              <div className="flight-one-switcher"><span onClick={() => handleSwitcher('_edit')}>換</span></div>
            </Col>
            <Col span="4" offset="2" className="flight-one-2">
              {getFieldDecorator('date_from_edit',  { initialValue: moment(editData.data[0].dateFrom) })(
                <DatePicker placeholder="出發日期" format="YYYY-MM-DD" />
              )}
              {
                editData['category'] === 'twoWay' && getFieldDecorator('date_back_edit',  { initialValue: moment(editData.data[0].dateBack) })(
                  <DatePicker placeholder="返回日期" format="YYYY-MM-DD" />
                )
              }
              
            </Col>
            <Col span="3" className="time-from-to-title">
              <span>起飛時間區間:&nbsp;&nbsp;&nbsp;</span>
            </Col>
            <Col span="4" className="time-from-to-content">
              {getFieldDecorator('time_from1_edit', { initialValue: moment(editData.data[0].timeFrom, "HH:mm:ss") })(
                <TimePicker format={format} placeholder="開始" format="HH:mm:ss" />
              )}
              {getFieldDecorator('time_from2_edit', { initialValue: moment(editData.data[0].timeTo, "HH:mm:ss") })(
                <TimePicker format={format} placeholder="結束" format="HH:mm:ss" />
              )}
            </Col>
            <Col offset='1' span="4" className="car-need">
              <span span="3" >交通車安排:&nbsp;&nbsp;</span>
              {getFieldDecorator('car_need_edit', { valuePropName: 'checked', initialValue:editData.data[0].carNeed})(
                <Switch checkedChildren="有" unCheckedChildren="无" />
              )}
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  )
}

//调用
class Flight extends Component {

  //交換地點
  handleSwitcher =( k) => {
    const {  getFieldValue, setFieldsValue } = this.props.form;
    let place_from = getFieldValue('place_from'+k);
    let place_to = getFieldValue('place_to'+k);
    setFieldsValue({['place_from'+k]: place_to});
    setFieldsValue({['place_to'+k]: place_from})
  }

  //顯示航程
  showFlight = () => {
    const { form, category, isResign, pageData } = this.props;
    if(isResign){
      return <FlightOne form={form} pageData={pageData}  handleSwitcher={this.handleSwitcher}  />
    }
    if(category === 'oneWay'){
      return <FlightOne form={form} pageData={pageData}  handleSwitcher={this.handleSwitcher}  />
    }
    if(category === 'twoWay'){
      return <FlightTwo form={form} pageData={pageData} handleSwitcher={this.handleSwitcher}   />
    }
    if(category === 'manyWay'){
      return <FlightMany form={form} pageData={pageData} handleSwitcher={this.handleSwitcher}   />
    }
  }




  render(){
    const { 
      form: {getFieldDecorator}, 
      category,
      isEdit,
      isAssistant,
      editData,
      isResign,
      onEmpnoChange,
      assistanApplyPeopleInfo,
      pageData: {peoples, flightPlace, userInfo}
    } = this.props;
    
    const formItemLayout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 6
      },
    };
    if(isEdit){
      return <Edit 
        pageData={this.props.pageData}
        form={this.props.form}  
        handleSwitcher={this.handleSwitcher} 
        isEdit={isEdit} 
        editData={editData} 
        isAssistant={isAssistant}
        onEmpnoChange={onEmpnoChange} 
        assistanApplyPeopleInfo={assistanApplyPeopleInfo}/>
    }else{
      return(
        <div className="flight-container">
        {
          isAssistant&&
          <ShowPeopleInfo 
          form={this.props.form} 
          onEmpnoChange={onEmpnoChange}
          assistanApplyPeopleInfo={assistanApplyPeopleInfo}/>
        }
        {
          !isAssistant&&
          <FormItem {...formItemLayout} label="乘機人">
          {getFieldDecorator('person', 
          {
            rules: [{ required: true, message: '請選擇乘機人' }],
          })(
            <Select className="customer" >
              {showPeople([...userInfo,...peoples])}
            </Select>
          )}
        </FormItem>
        }
        {
          !isResign && 
          <FormItem {...formItemLayout} label=" " colon={false}>
          {getFieldDecorator('flightSelect', {
              initialValue: category,
              rules: [{ required: true, message: '請選擇航程類別' }],
            })(
            <RadioGroup  onChange={this.props.flightChange} disabled={isEdit}>
              <RadioButton value="oneWay" >單程</RadioButton>
              <RadioButton value="twoWay">往返</RadioButton>
              <RadioButton value="manyWay">多程</RadioButton>
            </RadioGroup>
            )}
        </FormItem>
        }
          
          <div className="flight">
            {this.showFlight()}
          </div>
        </div>
      )
    }
  }
   
}


class FlightSelect extends Component {
state ={
  flightVisible: false,
  category: 'twoWay',
  isEdit: false,
  editData: {},
  flightInfo: [],
  flag: 150
}

  //获取分钟
  getMins(time){
    if(typeof time === 'number'){
      return (time * 60);
    }else{
      let arr = time.split(':');
      let m = arr[0] * 60 + parseInt(arr[1]);
      return m;
    }
  }

  //判断时间相差
  checkTime = (f, t, flag) => {
    let mf = this.getMins(f);
    let mt = this.getMins(t);
    let m24 = this.getMins(24);
    let m24q = m24 - mf;
    if( mf < mt && (mt - mf < flag) ){
      return false;
    }
    if( mf > mt && (m24q + mt < flag) ){
      return false;
    }
    return true;
  }

//显示弹出层
  handleShowFlight(){
    this.setState({flightVisible: true, category: 'twoWay'}, () => {this.props.form.setFieldsValue({'flightSelect': 'twoWay'})});
  }

  //航程选择
  handleFlightChange = (e) =>{
    this.setState({ category: e.target.value})
  }
  //点击确定
  handleFlightOk = ({ getFieldValue, resetFields }) => {
    const flag = this.state.flag;
    let {flightVisible,isEdit, flightInfo} = this.state;
    const isAssistant = this.props.isAssistant;
    let error = false;
    let k = 1;
    let person = getFieldValue('person');
    const category = getFieldValue('flightSelect');
    let placeFrom, placeTo, dateFrom, timeFrom, timeTo, carNeed, arr, obj, dateBack = '', personInfo;
    let empno,nationality,chargeDept,dept,phone,zjCategory,zjNo,zjDate;
    
    //區分編輯和新增
    if(!isEdit){
      //助理代填時
    if(isAssistant){
      person = getFieldValue('person_a');
       empno = getFieldValue('empno_a');
       nationality = getFieldValue('nationality_a');
       chargeDept = getFieldValue('chargeDept_a');
       dept = getFieldValue('dept_a');
       phone = getFieldValue('phone_a');
       zjCategory = getFieldValue('zjCategory_a');
       zjNo = getFieldValue('zjNo_a');
       zjDate = getFieldValue('zjDate_a') && getFieldValue('zjDate_a').format('YYYY-MM-DD');
     personInfo = {empno, nationality, chargeDept, dept, phone, zjCategory, zjNo, zjDate};
     arr = [empno, nationality, chargeDept, dept, phone, zjCategory, zjNo, zjDate];
     for (let item of arr) {
       if(!item){ error = true; message.warning('請填寫完整信息'); return;}  //判斷是否有未填寫的
     }
   }else{
     personInfo = {};
   }
      if(category === 'twoWay'){k = '';}
      //單程和往返
      if(category === 'twoWay' || category === 'oneWay'){
          placeFrom = getFieldValue(`place_from${k}`);
          placeTo = getFieldValue('place_to'+k);
          dateFrom = getFieldValue('date_from'+k)?getFieldValue('date_from'+k).format('YYYY-MM-DD'):'';
        if(category === 'twoWay'){
            dateBack = getFieldValue('date_back'+k)?getFieldValue('date_back'+k).format('YYYY-MM-DD'):'';
        }else{
            dateBack = '无';
        }
          timeFrom = getFieldValue('time_from1_'+k)? getFieldValue('time_from1_'+k).format('HH:mm:ss'):'';
          timeTo = getFieldValue('time_from2_'+k)?getFieldValue('time_from2_'+k).format('HH:mm:ss'):'';
          carNeed = getFieldValue('car_need'+k);
          arr = [person, placeFrom, placeTo, dateFrom, dateBack, timeTo, timeFrom];
        for (let item of arr) {
          if(!item){ error = true; break;}  //判斷是否有未填寫的
        }
        if(timeTo&&timeFrom && !this.checkTime(timeFrom, timeTo, flag)){
          message.warning('時間區間必須大於等於'+ (flag/60).toFixed(2) + '小時');
          return;
        }
        if(error){
          message.warning('請填寫完整信息');
          return;
        }else{
          obj = {
            person,
            category,
            personInfo,
            data: [{placeFrom, placeTo, dateFrom, dateBack, timeFrom, timeTo, carNeed}]
          };
        }
      }else{
        let flightArr = [];
        let keys = getFieldValue('keys');
        for(let i=0; i<keys.length; i++){
          placeFrom = getFieldValue(`place_from${keys[i]}`);
          placeTo = getFieldValue('place_to'+keys[i]);
          dateFrom = getFieldValue('date_from'+keys[i])?getFieldValue('date_from'+keys[i]).format('YYYY-MM-DD'):'';
          dateBack = '无';
          timeFrom = getFieldValue('time_from1_'+keys[i])? getFieldValue('time_from1_'+keys[i]).format('HH:mm:ss'):'';
          timeTo = getFieldValue('time_from2_'+keys[i])?getFieldValue('time_from2_'+keys[i]).format('HH:mm:ss'):'';
          carNeed = getFieldValue('car_need'+keys[i]);
          arr = [person, placeFrom, placeTo, dateFrom, dateBack, timeTo, timeFrom];
          for (let item of arr) {
            if(!item){ error = true; break;}  //判斷是否有未填寫的
          }
          if(error){
            obj = {};
            message.warning('請填寫完整信息');
            return;
          }else{
            obj = {placeFrom, placeTo, dateFrom, dateBack, timeFrom, timeTo, carNeed};
          flightArr = [...flightArr, obj];
        }
      }
      if(!error){
        obj = { person, category, personInfo, data: flightArr };
        
      }
    }
    
    flightInfo = [...flightInfo, obj];
    flightVisible = false;
    this.setState({flightInfo,flightVisible}, () => this.props.getFlightInfo(flightInfo));
    }else{
      person = getFieldValue('person_edit');
        //助理代填時
    if(isAssistant){
       person = getFieldValue('person_edit');
       empno = getFieldValue('empno_edit');
       nationality = getFieldValue('nationality_edit');
       chargeDept = getFieldValue('chargeDept_edit');
       dept = getFieldValue('dept_edit');
       phone = getFieldValue('phone_edit');
       zjCategory = getFieldValue('zjCategory_edit');
       zjNo = getFieldValue('zjNo_edit');
       zjDate = getFieldValue('zjDate_edit') && getFieldValue('zjDate_edit').format('YYYY-MM-DD');
     personInfo = {empno, nationality, chargeDept, dept, phone, zjCategory, zjNo, zjDate};
     arr = [empno, nationality, chargeDept, dept, phone, zjCategory, zjNo, zjDate];
     for (let item of arr) {
       if(!item){ error = true; message.warning('請填寫完整信息'); return;}  //判斷是否有未填寫的
     }
   }else{
     personInfo = {};
   }
      let {editData} = this.state;
      let {i, k} = editData;
      //edit
      placeFrom = getFieldValue(`place_from_edit`);
      placeTo = getFieldValue('place_to_edit');
      dateFrom = getFieldValue('date_from_edit')?getFieldValue('date_from_edit').format('YYYY-MM-DD'):'';
    if(editData.category === 'twoWay'){
        dateBack = getFieldValue('date_back_edit')?getFieldValue('date_back_edit').format('YYYY-MM-DD'):'';
    }else{
        dateBack = '无';
    }
      timeFrom = getFieldValue('time_from1_edit')? getFieldValue('time_from1_edit').format('HH:mm:ss'):'';
      timeTo = getFieldValue('time_from2_edit')?getFieldValue('time_from2_edit').format('HH:mm:ss'):'';
      carNeed = getFieldValue('car_need_edit');
      arr = [person, placeFrom, placeTo, dateFrom, dateBack, timeTo, timeFrom, carNeed];
    for (let item of arr) {
      if(item === ''){ error = true; break;}  //判斷是否有未填寫的
    }
    if(error){
      message.warning('請填寫完整信息');
      return;
    }else{
      flightInfo[i].data[k] = {placeFrom, placeTo, dateFrom, dateBack, timeFrom, timeTo, carNeed};
      obj = {
        person,
        category: editData.category,
        personInfo,
        data: flightInfo[i].data
      };
    }

     flightInfo[i] = obj;
     flightVisible = false;
     isEdit = false;
     editData = {};
     this.setState({flightInfo, flightVisible, isEdit, editData}, () => this.props.getFlightInfo(flightInfo))
    }
       resetFields(['person', 'place_from', 'place_to', 'date_from', 'date_back', 'time_from1_', 'time_from2_', 'empno', 'nationality', 'chargeDept', 'dept', 'phone', 'zjCategory', 'zjNo', 'zjDate']);//重置表單輸入項
  }
//点击取消
  handleCancel = (form) => {
    form.resetFields(['person', 'place_from', 'place_to', 'date_from', 'date_back', 'time_from1_', 'time_from2_', 'flightSelect']);//重置表單輸入項
    this.setState({
      flightVisible: false,
      isEdit: false,
      category: 'twoWay'
    })
  }
//删除
  handleDelete = (i, k, category) => {
    let { flightInfo } = this.state;
    if(category === 'manyWay'){
      flightInfo[i].data.splice(k, 1);
      if(flightInfo[i].data.length === 0){
        flightInfo.splice(i, 1);
      }
    }else{
      flightInfo.splice(i, 1);
    }
    this.setState({flightInfo}, () => this.props.getFlightInfo(flightInfo));
  }
//编辑
  handleEdit = (i, k) => {
    let { flightInfo, isEdit, category, flightVisible } = JSON.parse(JSON.stringify(this.state));
    let editData = flightInfo[i];
    if(this.props.onEmpnoChange){
      this.props.onEmpnoChange(editData.personInfo.empno); //獲取乘機人信息
    }
    
    editData.data = [editData.data[k]];
    editData.i = i;
    editData.k = k;
    editData.person = flightInfo[i].person;
    editData.personInfo = flightInfo[i].personInfo;
    isEdit = true;
    editData = editData; 
    category = editData.category;
    flightVisible = true;
    this.setState({ isEdit, editData, category, flightVisible});
  }
  
  render(){
    const { flightVisible, category, isEdit, editData, flightInfo} = this.state;
    const {form, 
      isAssistant=false, 
      isResign=false, 
      onEmpnoChange = null, 
      assistanApplyPeopleInfo = null,
      pageData} = this.props;
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 8
      },
    };
    return (
      <div>
        <FormItem {...formItemLayout} label="航程選擇">
              <Button icon="plus-circle" type="primary" onClick={this.handleShowFlight.bind(this, form)} size="small">新增</Button>
        </FormItem>
        <Modal
              title="航程選擇"
              visible={flightVisible}
              onOk={this.handleFlightOk.bind(this, form)}
              onCancel={this.handleCancel.bind(this, form)}
              width={1000}
              okText="確定"
              cancelText="取消"
            >
              <Flight 
              pageData={pageData}
              form={form} 
              category={category} 
              flightChange={this.handleFlightChange} 
              isEdit={isEdit} 
              editData={editData}  
              isAssistant={isAssistant}
              isResign={isResign}
              onEmpnoChange={onEmpnoChange}
              assistanApplyPeopleInfo={assistanApplyPeopleInfo}
              />
        </Modal>
        <ShowTicketInfor
          pageData={pageData.flightPlace}
          deleteInfo={this.handleDelete}
          editInfo={this.handleEdit}
          flightInfo={flightInfo}
          isAssistant={isAssistant}
        /> 
      </div>
    )
  }
  
}
  
export default  FlightSelect;


