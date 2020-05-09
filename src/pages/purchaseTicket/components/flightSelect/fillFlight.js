import React, { Component } from 'react';
import { Radio, Row, Col } from "antd";
import FlightItem from "./flightItem";
import FlightItemForMany from './flightItemForMany';

class FillFlight extends Component {
  state = {
    
  }
  render(){
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
          <FlightItem place={place} category={category} form={this.props.form} />
        }
        {
          category === 'manyWay' &&
          <FlightItemForMany place={place} form={this.props.form} />
        }
      </div>
    )
  }
}
  
export default FillFlight