import React, { Component } from 'react';
import { connect } from 'react-redux';

class Content extends Component {
  render(){
    return(
      <div className="content">
        content
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
export default connect( mapStateToProps, mapDispatchToProps )( Content )