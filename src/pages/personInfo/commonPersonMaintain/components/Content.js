import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from "antd";
import AddCardInfo from '../../components/addCard';
import PersonInfo from "./personInfo";

class Content extends Component {
  
  render(){
    const styleHr = {backgroundColor: 'rgb(241, 242, 243)', margin: '30px 0', border: 'none',height: 5}
    const { cardInfo, haveFamilyName, addPersonPageData, form, editData, isEdit } = this.props;
    return(
      <div>
        <PersonInfo 
        form={this.props.form} />
        <hr style={styleHr}/>
        <AddCardInfo
          form={form}
          cardInfo={cardInfo}
          addPersonPageData={addPersonPageData}
          haveFamilyName={haveFamilyName}
          editData={editData}
          isEdit={isEdit}
          isCommonPeople={true}
        />
      </div>
    )
  }
}
const mapStateToProps = ( state ) => {
  const { cardInfo, haveFamilyName, addPersonPageData, editData, isEdit } = state.personInfoReducer.commonPeopleMaintain;
  return{
    cardInfo, haveFamilyName, addPersonPageData, editData, isEdit
  }
}
export default connect( mapStateToProps, null )(Form.create()(Content))