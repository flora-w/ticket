import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Checkbox, Row, Col, Input, DatePicker, Card,Button, message } from "antd";
import { compose } from "../../../../utils";
import { actionCreators } from "../store";

import '../index.less'

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.item;
class OneByOne extends Component {
    state = {
        showSTH:false
    }
    handleSelectIsTW = (e) =>{
        if(e ==='TWPermit'){
            this.state.showSTH = true
        }
    }

    render() {
        const { form: { getFieldDecorator },
            pageData: { ftszItem, country, certType },
            showCc_formid,
            showFtsz_formid,
            showJnfg_formid,
            handleAddFlightClick,
            handleBlurOutName,
            personInfo,
            flightCategory,
            showVisaDate
         } = this.props;
         const formItemLayout = {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 8
            },
          };

        //返台休假選項
        const ftszItem_ = ftszItem.map(v => (<Checkbox key={v.ViceCode} value={v.ViceCode}>{v.ViceName}</Checkbox>));
        const country_ = country.map(v => (<Option key={v.Value} value={v.Value}>{v.Value}</Option>));
        const certType_ = certType.map(v => (<Option key={v.Code} value={v.Code}>{v.Value}</Option>));
        //校驗規則
        const config = {
            rules: [{ required: true, message: '必填' }],
          };
        return (
            <Form onSubmit={handleAddFlightClick.bind(this)}>
                <Card >
                    <Row className="row">
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 乘機人工號:&nbsp;</Col>
                        <Col span="4">
                            {getFieldDecorator('empno_a',config)(
                                    <Input autoComplete='off'  className="select" onBlur={handleBlurOutName.bind(this)}/>
                                    //<Input onBlur={onEmpnoChange} />
                                )}
                        </Col>
                        <Col span="3" className="assistant-titile"><span className="request-star" >*</span>  乘機人姓名:&nbsp;</Col>
                        <Col span="4">
                            {getFieldDecorator('person_a',{initialValue:personInfo.ChName})(
                                    <Input autoComplete='off'  className="select" disabled/>
                                )}
                        </Col>
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span>乘機人性別:&nbsp;</Col>
                        <Col span="4">
                            {getFieldDecorator('sex_a',{config})(
                                    <Select className="select">
                                        <Option value="M">男</Option>  
                                        <Option value="F">女</Option>  
                                    </Select>
                                )}
                        </Col>

                    </Row>
                    <Row className="row">
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span>所屬部門:&nbsp;</Col>
                        <Col span="4">
                            {getFieldDecorator('dept_a',{initialValue:personInfo.Deptcode})(
                                    <Input autoComplete='off'  className="select" disabled/>
                                    // <Input disabled  />
                                )}
                        </Col>
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 國籍:&nbsp;</Col>
                        <Col span="4">
                            {getFieldDecorator('nationality_a',config)(
                                    <Select style={{width: 150}} >
                                        {country_}
                                    </Select>
                                )}
                        </Col>

                        <Col span="3" className="assistant-titile"><span className="request-star">*</span>  手機:&nbsp;</Col>
                        <Col span="5">
                            {getFieldDecorator('phone_a',config)(
                                    <Input autoComplete='off'  />
                                )}
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 證件類型:&nbsp;</Col>
                        <Col span="5">
                            {getFieldDecorator('zjCategory_a',config)(
                                    <Select style={{width: 150}}  onChange={this.handleSelectIsTW.bind(this)}>
                                      {certType_}
                                    </Select>
                                )}
                        </Col>
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span>  證件號:&nbsp;</Col>
                        <Col span="5">
                            {getFieldDecorator('zjNo_a',config)(
                                    <Input autoComplete='off'  />
                                )}
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 證件有效期:&nbsp;</Col>
                        <Col span="5">
                            {getFieldDecorator('zjDate_a',config)(
                                    <DatePicker placeholder="證件有效期" format="YYYY-MM-DD" />
                                )}
                        </Col>
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span> 證件英文名:&nbsp;</Col>
                        <Col span="5">
                            {getFieldDecorator('zjEnname_a',config)(
                                    <Input autoComplete='off'  />
                                )}
                        </Col>
                    </Row>
                    {
                        showCc_formid &&
                        <Row className="row">
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span> 差旅單號:&nbsp;</Col>
                            <Col span="5">
                                {getFieldDecorator('cc_formid',config)(
                                        <Input autoComplete='off'  className="select" />
                                    )}
                            </Col>
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span>掛賬部門:&nbsp;</Col>
                            <Col span="5">
                                {getFieldDecorator('gz_dept',config)(
                                        <Input autoComplete='off'  />
                                    )}
                            </Col>
                        </Row>
                    }
                    {
                        showFtsz_formid &&
                        <div>
                            <Row className="row">
                                <Col span="4" className="assistant-titile"><span className="request-star">*</span>返台休假類型:&nbsp;</Col>
                                <Col span="7">
                                    {getFieldDecorator('ftSequenId', config)(
                                        //增加的onchange事件是為了在index頁面點擊判斷點擊的為哪一項,然後不同頁面傳輸數據要用this.props
                                        <CheckboxGroup onChange={this.props.handeleFiveSelect}>
                                            {ftszItem_}
                                        </CheckboxGroup>
                                    )}

                                </Col>
                            </Row>
                            <Row className="row">
                                <Col span="4" className="assistant-titile"><span className="request-star">*</span>返台休假單號:&nbsp;</Col>
                                <Col span="7">
                                    {getFieldDecorator('ftSequenId1', config)(
                                        <Input autoComplete='off'  className="select" />
                                    )}
                                </Col>
                            </Row>
                        </div>
                    }
                    {
                        showJnfg_formid &&
                        <Row className="row">
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span>眷屬姓名:&nbsp;</Col>
                            <Col span="7">
                                {getFieldDecorator('familyName', config)(
                                    <Input autoComplete='off'  />
                                )}
                            </Col>
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span>與本人關係:&nbsp;</Col>
                            <Col span="7">
                                {getFieldDecorator('familyGuanxi', config)(
                                    <Input autoComplete='off'  />
                                )}
                            </Col>
                        </Row>
                    }
                    {
                        showVisaDate &&

                        <Row className="row">
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span> 簽證有效期:&nbsp;</Col>
                            <Col span="5">
                                {getFieldDecorator('visaDate',{
                            rules: [{
                                required: true, message: '請選擇簽證有效期',
                            }],
                            })(
                                    <DatePicker format="YYYY-MM-DD" placeholder="簽證有效期" />
                                    )}
                            </Col>
                        </Row>
                    }
                    {
                        this.state.showSTH &&

                        <Row className="row">
                            <Col span="5" className="assistant-titile"><span className="request-star">*</span> 入台許可證有效期:&nbsp;</Col>
                            <Col span="5">
                                {getFieldDecorator('visaDate',{
                            rules: [{
                                required: true, message: '請選擇入台許可證有效期',
                            }],
                            })(
                                    <DatePicker format="YYYY-MM-DD" placeholder="入台許可證有效期" />
                                    )}
                            </Col>
                        </Row>
                    }
                    <Row>
                        <Col className="form-title" span="3"></Col>
                        <Col span="17">
                            <Button 
                            className="submit-btn"
                            htmlType="submit"
                            // disabled={this.props.pageData.draft ? true:false}
                            >確定</Button>                        
                            <Button 
                            className="submit-reset"
                            htmlType="button"
                            onClick={this.props.resetAllState.bind(this)}
                            >重置</Button>                        
                        </Col>
                    </Row>
                </Card>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    const { 
        pageData,
        personInfo,
        flightCategory,
        
    } = state.fillFormReducer.fillFormAssistantReducer;
    return {
        pageData,
        personInfo,
        flightCategory,
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPageData() {
            dispatch(actionCreators.getPageInitData());
        },
        handleAddFlightClick(e){
            e.preventDefault();
            // if(this.props.pageData.draft.length !== 0 ){
            //     message.info('請先完成未完成功能的訂票');
            //     return false;
            // }
            this.props.getflightInfo();
            this.props.form.validateFields((err, values) => {
                for (const item of Object.values(values)) {
                    if(!item){
                        message.warning('請填寫必填欄位');
                        return false;
                    }
                }
                // dispatch(actionCreators.addFlight(values))
                setTimeout(()=>{
                    dispatch(actionCreators.onebyone(values,this.props.pageData,this.props.flightCategory))
                },0)
                this.props.form.resetFields()
            })
        },
        resetAllState(){
            this.props.form.resetFields();
        },
        handleBlurOutName(){
            let id = this.props.form.getFieldValue('empno_a');
            dispatch(actionCreators.getName(id))
        }
    }
}
//export default connect( mapStateToProps, mapDispatchToProps )( OneByOne )
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    Form.create()
)(OneByOne);

