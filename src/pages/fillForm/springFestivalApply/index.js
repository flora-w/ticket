import React, { Component } from 'react';
import { connect } from 'react-redux';

class SpringFestival extends Component {
  render(){
    return(
      <div className="apply-form-springFestival">
        SpringFestival
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  return{}
}
const mapDispatchToProps = ( dispatch ) => {
  return{}
}
export default connect( mapStateToProps, mapDispatchToProps )( SpringFestival )