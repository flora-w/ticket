import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Upload, Icon } from "antd";
import { compose } from "../../../../utils";

import '../index.less'

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
class BatchUpload extends Component {
    plscDownLoad() {
        return (
            <div >
                <a href='http://10.42.168.147:1234/maintain/OpenExcel?path=D:/AW/P81/sample.xlsx&name=sample.xlsx'><Icon type="download" size='big' />點此下載模板</a>
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
    render() {

        const { form: { getFieldDecorator },
        } = this.props;
        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 8
            },
        };
        return (
            <div>
                <FormItem label=" " colon={false}  {...formItemLayout} >
                    {getFieldDecorator('downFileOption', {
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
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}
//export default connect( mapStateToProps, mapDispatchToProps )( BatchUpload )
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    Form.create()
)(BatchUpload);

