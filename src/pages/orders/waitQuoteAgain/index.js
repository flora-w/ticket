import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from "antd";

class WaitAffirmForm extends Component {
  render() {
    return (
      <Card title="待重新報價">
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitAffirmForm)