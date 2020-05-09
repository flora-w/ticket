import React, { Component } from 'react';
import { Row, Col, Select, Input, Card } from "antd";
import AddCardInfo from '../../components/addCard'

const Option = Select.Option;
class Content extends Component {
  state = {
    data: [],
    cardInfo: []
  }
  
  handleCardNewAdd = () => {

  }
  render(){
    const style = {width: 100};
    const styleHr = {backgroundColor: 'rgb(241, 242, 243)', margin: '30px 0', border: 'none',height: 5}
    return(
      <div>
        <Row>
          <Col span="7"><b>工號:</b> <span>K00000</span></Col>
          <Col span="7"><b>姓名:</b> <span>小王</span></Col>
          <Col span="7"><b>部門:</b> <span>KP123</span></Col>
        </Row>
        <Row>
          <Col span="7"><b>關係:</b> <Select size="small" style={style}/></Col>
          <Col span="7"><b>眷屬姓名:</b> <Input size="small" style={style}/></Col>
          <Col span="7"><b>性別:</b> <Select size="small" style={style}/></Col>
        </Row>
        <hr style={styleHr}/>
        <AddCardInfo
          cardInfo={this.state.cardInfo}
          handleCardNewAdd={this.handleCardNewAdd}
          data={this.state.data}
        />
      </div>
    )
  }
}
  
export default Content