import React,{ useState,useCallback } from 'react';
import {Row, Col, Radio} from 'antd';
import FromToAirport from './fromtoairport';

const TravelType = (props) => {
  const [type, setType]  = useState('twoWay');
  const handelChangeType = useCallback((e) => {
    setType(e.target.value);
    props.getType(e.target.value)
  },[props.getType])
  return (
    <>
      <Row>
        <Col span={24}>
          <label htmlFor=""  style={props.style}>航程類型:</label>
          <Radio.Group defaultValue={type} size='default' style={{marginBottom: 20}} onChange={handelChangeType}>
              <Radio value="oneWay">單程</Radio>
              <Radio value="twoWay">往返</Radio>
              <Radio value="manyWay">多程</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col>
            <FromToAirport 
                category={type} 
                timeLimit={props.submitTime} 
                airport={props.airport}
                getJourneyData={props.getJourneyData}
                isSpecial={props.isSpecial}
              />
        </Col>
      </Row>
    </>
  )
}

export default TravelType;