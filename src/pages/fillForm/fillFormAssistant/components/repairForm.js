import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Checkbox, Radio, Button, Upload, Icon, Input, DatePicker, message } from "antd";
import { actionCreators } from "../store";
import { compose } from "../../../../utils";
import Flight from '../../components/flightSelect';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
const Dragger = Upload.Dragger;
const RadioButton = Radio.Button;
class RepairForm extends Component {

    plscDownLoad() {
        return (
            <div >
                <a><Icon type="download" size='big' />點此下載模板</a>
            </div>);
    }
    //批量上傳時候
    plscUpload() {
        return (<Dragger
            name="file"
            multiple={true}
            //action={`${baseURL}/api/cr_apply_form/upload/2`}
            className="upload-file"
        //onChange={this.handleUploadFileChange}
        // withCredentials={true}
        //onRemove={this.props.handleRemoveFile}
        >
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">點擊或者拖拽文件上傳</p>
        </Dragger>);
    }
    getFlightInfo = (value) => {
        this.props.getFlightInfo(value);
    }

    componentWillUnmount() {
        this.props.resetAllState();
    }
    
    render(){
        const { 
            form: { getFieldDecorator },
            handleCategoryChange,
            showCc_formid,
            showFtsz_formid,
            showOther,
            showFiveUpload,
            handleOtherChange,
            showVisaDate,
            hanldAreaSelect,
            hanldTdfsSelect,
            showZbtx_formid,
            showPlsc_formid,
            isAssistant,
            canUpload,
            onEmpnoChange,
            assistanApplyPeopleInfo,
            handleSubmit,
            pageData
          } = this.props;
          const { 
            area,
            userInfo,
            peoples,
            flightPlace,
            chargeDept,
            danhao
         } = pageData;
         const formItemLayout = {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 8
            },
          };
         //区域
    const area_ = area.map(v => (<Radio value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Radio>));
    //挂账部门
    const chargeDept_ = chargeDept.map(v => (<Option value={v} key={v}>{v}</Option>));
    //航程数据
    const flightData = { peoples, flightPlace, userInfo };
        return(
          <Form onSubmit={this.handleSubmit}>    

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
               {area_}
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
                <DatePicker size="small" />
              )}
            </FormItem>
          }
  
  <FormItem
          {...formItemLayout}
          label="填單方式"
        >
          {getFieldDecorator('tdfs', {
            rules: [{
              required: true, message: '請選擇填單方式',
            }],
          })(
            <RadioGroup onChange={hanldTdfsSelect}>
              <RadioButton value='zbtx'>逐筆填寫</RadioButton>
              <RadioButton disabled={canUpload} value='plsc'>批量上傳</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        {
          showZbtx_formid &&
          <Flight
            form={this.props.form}
            getFlightInfo={this.getFlightInfo}
            isAssistant={true}
            pageData={flightData}
            onEmpnoChange={onEmpnoChange}
            assistanApplyPeopleInfo={assistanApplyPeopleInfo} />
        }

        {
          showPlsc_formid &&
          <div>
            <FormItem label=" " colon={false}  {...formItemLayout} >
              {getFieldDecorator('fileOption', {
                rules: [{ required: true, message: ' ' }],
              })(
                this.plscDownLoad()
              )}
            </FormItem>
            <FormItem label=" " colon={false} {...formItemLayout} >
              {getFieldDecorator('fileOption', {
                rules: [{ required: true, message: ' ' }],
              })(
                this.plscUpload()
              )}
            </FormItem>
          </div>
        }
  
          <FormItem {...formItemLayout} label="掛賬部門">
          {getFieldDecorator('gz_dept', 
          {initialValue: chargeDept[0]},
          {
                rules: [{
                  required: true, message: '請選擇掛賬部門',
                }],
              })(
                <Select>
                  {chargeDept_}
                </Select>
              )}
        </FormItem>
  
        <FormItem {...formItemLayout} label="備註">
          {getFieldDecorator('mark', {
                rules: [{
                  required: true, message: '請填寫備註',
                }],
              })(
                <TextArea />
              )}
        </FormItem>
  
        <FormItem {...formItemLayout} label=" " colon={false}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
  
        </Form>
        )
    }
}
    
const mapStateToProps = ( state ) => {
    const { 
        showVisaDate,  
        flightInfo, 
        isAssistant,
        showZbtx_formid,
        showPlsc_formid,
        assistanApplyPeopleInfo,
        pageData
         } = state.fillFormReducer.fillFormAssistantReducer;
         return{ 
            showVisaDate,  
            flightInfo, 
            isAssistant,
            showZbtx_formid,
            showPlsc_formid,
            assistanApplyPeopleInfo,
            pageData }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleFlightChange(e){
      dispatch(actionCreators.flightChange(e.target.value));
    },
    resetAllState(){
      dispatch(actionCreators.resetState());
    },
    hanldAreaSelect(e){
      dispatch(actionCreators.areaSelect(e.target.value));
    },
    getFlightInfo(value){
      dispatch(actionCreators.flightInfo(value))
    },
    //填單方式
    hanldTdfsSelect(e) {
      dispatch(actionCreators.tdfsSelect(e.target.value));
    },
    handleSubmit(form) {
      form.validateFields((err, values) => {
        if (!err) {
          dispatch(actionCreators.submitData(values))
        }
      });

    }
  }
}
// export default connect( mapStateToProps, mapDispatchToProps )( RepairForm )
export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    Form.create()
  )(RepairForm)