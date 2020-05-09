import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message } from 'antd';
import QuotingPeople from "./quotingPeople";
import QuotingFlight from "./quotingFlight";
import BackChangeTicket from './backChangeTicket';
import { actionCreators } from '../store';

class QuoteStart extends Component {
  render(){
    const { showModal, handleHiddenModal, handleQuoteOk, backChange, back, change } = this.props;
    return(
      <Modal
      title="開始報價"
      visible={showModal}
      onOk={handleQuoteOk.bind(this, backChange, change)}
      onCancel={handleHiddenModal}
      width={1500}
      centered={true}
      >
     

        <div className="quote-start-info">
          <QuotingPeople />
          {
            back &&
            <BackChangeTicket ref="backChangeTicketCorst" back={back} change={change} />
          }
          {
            (change || !backChange) &&
            <QuotingFlight ref="quotingFlight" change={change} />
          }
          
        </div>
      </Modal>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { showModal, quoteStartData, backChange, back, change } = state.travelAgencyPlatformReducer;
  return{ showModal, quoteStartData, backChange, back, change }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleHiddenModal(){
      dispatch(actionCreators.hiddenModal())
    },
    // 確定報價
    handleQuoteOk(backChange, change){
      let cost, error, changeTicket;
      // 分為退改簽和待報價兩種情況
      if(backChange){
        this.refs.backChangeTicketCorst.validateFields((err, values) => {
          if(err){
            message.warning("请填写完整信息");
            error = true;
            return;
          }
          cost = values;
        })
        if(change){
          this.refs.quotingFlight.validateFields((err, values) => {
            if(err){
              message.warning("请填写完整信息");
              error = true;
              return;
            }
            changeTicket = values;
          })
        }
        if(!error){
          dispatch(actionCreators.backChangeOk(changeTicket, cost))
        }
      }else {
        this.refs.quotingFlight.validateFields((err, values) => {
          if(err){
            message.warning("请填写完整信息")
            return;
          }
          dispatch(actionCreators.quoteOk(values))
        })
      } 
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( QuoteStart )