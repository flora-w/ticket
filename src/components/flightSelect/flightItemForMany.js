import React from 'react';
import { Select, Row, Col, Icon, DatePicker, Switch, TimePicker  } from "antd";

const Option = Select.Option;
let id = 1;
const format = 'HH:mm';
const FlightItemForMany = (props) => {
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
    const { form:{ getFieldDecorator, getFieldValue} } = props;
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    return(
      <div>
        {
          keys.map((k, i)=> {
            return(
              <div key={i}>
              <div className="items" >
                  <div className="line-kuang">
                    <div className="xuhao">{i+1}</div>
                    <span className="close">
                      <Icon type="close" onClick={() => remove(k)} />
                    </span>
                  </div>
                <Row>
                  <Col className="form-title"  span="3"></Col>
                  <Col span="6">
                    {getFieldDecorator('placeFrom_'+k)(
                         <Select size="small" className="select" placeholder="出發機場"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                         >
                            {
                              props.place.map(v => (
                                <Option key={v.Code}>{v.Value}</Option>
                              ))
                            }
                         </Select>
                      )}
                  </Col>
                  <Col span="1" className="place-line">
                    <Icon type="swap-right" />
                  </Col>
                  <Col span="7">
                    {getFieldDecorator('placeTo_'+k)(
                         <Select size="small"  className="select" placeholder="到達機場"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                          {
                              props.place.map(v => (
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
                    {getFieldDecorator('dateFrom_'+k)(
                      <DatePicker size="small" placeholder="出發日期"/>
                    )}
                  </Col>
                  <Col span="4">
                    {getFieldDecorator('timeFrom1_'+k)(
                      <TimePicker format={format} minuteStep={30} className="time" size="small" placeholder="起飛時間區間: 開始"/>
                    )}
                  </Col>
                  <Col className="form-title"  span="1">~</Col>
                  <Col span="4">
                    {getFieldDecorator('timeTo1_'+k)(
                      <TimePicker format={format} minuteStep={30} className="time" size="small" placeholder="起飛時間區間: 結束"/>
                    )}
                  </Col>
                  <Col className="form-title"  span="2">交通車:</Col>
                  <Col span="5">
                    {getFieldDecorator('carNeed_'+k, {initialValue: false})(
                       <Switch className="card-need1" size="small"  />
                    )}
                  </Col>
                </Row>
        
                </div>
              </div>
            )
          })
        }
        <Row>
          <Col offset="2">
            <div className="add-flight-btn" onClick={add}><Icon type="plus" />添加航程</div>
          </Col>
        </Row>
      </div>
    ) 
    
  
}
  
export default FlightItemForMany;