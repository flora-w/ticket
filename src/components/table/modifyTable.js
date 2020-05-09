import React, { Component } from 'react';
import { Table, Input, Tag, Button, Form, Switch, message, Select, Radio, DatePicker ,Modal} from "antd";
import moment from "moment";

const confirm = Modal.confirm;
class ModifyTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      columns: [],
    }
  }

  /**
   * 添加編輯按鈕
   */
  editRender = record => {
    return (
      <a 
      href="javascript:;"
      onClick={() => this.handleEditClick(record)}
      >編輯</a>
    )
  }
  
  /**
   * 將數據保存在state中
   */
  componentWillMount(){
    let { columns } = this.props;
    if(columns[columns.length-1].fixed !== 'righht' && columns[columns.length-1].title){
      columns.push({
        edit: true,
        render: this.editRender,
        fixed: 'right',
      })
    }
    else{
      columns.pop()
      columns.push({
        edit: true,
        render: this.editRender,
        fixed: 'right',
      })
    }
    let len = columns.length;
    columns = columns.map((v, k) => {
      if(v.render){
        v.originRender = v.render; //保存原来的render，当编辑取消时可以恢复     
      }
      if(k === 0){
        v.fixed = 'left';
      }
      if(k !== len){
        v.width = 120;
      }
      v.align = 'center'
      return v;
    })
    this.setState(() => ({
      columns
    }))
  }

  /**
   * 點擊編輯
   */
 handleEditClick = data => {
    let { columns } = this.state;
    columns = columns.map( v => {
      if(v.edit){
        v.render = (text, record) => {
          if(data.key === record.key){
            if( typeof text === 'object'){
              return this.editOtherRender(text);  //操作按钮变换
            }
            return this.otherRender(text, record, v); //渲染成指定的格式
          }else{
            return text;
          }
        }
      }
      return v;
    })
    this.setState(() => ({columns}));
  }

  /**
   * 渲染成其他可编辑方式
   */
  otherRender = (text, record, column) => {
    const { form: { getFieldDecorator } } = this.props;
    const {editType, dataIndex } = column;
    if(editType && typeof editType === 'string'){
      switch (editType.toUpperCase()) {
        case 'INPUT':
          return getFieldDecorator(dataIndex, {initialValue: text})(<Input style={{width:120}} autoComplete='off'/>);
        case 'DATEPICKER':
          return getFieldDecorator(dataIndex, { initialValue: moment(text, 'YYYY/MM/DD') })(<DatePicker />);
        case 'SWITCH':
          return  getFieldDecorator(dataIndex, 
            {
              initialValue: text && text.toUpperCase() === 'Y'? true : false, 
              valuePropName: 'checked',
            })(
            <Switch 
              checkedChildren='Y' 
              unCheckedChildren='N'
            />
          );
        default:
          return  getFieldDecorator(dataIndex, {initialValue: text})(<Input autoComplete='off'/>);
      }
    }else if(editType && typeof editType === 'object'){
      switch (editType['type'].toUpperCase()) {
        case 'SELECT':
          return getFieldDecorator(dataIndex, {initialValue: text})(
          <Select>
            {this.renderItems(editType['content'], 'Select')}
          </Select>
          );
        case 'RADIO':
          return  getFieldDecorator(dataIndex, {initialValue: text})(
            <Radio.Group>
             {this.renderItems(editType['content'], 'Radio')}
            </Radio.Group>
          );
        default:
          return  getFieldDecorator(dataIndex, {initialValue: text})(<Input autoComplete='off'/>);
      }
    }else{
      return  getFieldDecorator(dataIndex, {initialValue: text})(<Input autoComplete='off'/>);
    }
    
  }
  /**
   * 编辑按钮
   */
  editOtherRender = text => {
    return (
      <div>
        <Button 
        type="primary" 
        size="small"
        onClick={() => this.handleEditSave(text)}
        >保存</Button>
        &nbsp;
        <Button 
          size="small"
          onClick={this.handleEditCancel}
        >取消</Button>
      </div>
    )
  }
  /**
   * 保存
   */
  handleEditSave = text => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      const columns = this.state.columns;
      for (const item of columns) {
        if(item.editType && typeof item.editType === 'string' && item.editType.toUpperCase() === 'SWITCH'){
            values[item.dataIndex] = values[item.dataIndex] ? 'Y' : 'N';
        }
      }
        for (const item of Object.values(values)) {
          if(!item){
            message.warn('請填寫完整信息');
            return;
          }
        }
        let data = {...text, ...values};
        // this.props.saveSuccess(data);     //保存之後報數據傳出
        // this.handleEditCancel(); //恢復原狀
        this.showConfirm(data)  //增加更新提示模態框
    });
  }
  /**
   * 取消编辑
   */
  handleEditCancel = () => {
    let { columns } = this.state;
    columns.map(v => {
      v.originRender ? v.render = v.originRender : v.render = null;
      return v;
    })
    this.setState(() => ({columns}))
  }

  /**
   * options
   */
  renderItems = (data, type) => {
    if(type === 'Select'){
      return data.map( v => (
        <Select.Option key={v}>{v}</Select.Option>
      ))
    }
    if(type === 'Radio'){
      return data.map( v => (
        <Radio key={v}>{v}</Radio>
      ))
    }
  }

  /**
   * 
   */
  showConfirm = (data) => {
    confirm({
      title: '更新數據操作確認',
      content: '您確定要更新此行數據嗎?',
      onOk: () => {
        this.props.saveSuccess(data);     //保存之後報數據傳出
        this.handleEditCancel(); //恢復原狀
      },
      onCancel: () => {
        this.handleEditCancel(); //恢復原狀
      },
    });
  }

  render(){
    const { columns } = this.state; 
    const scroll = this.props.scroll ? this.props.scroll : {x:1700}
    const noFixed = this.props.noFixed ? true : false;
    let len = columns.length;
    if(noFixed){
      delete columns[0].fixed
      delete columns[len - 1].fixed;
    }
    if(len<5){
      columns.forEach(v=>{
        v.width = 150;
      })
    }
    return(
      <Table 
        dataSource={this.props.dataSource}
        columns={columns}
        scroll={scroll}
      />
    )
  }
}
  
export default Form.create()(ModifyTable) 