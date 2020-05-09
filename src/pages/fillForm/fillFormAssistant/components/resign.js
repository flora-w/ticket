import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Radio, Button, Upload, Input, DatePicker, Icon } from "antd";
import { actionCreators } from "../store";
import { compose } from "../../../../utils";
// import hComponent from "../../components/hComponent";

import Flight from '../../components/flightSelect';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { TextArea } = Input;
const Dragger = Upload.Dragger;
const { Option } = Select;
class Resign extends Component {
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

    render() {
        const {
            form: { getFieldDecorator }, //數據雙向綁定
            handleCategoryChange,//複選總放置端
            hanldLeaveOfficeSelect,
            hanldTdfsSelect,//選擇離職/歸任/轉調時顯示子選項
            hanldAreaSelect,
            showVisaDate,
            canUpload,
            showZbtx_formid,
            isAssistant,
            showPlsc_formid,
            pageData,
            onEmpnoChange,
            assistanApplyPeopleInfo,
        } = this.props;

        const {
            danhao,
            area,
            userInfo,
            peoples,
            flightPlace,
            lz_gr_zdItem,
            chargeDept } = pageData;

        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 8
            },
        }
        //类别
        const category_ = lz_gr_zdItem.map(v => (<Radio value={v.parmCode} key={v.parmCode}>{v.parmValue}</Radio>));
        //区域
        const area_ = area.map(v => (<Radio value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Radio>));
        //返台述职单号
        const danhao2_ = danhao.FanTai && danhao.FanTai.map(v => (<Option value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Option>));
        //挂账部门
        const chargeDept_ = chargeDept.map(v => (<Option value={v} key={v}>{v}</Option>));
        //航程数据
        const flightData = { peoples, flightPlace, userInfo };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="類別">
                    {getFieldDecorator('category', {
                        rules: [{
                            required: true, message: '請選擇類別',
                        }],
                    })(
                        <RadioGroup onChange={handleCategoryChange}>
                            {category_}
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
                <FormItem {...formItemLayout} label="上傳附件">
                    {getFieldDecorator('gz_dept', {
                        rules: [{
                            required: true, message: '請上傳附件',
                        }],
                    })(
                        <Upload
                            name='file'

                        >
                            <Button>
                                <Icon type="upload" /> 點擊上傳
              </Button>
                        </Upload>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="掛賬部門">
                    {getFieldDecorator('gz_dept',
                        { initialValue: chargeDept[0] },
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

const mapStateToProps = (state) => {
    const {
        showVisaDate,
        canUpload,
        showZbtx_formid,
        isAssistant,
        showPlsc_formid,
        pageData,
        assistanApplyPeopleInfo,
    } = state.fillFormReducer.fillFormAssistantReducer;
    return {
        showVisaDate,
        canUpload,
        showZbtx_formid,
        isAssistant,
        showPlsc_formid,
        pageData,
        assistanApplyPeopleInfo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleCategoryChange(e) {
            dispatch(actionCreators.categoryChange(e.target.value));
        },
        hanldLeaveOfficeSelect(value) {
            dispatch(actionCreators.leaveOffice(value));
        },
        hanldAreaSelect(e) {
            dispatch(actionCreators.areaSelect(e.target.value));
        },
        resetAllState() {
            dispatch(actionCreators.resetState());
        },
        //填單方式
        hanldTdfsSelect(e) {
            dispatch(actionCreators.tdfsSelect(e.target.value));
        },
        getFlightInfo(value) {
            dispatch(actionCreators.flightInfo(value))
        }
    }
}
// export default connect( mapStateToProps, mapDispatchToProps )(Form.create()(Resign)  )
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    Form.create()
)(Resign);