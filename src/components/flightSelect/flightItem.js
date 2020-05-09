import React, { useState, useEffect  } from 'react';
import {  Select, Row, Col, Icon, DatePicker, Switch, TimePicker  } from "antd";

const Option = Select.Option;
const format = 'HH:mm';
const FlightItem = (props) => {
  const [startValue, setStartValue] = useState(null); //開始日期限制
  const [endValue, setEndValue] = useState(null); //結束日期限制
  /**
   * 限制时间填写
   */
 const disabledStartDate = (startValue) => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  const disabledEndDate = (endValue) => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  const onChange = (field, value) => {
    if(field === 'startValue'){
      setStartValue(value);
    }
    if(field === 'endValue'){
      setEndValue(value);
    }
  }

  const onStartChange = (value) => {
     onChange('startValue', value);
  }

  const onEndChange = (value) => {
     onChange('endValue', value);
  }


  useEffect(() => {
    setStartValue(null);
    setEndValue(null);
  },[props.index])
  /**
   * 切换航程類別时重置時間限制
   */
  useEffect(() => {
    // console.log(props.changeLimitDate)
    setStartValue(null);
    setEndValue(null);
  }, [props.changeLimitDate])

    const { form:{ getFieldDecorator}, category, place } = props;
    return(
      <div className="items" >
        <Row>
          <Col className="form-title"  span="3"></Col>
          <Col span="6">
            {getFieldDecorator('placeFrom')(
                 <Select size="small" className="select" placeholder="出發機場"
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
          <Col span="1" className="place-line">
            {category === 'twoWay' && <Icon type="swap" />}
            {category === 'oneWay' && <Icon type="swap-right" />}
          </Col>
          <Col span="7">
            {getFieldDecorator('placeTo')(
                 <Select size="small"  className="select" placeholder="到達機場"
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
            {getFieldDecorator('dateFrom')(
              <DatePicker
                  disabledDate={ disabledStartDate}
                  onChange={ onStartChange}
                  size="small" 
                  placeholder="出發日期" 
                />
            )}
          </Col>
          <Col span="4">
            {getFieldDecorator('timeFrom1')(
              <TimePicker format={format}  minuteStep={30} className="time" size="small" placeholder="起飛時間區間: 開始"/>
            )}
          </Col>
          <Col className="form-title"  span="1">~</Col>
          <Col span="4">
            {getFieldDecorator('timeTo1')(
              <TimePicker format={format} minuteStep={30} className="time" size="small" placeholder="起飛時間區間: 結束"/>
            )}
          </Col>
          <Col className="form-title"  span="2">交通車:</Col>
          <Col span="5">
            {getFieldDecorator('carNeed1',{initialValue:false})(
               <Switch className="card-need1" size="small"  />
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
                    disabledDate={ disabledEndDate}
                    onChange={ onEndChange}
                    size="small" 
                    placeholder="返回日期" 
                  />
              )}
            </Col>
            <Col span="4">
              {getFieldDecorator('timeFrom2')(
                <TimePicker format={format} className="time" size="small" minuteStep={30} placeholder="返回時間區間: 開始" />
              )}
            </Col>
            <Col className="form-title" span="1">~</Col>
            <Col span="4">
              {getFieldDecorator('timeTo2')(
                <TimePicker format={format} className="time" size="small" minuteStep={30} placeholder="返回時間區間: 結束" />
              )}
            </Col>
            <Col className="form-title" span="2">交通車:</Col>
            <Col span="5">
              {getFieldDecorator('carNeed2',{initialValue: false})(
                <Switch className="card-need" size="small" />
              )}
            </Col>
          </Row>
        }
        </div>
    )
}
  
export default FlightItem;