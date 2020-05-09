import React, { Component } from 'react';
import {  Select, Row, Col, Icon, DatePicker, Switch, TimePicker  } from "antd";
import moment  from 'moment'

const Option = Select.Option;
const format = 'HH:mm';
class FlightItem extends Component {
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
    const { form:{ getFieldDecorator}, category, place } = this.props;
    return(
      <div className="items" >
        <Row>
          <Col className="form-title"  span="3"></Col>
          <Col span="6">
            {getFieldDecorator('placeFrom')(
                 <Select size="small" className="select" placeholder="出發機場" disabled={false} 
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
                 {
                    place.map(v => (
                      <Option key={v.Code}>{v.Value}</Option>
                    ))
                 }
                 </Select>
              )}
          </Col>
          <Col span="1" className="place-line" disabled={false}>
            {category === 'twoWay' && <Icon type="swap" />}
            {category === 'oneWay' && <Icon type="swap-right" />}
          </Col>
          <Col span="7">
            {getFieldDecorator('placeTo')(
                 <Select size="small"  className="select" placeholder="到達機場" disabled={false}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  > 
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
          <Col className="form-title"  span="3"></Col>
          <Col span="5">
          {/* {initialValue:moment('2019-05-12','YYYY-MM-DD')} */}
            {getFieldDecorator('dateFrom',)(
              <DatePicker
              disabledDate={this.disabledStartDate}
              onChange={this.onStartChange}
              size="small" 
              placeholder="出發日期" 
              format='YYYY-MM-DD'
              disabled={false}
               />
            )}
          </Col>
          <Col span="4">
            {getFieldDecorator('timeFrom1')(
              <TimePicker format={format} className="time" size="small" minuteStep={30} placeholder="起飛時間區間: 開始" 
                disabled={false}
              />
            )}
          </Col>
          <Col className="form-title"  span="1">~</Col>
          <Col span="4">
            {getFieldDecorator('timeTo1',)(
              <TimePicker format={format} className="time" size="small" minuteStep={30} placeholder="起飛時間區間: 結束"
                disabled={false}
              />
            )}
          </Col>
          <Col className="form-title"  span="2">交通車:</Col>
          <Col span="5">
            {getFieldDecorator('carNeed1',{initialValue:false})(
               <Switch className="card-need1" size="small"  disabled={false}/>
            )}
          </Col>
        </Row>

        {
          category === 'twoWay' &&
          <Row>
            <Col className="form-title" span="3"></Col>
            <Col span="5">
              {getFieldDecorator('dateTo')(
                <DatePicker 
                disabledDate={this.disabledEndDate}
                onChange={this.onEndChange}
                size="small" 
                placeholder="返回日期" format='YYYY-MM-DD'
                disabled={false}  
                />
              )}
            </Col>
            <Col span="4">
              {getFieldDecorator('timeFrom2')(
                <TimePicker format={format} minuteStep={30} className="time" size="small" placeholder="返回時間區間: 開始" 
                  disabled={false}
                />
              )}
            </Col>
            <Col className="form-title" span="1">~</Col>
            <Col span="4">
              {getFieldDecorator('timeTo2')(
                <TimePicker format={format} minuteStep={30} className="time" size="small" placeholder="返回時間區間: 結束" 
                  disabled={false}
                />
              )}
            </Col>
            <Col className="form-title" span="2">交通車:</Col>
            <Col span="5">
              {getFieldDecorator('carNeed2',{initialValue: false})(
                <Switch className="card-need" size="small" 
                  disabled={false}
                />
              )}
            </Col>
          </Row>
        }

        </div>
    )
  }
}
  
export default FlightItem;