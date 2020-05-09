import React, { Component } from 'react';
import {  Select, Row, Col, Icon, DatePicker, Switch, TimePicker, Input, Radio  } from "antd";
import moment from 'moment';

const Option = Select.Option;
const format = 'HH:mm';
class Edit extends Component {
  state = {
    startValue: null,
    endValue: null,
  };
  /**
   * 限制时间填写
   */
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  /**
   * 切换时重置state
   */
  componentWillReceiveProps(props){
    if(this.props.category !== props.category){
      this.setState({startValue:null, endValue: null})
    }
  }
  render(){
    const { form:{ getFieldDecorator}, editData:{person,detail, category}, place = [] } = this.props;
    return(
      <div>
        <Row>
          <Col className="form-title" span="3">乘機人:</Col>
          <Col span="7">
            {getFieldDecorator('person_edit',{initialValue: person})(
              <Input size="small" />
            )}
          </Col>
        </Row>

        <Row>
          <Col className="form-title flight-select" span="3">航程類型:</Col>
          <Col span="7">
            <Radio.Group   defaultValue={category}>
              <Radio.Button disabled value="oneWay">單程</Radio.Button>
              <Radio.Button disabled value="twoWay">往返</Radio.Button>
              <Radio.Button disabled value="manyWay">多程</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <div className="items" >
          <Row>
            <Col className="form-title" span="3"></Col>
            <Col span="6">
              {getFieldDecorator('placeFrom_edit',{initialValue: detail.placeFromText})(
                <Select size="small" className="select" placeholder="出發機場">
                  {
                    place.map(v => (
                      <Option key={v.Code}>{v.Value}</Option>
                    ))
                  }
                </Select>
              )}
            </Col>
            <Col span="1" className="place-line">
              <Icon type="swap" />
            </Col>
            <Col span="7">
              {getFieldDecorator('placeTo_edit',{initialValue: detail.placeToText})(
                <Select size="small" className="select" placeholder="到達機場">
                  {
                    place.map(v => (
                      <Option key={v.Code}>{v.Value}</Option>
                    ))
                  }
                </Select>
              )}
            </Col>
          </Row>

          <Row>
            <Col className="form-title" span="3"></Col>
            <Col span="5">
              {getFieldDecorator('dateFrom_edit',{initialValue: moment(detail.dateFrom)})(
                <DatePicker 
                disabledDate={this.disabledStartDate}
                onChange={this.onStartChange}
                size="small" 
                placeholder="出發日期" />
              )}
            </Col>
            <Col span="4">
              {getFieldDecorator('timeFrom1_edit',{initialValue: moment(detail.timeFrom1, 'HH:mm')})(
                <TimePicker format={format} className="time" size="small" placeholder="起飛時間區間: 開始" />
              )}
            </Col>
            <Col className="form-title" span="1">~</Col>
            <Col span="4">
              {getFieldDecorator('timeTo1_edit',{initialValue: moment(detail.timeTo1, 'HH:mm')})(
                <TimePicker format={format} className="time" size="small" placeholder="起飛時間區間: 結束" />
              )}
            </Col>
            <Col className="form-title" span="2">交通車:</Col>
            <Col span="5">
              {getFieldDecorator('carNeed1_edit', { initialValue: detail.carNeed1 === 'Y'?true:false })(
                <Switch className="card-need1" size="small" />
              )}
            </Col>
          </Row>

          {
            category === 'twoWay' &&
            <Row>
              <Col className="form-title" span="3"></Col>
              <Col span="5">
                {getFieldDecorator('dateTo_edit', { initialValue: moment(detail.dateTo) })(
                  <DatePicker 
                  disabledDate={this.disabledEndDate}
                  onChange={this.onEndChange}
                  size="small" 
                  placeholder="返回日期" />
                )}
              </Col>
              <Col span="4">
                {getFieldDecorator('timeFrom2_edit', { initialValue: moment(detail.timeFrom2, 'HH:mm') })(
                  <TimePicker format={format} className="time" size="small" placeholder="返回時間區間: 開始" />
                )}
              </Col>
              <Col className="form-title" span="1">~</Col>
              <Col span="4">
                {getFieldDecorator('timeTo2_edit', { initialValue: moment(detail.timeTo2, 'HH:mm') })(
                  <TimePicker format={format} className="time" size="small" placeholder="返回時間區間: 結束" />
                )}
              </Col>
              <Col className="form-title" span="2">交通車:</Col>
              <Col span="5">
                {getFieldDecorator('carNeed2_edit', {initialValue: detail.carNeed1 === 'Y'?true:false })(
                  <Switch className="card-need" size="small" />
                )}
              </Col>
            </Row>
          }

        </div>
      </div>
    )
  }
}
  
export default Edit;