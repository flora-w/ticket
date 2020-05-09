import React, { Component } from 'react';
import { connect } from 'react-redux';

export default AssistantFillInList => class extends Component {

    render() {
        const { data } = this.props;
        console.log(data)

        return (
            <div className="person-info">
                <div>
                    <b>證件類型:</b><span></span>
                    <b>證件號:</b><span></span>
                    <b>證件有效期:</b> <span></span>
                    <b>證件英文名:</b><span></span>
                </div>
                 <AssistantFillInList
                    {...this.props}
                /> 
            </div>
        );
    }
}; 