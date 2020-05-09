import React, { Component } from 'react';
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;
class CateGorySelect extends Component {
  state = {
    checks: []
  }

  onChange = (value) => {
    let length = value.length;
    //此兩項可以複選
    if((!value.includes('Q2') || !value.includes('Q4') || length !== 2) && value.length>0){
      let item = value[length-1];
      value = [item];
    }
    
    this.setState({checks: value}, () => {
      this.props.onChecked(value);
    });
    
  }
  render(){
    const {data} = this.props;
    const { checks } = this.state;

    const checkItems = data.map( v => (
            <Checkbox 
              key={v.CategoryCode} 
              value={v.CategoryCode}>
              {v.CategoryName}
            </Checkbox>
    ))

    return(
        <CheckboxGroup  onChange={this.onChange} value={checks}>
          {checkItems}
        </CheckboxGroup>
    )
  }
}
  
export default CateGorySelect