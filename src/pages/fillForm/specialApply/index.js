import React, { Component } from 'react';
import { connect } from 'react-redux';
import {actionCreators} from "./store"
import {Form, Tabs,Row,Col ,Tag,Radio,DatePicker,Button} from "antd";
import { compose } from "../../../utils";
import Flight from "../components/flightSelect"
import './index.less';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class SpecialApply extends Component {

    getFlightInfo = (value) => {
        this.props.getFlightInfo(value);
      }
    
    componentWillUnmount(){
      this.props.resetAllState();
    }
  render(){
    const formItemLayout={
      labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 10
        },
  }
    const {
      form: {getFieldDecorator},
      personInfo,
      handleCategoryChange,
      hanldAreaSelect,
      showVisaDate,
      isAssistant,
    }= this.props
    
    
    return(
      <div className="apply-form-SpecialApply">
      <Row className="row-person-info">
          <Col span="5"></Col>
          <Col className="info-title" span="6" >填單人工號 <Tag color="cyan">{personInfo.empno}K18084163</Tag>  </Col>
          <Col className="info-title" span="4" >姓名 <Tag color="cyan">{personInfo.chname}董姝翰</Tag>  </Col>
          <Col className="info-title" span="3" >部門 <Tag color="cyan">{personInfo.deptcode}MEL110</Tag>  </Col>
          <Col className="info-title" span="3"></Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="類別">
                    {getFieldDecorator('category', {
                        rules: [{
                            required: true, message: '請選擇類別',
                        }],
                    })(
                        <RadioGroup onChange={handleCategoryChange}>
                            <Radio value='qtSite'>其他Site人員</Radio>
                            <Radio value='gw'>顧問</Radio>
                            <Radio value='gjzg'>高階主管</Radio>
                            <Radio value='others'>其他</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="區域"
                >
                    {getFieldDecorator('area', {
                        rules: [{
                            required: true, message: '請選擇區域',
                        }],
                    })(
                        <RadioGroup onChange={hanldAreaSelect}>
                            <Radio value='cn'>大陸</Radio>
                            <Radio value='no_cn'>國外</Radio>
                            <Radio value='tw_cn'>台灣</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                {
                    showVisaDate &&
                    <FormItem
                        {...formItemLayout}
                        label="簽證有效期"
                    >
                        {getFieldDecorator('visaDate', {
                            rules: [{
                                required: true, message: '請選擇簽證有效期',
                            }],
                        })(
                            <DatePicker size="defalute" />
                        )}
                    </FormItem>
                }

             <Flight form={this.props.form} getFlightInfo={this.getFlightInfo} isAssistant={isAssistant}/>

          <FormItem {...formItemLayout} label=" " colon={false}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
  
const mapStateToProps = (state) => {
  const {
    personInfo,
    showVisaDate,
    isAssistant,
  } = state.fillFormReducer.specialApplyReducer;
  return {
    personInfo,
    showVisaDate,
    isAssistant,
  }

}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleCategoryChange(e){
      dispatch(actionCreators.categoryChange(e.target.value));
    },
    hanldAreaSelect(e){
      dispatch(actionCreators.areaSelect(e.target.value));
    },
    getFlightInfo(value){
        dispatch(actionCreators.flightInfo(value));
      },
      resetAllState(){
        dispatch(actionCreators.resetState());
      },
  }
}
//export default connect( mapStateToProps, mapDispatchToProps )( SpecialApply )
export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  Form.create()
)(SpecialApply);