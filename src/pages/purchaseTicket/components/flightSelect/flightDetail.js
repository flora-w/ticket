import React, { Component } from 'react';
import { Row, Col, Tag, Icon } from 'antd';

class FlightDetail extends Component {


  render(){ 
    const { flightInfo, deleteInfo, editInfo } = this.props;
    if(flightInfo.length>0){
      return flightInfo.map( ({category, person, detail, ...rest}, i) => {
        return (
          <Row key={i}>
          <Col offset="3" className="ticket">
            {category === 'oneWay' ? <Tag color="#8B658B" >單程</Tag> : category === 'twoWay' ?
              <Tag color="#CD950C" >往返</Tag> : category === 'manyWay' ? <Tag color="#98F5FF" >多程</Tag> : null}
            <Tag 
            color="green" 
            >{person}</Tag>
            {             
              detail.map((v, k) => {
                return (
                  <div className="info" key={k}>
                    {v.placeFromText}<Icon type="swap-right" />
                    {v.placeToText}  <Tag color="blue" >出發日期</Tag>{v.dateFrom}
                    <Tag color="blue" >出發時間</Tag>{v.timeFrom1} ~ {v.timeTo1}&nbsp;
                    <Tag color="blue" >交通車</Tag>
                    {v.carNeed1 === 'Y' ? '是' : '否'}&nbsp;
                     {
                      category === 'twoWay' && <p></p>
                    }
                    {
                      category === 'twoWay' && <span>
                        {v.placeToText}<Icon type="swap-right" />
                        {v.placeFromText}
                        <Tag color="blue" >返程日期</Tag>{v.dateTo}
                        <Tag color="blue" >返回時間</Tag>
                        {v.timeFrom2} ~ {v.timeTo2}&nbsp;
                        <Tag color="blue" >交通車</Tag>
                        {v.carNeed2 === 'Y' ? '是' : '否'}&nbsp;
                      </span>
                    }                   
                    <span className="operation">
                      <span className="edit" onClick={() => editInfo(i, k)}>編輯</span> &nbsp;
                      <span className="delete" onClick={() => deleteInfo(i, k)}>刪除</span>
                    </span>
                  </div>
                )
              }) 
            }
          </Col>
        </Row>
        )
      } )
    }else{
      return null;
    }
    
  }
}
  
export default FlightDetail