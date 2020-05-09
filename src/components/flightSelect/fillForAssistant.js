import React, { Component } from 'react';
import { Form, Row, Col, Radio, } from "antd";
import FlightItem from "./flightItem";
import FlightItemForMany from "./flightItemForMany";

class FillForAssistant extends Component {
  state={
    category: 'twoWay',
  }

  /**
   * 選擇航程  
   * */
  handleFlightChange = e => {
    this.resetState();
    this.setState({
      category: e.target.value
    })
  }
  /**
   * 切换时重置数据
   */
  resetState = () => {
    const { resetFields } = this.props.form;
    resetFields(['person', 'placeFrom', 'placeTo', 'dateFrom', 'timeFrom1', 'timeTo1',  'carNeed1']);//重置表單輸入項
  }
  render(){
    const { form, flightPageData:{ place = []} } = this.props;
    const { category } = this.state;
    return(
      <div>
        <Row>
          <Col className="form-title flight-select"  span="3">航程類型:</Col>
          <Col span="7">
              <Radio.Group  onChange={this.handleFlightChange} defaultValue="twoWay">
                <Radio.Button value="oneWay">單程</Radio.Button>
                <Radio.Button value="twoWay">往返</Radio.Button>
                <Radio.Button value="manyWay">多程</Radio.Button>
              </Radio.Group>
          </Col>
        </Row>
        {
          category !== 'manyWay' &&
          <FlightItem place={place} category={category} form={form} />
        }
        {
          category === 'manyWay' &&
          <FlightItemForMany place={place} form={form} />
        }
      </div>
    )
  }
}
  
export default Form.create()( FillForAssistant );