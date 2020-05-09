import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from "antd";
import { actionCreators } from "./store";

import BaseInfo from "./components/baseInfo";
import VIPAndHobby from "./components/VIPAndHobby";
import CardInfo from "./components/cardInfo";

import "./index.less";

class PersonInfoMaintain extends Component {

  areaSelect = (value,e) => {
    this.props.areaSelect(value)
  }

  componentDidMount(){
    this.props.pageInit();
  }
  render(){
    return(
      <div className="person-info-maintain">
        <Card title="基礎資料及喜好">
          <BaseInfo areaSelect={this.areaSelect} />
        </Card>
        <br/>
        <Card title="會員卡號">
          <VIPAndHobby />
        </Card>
        <br/>
        <Card title="個人證件信息">
          <CardInfo />
        </Card>
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  return{
    
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    pageInit(){
      dispatch(actionCreators.getPageData())
    },
    areaSelect(data){
      dispatch(actionCreators.areaData(data))
    },
   
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( PersonInfoMaintain )