import React, { Component } from "react";

export default WrappedComponent  => class extends Component {


  componentWillMount() {
    console.log(sessionStorage.getItem('user'));
    console.log(this.props);
  }
  render() {
    return (
        <WrappedComponent
          {...this.props}
        />
    );
  }
}; 