import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { actionCreators } from "../store";
import FormInfo from "../components/formInfo";
import WillQuotePrice from "../components/willQuotePrice";
import HadPrice from "../components/hadPrice";
import { getUrlParam } from "../../../utils";
import { Button } from "antd";
import QuoteStart from '../components/quoteStart'

class QuotingPrice extends Component { 
  /**
   * 獲取參數中的單號
   */
 getData = (id, data) => {
    for (const v of data) {
      if(v.SerialID === id){
        return v;
      }
    }
    return null;
  }
   /**
   * 取消报价
   */
  handleQuoteCancel(){
    this.props.history.push('/travel-agency/quote-price-complete');
  }
  componentDidMount(){
    const { quoteCompleteList, location } = this.props;
    const formid = getUrlParam(location.search, 'formId');
    const formData = this.getData(formid, quoteCompleteList);
    if(!formid || !formData){
      this.props.history.push('/travel-agency/quote-price-complete');
    }
    this.props.getData(formData)
  }
  componentWillUnmount(){
    //重置組件狀態
    this.props.resetState()
  }
  render(){
    const { quoteCompleteList, flight, handleQuoteComplete, submit_loading, hadQuoteFormInfo } = this.props;
    return(
      <div>
        <FormInfo title="單號信息" data={hadQuoteFormInfo}/>
        {/* <WillQuotePrice title="報價" data={flight}  /> */}
        <QuoteStart />
        <HadPrice title="已報價" />
        <div className="submit-btns">
          <Button 
          className="cancel-btn" 
          type="default"
          onClick={this.handleQuoteCancel.bind(this)}>取消</Button>
          <Button 
          type="primary"
          onClick={handleQuoteComplete.bind(this)}
          loading={submit_loading}>修改結束, 送出</Button>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { quoteCompleteList, flight, submit_loading, hadQuoteFormInfo } = state.travelAgencyPlatformReducer;
  return{
    quoteCompleteList, flight, submit_loading, hadQuoteFormInfo
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getData(formData){
      dispatch(actionCreators.getHadQuote( formData ))
    },
    resetState(){
      dispatch(actionCreators.resetState())
    },
    handleQuoteComplete(){
      const that = this;
      dispatch(actionCreators.quoteComplete(that))
    }
  }
}
export default withRouter(connect( mapStateToProps, mapDispatchToProps )( QuotingPrice ))