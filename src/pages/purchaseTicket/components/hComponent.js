import React, { Component } from "react";

export default WrappedComponent  => class extends Component {

  componentDidMount() {
    console.log(this.instanceComponent, 'instanceComponent');
  }

  render() {
    return (
      <div>
        <span>xxx</span>
        <WrappedComponent
          {...this.props}
          ref={instanceComponent => this.instanceComponent = instanceComponent}
        />
         <span>sds</span>
      </div>
    );
  }
}; 