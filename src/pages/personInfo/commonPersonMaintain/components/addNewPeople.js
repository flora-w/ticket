import React, { Component } from 'react';
import { Button, Modal, Form, message } from "antd";
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
          onCancel={handleHiddenModal.bind(this)}
          okText="確定"
          cancelText="取消"
          width={width}
        >
          <Content form={form} ref="fillCom" />
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = ( state ) => {
  const { baseInfo, showModal, isEdit } = state.personInfoReducer.commonPeopleMaintain;
  return{ baseInfo, showModal, isEdit }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleAddShow(){
      this.props.form.resetFields();
      dispatch(actionCreators.addShow());
    },
    handleHiddenModal(){
      this.props.form.resetFields();
      dispatch(actionCreators.hiddenModal())
    },
    handleAdd(){
      const { form, baseInfo, isEdit } = this.props;
      form.validateFields((err, values) => {
        for (const v of Object.values(values)){
          if(!v) {
            message.warning('請填寫完整信息');
            return;
          } 
        }
          dispatch(actionCreators.addCommonInfo(baseInfo, values, isEdit));
          this.props.form.resetFields();
      })
    }
  }
} 
export default connect( mapStateToProps, mapDispatchToProps )(Form.create()(AddNewPeople))