import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button ,Modal, Tag,Checkbox } from 'antd';
import { actionCreators } from "../store"
import Card from '../../../../components/card';
import { MergeCellsTable } from '../../../../components/table/index';
import ChangeBackModal from '../components/changeBackModal'



class BackChangeApplyForm extends Component {

  render() {

    const columns = [ {
      title: '',
      dataIndex: 'changeTicket',
      align: "center",
      extraRender: (text, record) => <a
        onClick={() => this.props.handleChangeTicketClick(record, this.props.ticketOutForm)}
      >改簽</a>
    }, {
      title: '姓名',
      dataIndex: 'name',
      align: "center",
    }, {
      title: '工號',
      dataIndex: 'empno',
      align: "center",
    }, {
      title: '航程類別',
      dataIndex: 'category',
      align: "center",
    }, {
      title: '行程',
      dataIndex: 'applyName',
      align: "center",
      children: [
        { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
        { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
        { title: '航班', dataIndex: 'flight', align: "center", },
        { title: '起飛時間', dataIndex: 'flyDate', align: "center",},
        { title: '金額', dataIndex: 'money', align: "center", },
        {
          title:'退票', dataIndex:'changeBack' ,align:'center',
          render: (text, record) => (
            <Checkbox //因為不需要合併單元格，所以不需要寫好的公共的extraRender
              onChange={(e) => this.props.handleChangeBackTicket(e, record)}
            ></Checkbox>
          )
        }
      ]
    }]

    const mergeItems = [ 'changeTicket', 'empno', 'name', 'category'];
    const { data, showModal ,hiddenModal,ticketOutForm} = this.props;
    
    return (
      <Card title="原行程" className="flight-info">
        <MergeCellsTable
          data={data}
          columns={columns}
          mergeItems={mergeItems}
        />
        <Modal //退票改簽點擊的模態框
          title="改簽窗口"
          visible={showModal}//對話框是否可見
          width={1280}
          onCancel={hiddenModal}
          footer={null}
        >
          <ChangeBackModal hiddenModal={hiddenModal}/>
        </Modal>
      </Card>

    )
  }
}
const mapStateToProps = (state) => {
  const { showModal,ticketOutForm } = state.ordersReducer.backChangeTicketReducer;
  console.log(ticketOutForm)
  return { showModal,ticketOutForm }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeTicketClick(record, allTickets){//allTickets是獲取單程多程往返的所有數據
      dispatch(actionCreators.changeTicketClick(record, allTickets))
  },
    hiddenModal(){
      dispatch(actionCreators.hiddenModal())
  },
  handleChangeBackTicket(e, record){//record代表獲取一整行的數據
    dispatch(actionCreators.backTickets(e.target.checked, record))//根據checked判斷是否選中退票
  }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BackChangeApplyForm)