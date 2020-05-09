import React, {Component} from 'react';
import {  Row, Col, Tag, Icon  } from "antd";
import PropTypes from 'prop-types';




 class ShowTicketInfo extends Component {
 state = {
   
 }

 changePersonInfoShow = (person) => {
   let data = this.state.data;
  for (let v of data) {
    v.person === person? v.personInfo.show = true : v.personInfo.show = false;
  }
  this.setState({data,})
 }

 //显示中文地址
 showCnPlace = (v) => {
  if(this.props.pageData){
    console.log(v)
    for (let item of this.props.pageData) {
      if(item.ParmCode === v){
        return item.ParmValue;
      }
    }
    return null;
  }
 }

 changePersonInfoHide = (person) => {
  let data = this.state.data;
  for (let v of data) {
    v.personInfo.show = false;
 }
 this.setState({data,})
 }

componentWillReceiveProps(nextProps){
  this.setState({data: nextProps.flightInfo})
}
componentWillMount(){
  this.setState({data: this.props.flightInfo})
}
   render(){
     const {flightInfo, editInfo, deleteInfo, isAssistant } = this.props;
     let data =  this.state.data;
    return data.map(( {category, person, data, ...rest}, i ) => {
      return (
        <Row key={i}>
          <Col offset="4" className="ticket">
            {category === 'oneWay' ? <Tag color="#8B658B" >單程</Tag> : category === 'twoWay' ?
              <Tag color="#CD950C" >往返</Tag> : category === 'manyWay' ? <Tag color="#98F5FF" >多程</Tag> : null}
            <Tag 
            color="green" 
            onMouseOver={() => this.changePersonInfoShow(person)}
            onMouseLeave={() => this.changePersonInfoHide(person)}
            >{person}</Tag>
            {
              isAssistant && rest.personInfo && rest.personInfo.show? 
              <ul className="personInfoList" >
                <li><span><Tag color="green">工號:</Tag></span><span>{rest.personInfo.empno}</span></li>
                <li><span><Tag color="green">國籍:</Tag></span><span>{rest.personInfo.nationality}</span></li>
                <li><span><Tag color="green">掛賬部門:</Tag></span><span>{rest.personInfo.chargeDept}</span></li>
                <li><span><Tag color="green">所在部門:</Tag></span><span>{rest.personInfo.dept}</span></li>
                <li><span><Tag color="green">乘機人電話:</Tag></span><span>{rest.personInfo.phone}</span></li>
                <li><span><Tag color="green">證件類型:</Tag></span><span>{rest.personInfo.zjCategory}</span></li>
                <li><span><Tag color="green">證件號:</Tag></span><span>{rest.personInfo.zjNo}</span></li>
                <li><span><Tag color="green">證件有效期:</Tag></span><span>{rest.personInfo.zjDate}</span></li>
            </ul> : null
            }
            
            {
              data.map((v, k) => {
                return (
                  <div className="info" key={k}>
                    {this.showCnPlace(v.placeFrom)}<Icon type="swap-right" />
                    {this.showCnPlace(v.placeTo)}  <Tag color="blue" >出發日期</Tag>{v.dateFrom}
                    <Tag color="blue" >出發時間</Tag>{v.timeFrom} ~ {v.timeTo}&nbsp;
                     {
                      category === 'twoWay' && <p></p>
                    }
                    {
                      category === 'twoWay' && <span>
                        {this.showCnPlace(v.placeTo)}<Icon type="swap-right" />
                        {this.showCnPlace(v.placeFrom)}
                        <Tag color="blue" >返程日期</Tag>{v.dateBack}&nbsp;
                      </span>
                    }
                    <Tag color="blue" >交通車</Tag>
                    {v.carNeed ? '是' : '否'}&nbsp;
                    <span className="operation">
                      <span className="edit" onClick={() =>  editInfo(i, k, flightInfo)}>編輯</span> &nbsp;
                      <span className="delete" onClick={() =>  deleteInfo(i, k, category )}>刪除</span>
                    </span>
                  </div>
                )
              })
            }
          </Col>
        </Row>
      )
    })
   }
  
}

export default ShowTicketInfo;

ShowTicketInfo.propTypes = {
  flightInfo: PropTypes.array.isRequired,
  editInfo: PropTypes.func.isRequired,
  deleteInfo: PropTypes.func.isRequired,
  isAssistant: PropTypes.bool.isRequired
}


