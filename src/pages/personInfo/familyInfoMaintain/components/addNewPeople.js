import React, { Component } from 'react';
import { Button, Modal, Form } from "antd";
import { connect } from 'react-redux';
import { actionCreators } from "../store";
import Content from "./Content";

class AddNewPeople extends Component {
 
  render(){
    const { width, handleAddShow, handleAdd, form, showModal, handleHiddenModal } = this.props;
    return(
      <div>
       <Button
        type="primary"
        onClick={handleAddShow.bind(this)} 
       >
       新增
       </Button>

        <Modal
          title="新增"
          visible={showModal}
          onOk={handleAdd.bind(this)}
          onCancel={handleHiddenModal}
          okText="確定"
          cancelText="取消"
          width={width}
        >
          <Content form={form} />
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = ( state ) => {
  const { cardInfo, baseInfo, showModal, isEdit } = state.personInfoReducer.familyInfoMaintain;
  return{ cardInfo, baseInfo, showModal, isEdit }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleAddShow(){
      this.props.form.resetFields();
      dispatch(actionCreators.addShow());
    },
    handleHiddenModal(){
      dispatch(actionCreators.hiddenModal())
    },
    handleAdd(){
      const { form, cardInfo, baseInfo, isEdit } = this.props;
      form.validateFields((err, values) => {
        dispatch(actionCreators.addFamilyInfo(baseInfo, values, cardInfo, isEdit))
      })
    }
  }
} 
export default connect( mapStateToProps, mapDispatchToProps )(Form.create()(AddNewPeople))