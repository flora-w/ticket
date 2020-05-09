import React, { Component } from 'react';
import { Upload, Button, Icon } from "antd";

class EfUpload extends Component {
  state = {
    fileList:[]
  }
  
  /**
   * 上傳文件
   */
  onUpload = file => {
    this.setState({
      fileList: [file],
    }, () => {
      const formData = new FormData();
      formData.append('file', file);
      this.props.success(file);
    });
    return false;
  }

  /**
   * 移除文件
   */
  onRemove = file => {
    this.setState((state) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }
  render(){
    const { fileList } = this.state;
    const uploadProps = {
      name: 'file',
      headers: {
        authorization: 'authorization-text',
      },
      onRemove: this.onRemove,
      beforeUpload: this.onUpload,
      fileList
    }
    return(
      <Upload {...uploadProps}>
        <Button size="large" type="primary">
          <Icon type="upload" /> 點擊上傳
        </Button>
      </Upload>
    )
  }
}
  
export default EfUpload