import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { actionCreators } from "../store";
import WillQuotePrice from "../components/willQuotePrice";
import HadPrice from "../components/hadPrice";
import { Button } from "antd";
import { getUrlParam } from "../../../utils";

class BackAndChangeTicketDetail extends Component { 

  componentDidMount(){
    const { location } = this.props;
    // console.log(location.search)
    // const serialId = getUrlParam(location.search)
    this.props.getData(location.search)
  }
  componentWillUnmount(){
    //重置組件狀態
    this.props.resetState()
  }
  render(){
    const { flight, handleQuoteComplete, submit_loading} = this.props;
    return(
      <div>
        <WillQuotePrice title="原行程" data={flight} category='backChangeTicketQuote'  />
        <HadPrice title="已報價" data={flight} />
        <div className="submit-btns">
          <Button 
          type="primary"
          onClick={handleQuoteComplete.bind(this)}
          loading={submit_loading}
          >確定</Button>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const {flight, submit_loading } = state.travelAgencyPlatformReducer;
  return{
    flight, submit_loading
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getData(formData){
      dispatch(actionCreators.getBackChangeTicketDetail( formData ))
    },
    resetState(){
      dispatch(actionCreators.resetState())
    },
    handleQuoteComplete(){
      const that = this;
      dispatch(actionCreators.backChangeEnd(that))
    }
  }
}
export default withRouter(connect( mapStateToProps, mapDispatchToProps )( BackAndChangeTicketDetail ))