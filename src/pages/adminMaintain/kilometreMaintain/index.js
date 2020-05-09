import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button ,Table} from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/index';
import Upload from '../../../components/upload'


class KilometereMainTain extends Component  {

  state = {
    columns:[
      {title: '起止地址', dataIndex: 'FromTo',align:'center'},
      {title: '公里數', dataIndex: 'KM',align:'center'},
      {title: '來源', dataIndex: 'Source',align:'center'},
    ],
  }

  componentDidMount(){
    this.props.getPageData();
  }
  
  render(){
    const { kmPageData , handleUpload,handleConfirmUpload,kmFile} = this.props;
    const { columns} = this.state;
    return (
      <div>
        {
          !this.props.isAuthority && 
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="公里數維護">
            <Upload success={handleUpload}/>
           {
             this.props.showBtn && 
             <Button
                type='primary'
                style={{marginTop:10,marginBottom:10}}
                onClick={() => handleConfirmUpload(kmFile)}
             >確定</Button>
           }
            <Table 
              columns={columns}
              dataSource={kmPageData.fly}

            />
          </Card>
        }
      </div>
    )
  }  
  componentWillUnmount() {
    this.props.changeAuth();
  }
  
}

const mapStateToProps = (state) => {
  const { kmPageData ,isAuthority , showBtn,kmFile} = state.adminMaintainReducer;
  return {
    kmPageData, isAuthority , showBtn,kmFile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getKmPageData())
    },
    handleUpload(file){
      dispatch(actionCreators.saveUpLoadFile(file))
    },
    handleConfirmUpload(file){
      dispatch(actionCreators.upLoadFile(file))
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
      dispatch(actionCreators.changeBtnState(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(KilometereMainTain)