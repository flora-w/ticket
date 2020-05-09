import React, { Component } from 'react';
import { Table ,Modal} from "antd";

const confirm = Modal.confirm;
class NewTable extends Component {
  state = {
    columns:[{
      title: '證件類型',
      dataIndex: 'CertType',
      align:"center"
    }, {
      title: '證件姓名',
      dataIndex: 'CertName',
      align:"center"
    }, {
      title: '證件號碼',
      dataIndex: 'CertNO',
      align:"center"
    }, {
      title: '有效期',
      dataIndex: 'CertValidTime',
      align:"center"
    }, {
      title: '簽注有效期',
      dataIndex: 'SignValidTime',
      align:"center",
      render: text => text? text : <span>——</span>
    }, {
      title: '入臺許可證有效期',
      dataIndex: 'TaiwanValidTime',
      align:"center",
      render: text => text? text : <span>——</span>
    },{
      title: '操作',
      align:"center",
      render: (text, record) => record.Source !== 'EFORM'?<a href="javaScript:;" onClick={()=>this.showPropsConfirm(record)}>删除</a>:<span>無</span>
    }]
  }
  //()=>this.props.deleteInfo(record.UID, record.EmpNo)
  showPropsConfirm = (record)=>{
    confirm({
      title: '提示信息?',
      content: `您確定要刪除 ${record.CertName} 的證件類型為 ${record.CertType} 信息嗎?`,
      okText: '確定',
      okType: 'danger',
      okButtonProps: {
        disabled: false,
      },
      cancelText: '取消',
      onOk: ()=> {
        this.props.deleteInfo(record.UID, record.EmpNo)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }



  render(){
    const { data } = this.props;
    const { columns } = this.state;
    // console.log(data)
    if(data.length>0){
      return(
        <Table 
         columns={columns}
         dataSource={data}
         pagination={{hideOnSinglePage: true}}
         bordered={true} 
         rowKey={'CertNO'}
         size="small"
         />
      )
    }else{
      return null
    }
    
  }
}
  
export default NewTable