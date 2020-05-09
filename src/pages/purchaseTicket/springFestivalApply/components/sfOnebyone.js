import  React from 'react';
import { Row, Col, Select, Input} from 'antd'; 
import FromToAirport from './fromtoairport'

const Option = Select.Option;
const SFOneByOne = (props) => {
  return (
    <>
      <Row>
          <Col span={8}>
            <label htmlFor="">乘機人工號:</label>
            <Input 
                autoComplete='off' 
                placeholder='請輸入乘機人工號' 
                onBlur={props.handleInputBlur}
                style={{width: 150}}
                size='small'
              />
          </Col>
          <Col span={8}>
            <label htmlFor="">乘機人姓名:</label>
            <Select
                size='small'
                style={{width: 120}}
                onChange={props.handleSelectChange}
              >
              {
                props.personData.map(v => (
                  <Option value={v.Empno} key={v.Empno}>{v.ChName}</Option>
                ))
              }
            </Select>
          </Col>
      </Row>
      <Row>
          <FromToAirport 
              category='twoWay' 
              timeLimit={props.submitTime} 
              location={props.location}
              airport={props.airport}
              getJourneyData={props.getJourneyData}
            />
      </Row>
    </>
  )
}

export default SFOneByOne;