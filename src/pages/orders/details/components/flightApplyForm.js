import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import TicketApplyFormInfo from "./ticketApplyFormInfo";
import TicketBackFormInfo from "./ticketBackFormInfo";
import SubmitPriceFormInfo from "./submitPriceFormInfo";
import FlightInfo from "./flightInfo";
// import SignHistory from "./signHistory";
import SignOption from "./signOption";
import TicketBack from "./ticketBack";

import '../index.less'


const FlightApplyForm = ({ formData, flightData, originFlightData, newFlightData,  signFormSubmit, category, id }) => {
  const showFormInfo = (category) => {
    if(category === 1){
      return <TicketApplyFormInfo data={formData} />;
    }else if(category === 2){
      return <TicketBackFormInfo data={formData} />
    }else if(category === 3){
      return <SubmitPriceFormInfo data={formData} />;
    }else{
      return null;
    }
  }
  const showFlightInfo = (category) => {
    if(category === 1){
      return <FlightInfo data={flightData} />;
    }else if(category === 2){
      return <TicketBack data1={originFlightData} data2={newFlightData} />
    }else{
      return null;
    }
  }
    return(
      <div className="sign">
        { showFormInfo(category) }
        { showFlightInfo(category) }
        {/* <SignHistory data={signHistory} /> */}
        {
          id === '1' &&
          <SignOption 
          signFormSubmit={signFormSubmit}
          formId={formData.SequenceID} />
        }      
      </div>
    )
}
  
const mapStateToProps = ( state ) => {
  const { formData, flightData, originFlightData, newFlightData,  category } = state.signReducer.applyTicketSignReducer;
  return{ formData, flightData, originFlightData, newFlightData,category }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    signFormSubmit(form, formId){
      form.validateFields((err, values) => {
        if(!err){
          dispatch(actionCreators.submitData({values, formId}));
        }
      })
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( FlightApplyForm )