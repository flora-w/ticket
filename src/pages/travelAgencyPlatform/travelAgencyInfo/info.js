import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, List, Tag } from "antd";
import { actionCreators } from '../store';

class Info extends Component {

  componentDidMount(){
    this.props.getTravelAgencyInfo()
  }
  render(){
    const { travelAgencyInfo } = this.props;
    return(
      <Card title="資料信息" className="travel-agency-info">
        <List>
          <List.Item>
            <span className="item-title"><Tag color="blue">姓名: </Tag></span> {travelAgencyInfo.TravelName}
          </List.Item>
          <List.Item>
            <span className="item-title"><Tag color="blue">聯繫人: </Tag></span> {travelAgencyInfo.Contact}
          </List.Item>
          <List.Item>
            <span className="item-title"><Tag color="blue">聯繫方式: </Tag></span> {travelAgencyInfo.Telephone}
          </List.Item>
          <List.Item>
            <span className="item-title"><Tag color="blue">郵箱: </Tag></span> {travelAgencyInfo.Mailbox}
          </List.Item>
        </List>
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { travelAgencyInfo } = state.travelAgencyPlatformReducer;
  return{travelAgencyInfo}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getTravelAgencyInfo(){
      dispatch(actionCreators.travelAgencyInfo())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( Info )