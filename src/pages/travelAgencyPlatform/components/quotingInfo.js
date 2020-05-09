import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuotingPeople from "./quotingPeople";
import QuotingFlight from "./quotingFlight";

class QuotingInfo extends Component {
  render(){
    const { quoteStartData } = this.props;
    return(
      <div className="quote-start-info">
        <QuotingPeople />
        <QuotingFlight />
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { quoteStartData } = state.travelAgencyPlatformReducer;
  return{ quoteStartData }
}
const mapDispatchToProps = ( dispatch ) => {
  return{}
}
export default connect( mapStateToProps, mapDispatchToProps )( QuotingInfo )