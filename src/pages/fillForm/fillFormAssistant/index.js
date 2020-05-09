import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Icon, Row, Col, Tag } from "antd";
import { withRouter } from "react-router-dom";
import { actionCreators } from './store'
import BusinessTripAndBack from './components/businessTripAndBack';
import BackAndHoliday from './components/backAndHoliday';
import Resign from './components/resign';
import RepairForm from './components/repairForm';

import './index.less';

const TabPane = Tabs.TabPane;
class CommonApply extends Component {
  state = {
    n: 1
  }


  callback = (key) => {
    console.log(key)
    this.setState({ n: key })
  }
  componentDidMount() {
    this.props.pageInit()
  }
  render() {
    const {
      personInfo,
    } = this.props;
    const { handleEmpnoChange } = this.props;
    return (
      <div className="apply-form-common">
        <Row className="row-person-info">
          <Col span="5"></Col>
          <Col className="info-title" span="6" >填單人工號 <Tag color="cyan">{personInfo.empno}K18084163</Tag>  </Col>
          <Col className="info-title" span="4" >姓名 <Tag color="cyan">{personInfo.chname}董姝翰</Tag>  </Col>
          <Col className="info-title" span="3" >部門 <Tag color="cyan">{personInfo.deptcode}MEL110</Tag>  </Col>
          <Col className="info-title" span="3"></Col>
        </Row>
        <Tabs onChange={this.callback} className="apply-form-common-select">
          <TabPane tab={<span><Icon className="i" type="form" />出差 · 返台述職</span>} key="1">
            {this.state.n == 1 ? <BusinessTripAndBack onEmpnoChange={handleEmpnoChange} /> : null}
          </TabPane>
          <TabPane tab={<span><Icon className="i" type="form" />返台述職 · 急難返國/殤假</span>} key="2">
            {this.state.n == 2 ? <BackAndHoliday /> : null}
          </TabPane>
          <TabPane tab={<span><Icon className="i" type="form" />補單</span>} key="3">
            {this.state.n == 3?  <RepairForm /> : null}
          </TabPane>
          <TabPane tab={<span><Icon className="i" type="form" />離職/歸任轉調</span>} key="4">
            {this.state.n == 4 ? <Resign /> : null}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    personInfo
  } = state.fillFormReducer.fillFormAssistantReducer;
  return { personInfo }

}
const mapDispatchToProps = (dispatch) => {
  return {
    pageInit() {
      dispatch(actionCreators.getPageInitData());
    },
    resetAllState() {
      dispatch(actionCreators.resetState());
    },
    handleEmpnoChange(e) {
      let value = typeof e === 'object' && e.target.value || e;
      dispatch(actionCreators.empnoChange(value));
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommonApply))