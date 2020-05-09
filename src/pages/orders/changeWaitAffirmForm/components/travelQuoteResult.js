import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../../../components/card';
import { actionCreators } from '../store'
import { MergeCellsTable } from '../../../../components/table/index'
import { Modal } from 'antd';
import LookChangeContent from '../components/lookChangeContent'

class TravelQuoteResult extends Component {

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    render() {
        const { data1, handleCheckDetail, showModal, hiddenModal, changeDetail, changePrice, returnPrice } = this.props;

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
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
            ]
        }, {
            title: '',
            dataIndex: 'check',
            align: "center",
            render: (text, record) => (<a
                href="javascript:;"
                onClick={() => {return handleCheckDetail(record.repUID)}}>
                查看
        </a>)
        }
        ];
        const mergeItems = ['sex', 'name', 'category', ];//合併單元格
        return (
            <Card title="旅行社報價結果">
                <MergeCellsTable
                    data={data1}
                    columns={columns}
                    rowKey={data1.key}
                    mergeItems={mergeItems}
                />
                <Modal //查看旅行社報價結果
                    title="旅行社報價結果"
                    visible={showModal}//對話框是否可見
                    width={1200}
                    onCancel={hiddenModal}
                    footer={null}
                >
                    <LookChangeContent
                        data={changeDetail}
                        changePrice={changePrice}
                        returnPrice={returnPrice} />
                </Modal>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    const { showModal, changeDetail, changePrice, returnPrice } = state.ordersReducer.changeWaitAffirmFormReducer;
    return { showModal, changeDetail, changePrice, returnPrice }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleCheckDetail(uid) {
            dispatch(actionCreators.checkDetail(uid))
        },
        hiddenModal() {
            dispatch(actionCreators.hiddenModal())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TravelQuoteResult)