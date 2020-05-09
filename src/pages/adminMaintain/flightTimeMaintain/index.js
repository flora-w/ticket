import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button ,Table} from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/index';
import Upload from '../../../components/upload'


class FlightTimeMaintain extends Component  {

  state = {
    columns:[
      {title: '航班', dataIndex: 'Flight',align:'center'},
      {title: '起始地', dataIndex: 'FromPlace',align:'center'},
      {title: '目的地', dataIndex: 'ToPlace',align:'center'},
      {title: '周飛行天數', dataIndex: 'WeekFly',align:'center'},
      {title: '起飛時間', dataIndex: 'StartTime',align:'center'},
      {title: '到達時間', dataIndex: 'EndTime',align:'center'},
    ],
  }

  componentDidMount(){
    this.props.getPageData();
  }
  
  render(){
    const { flightTimeData , handleUpload,handleConfirmUpload,flightTimeFile} = this.props;
    const { columns} = this.state;
    return (
      <div>
        {
          !this.props.isAuthority && 
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="航班時刻表維護">
            <Upload success={handleUpload}/>
           {
             this.props.showBtn && 
             <Button
                type='primary'
                style={{marginTop:10,marginBottom:10}}
                onClick={() => handleConfirmUpload(flightTimeFile)}
             >確定</Button>
           }
            <Table 
              columns={columns}
              dataSource={flightTimeData.fly}

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
  const { flightTimeData ,isAuthority , showBtn,flightTimeFile} = state.adminMaintainReducer;
  return {
    flightTimeData, isAuthority , showBtn,flightTimeFile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getFlightTimeData())
    },
    handleUpload(file){
      dispatch(actionCreators.flightTimeFile(file))
    },
    handleConfirmUpload(file){
      dispatch(actionCreators.uploadFlightTimeFile(file))
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
      dispatch(actionCreators.changeBtnState(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlightTimeMaintain)