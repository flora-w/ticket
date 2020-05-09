import React, { Component } from 'react';
import Card from "../../../../components/card";
import {MergeCellsTable} from "../../../../components/table";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {actionCreators} from '../store'
import { Button} from 'antd';

class ChangeOrders extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            radioValue:1
        }
    }
    handleChange(e){
        this.setState({
            radioValue:e.target.value
            }
        )
    }
    render() {
        const{radioValue}=this.state;
        const columns1 = [{
            title: '工號',
            dataIndex: 'Empno',
            align: "center",
        }, {
            title: '姓名',
            dataIndex: 'Chname',
            align: "center",
        }, {
            title: '航程類別',
            dataIndex: 'TripType',
            align: "center",
        }, {
            title: '行程',
            dataIndex: 'applyName',
            align: "center",
            children: [
                { title: '出發時間', dataIndex: 'FlyTime', align: "center", },
                { title: '出發機場', dataIndex: 'StartAirport', align: "center", },
                { title: '到達機場', dataIndex: 'ArriveAirport', align: "center", },
                { title: '航班', dataIndex: 'FlyNo', align: "center", },
                { title: '金額', dataIndex: 'Cost', money: "center", }
            ]
        }]
        const mergeItems = ['Empno', 'Chname', 'TripType'];
        const { data2 ,handleSubmit} = this.props;
        return(

            <Card title="選擇報價" className="flight-info">
                {
                    data2.map((v,k)=>{
                        return (
                            <div key={k}>
                                <div>
                                    <b>方案{k+1}</b>
                                    <input type="radio" name="one" 
                                    value={v[0].ID} 
                                    checked={radioValue == v[0].ID}   
                                    onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <MergeCellsTable
                                    data={v}
                                    columns={columns1}
                                    mergeItems={mergeItems} 
                                    rowKey={k}
                                />
                            </div>
                        )
                    })
                }
                <Button
                    onClick={handleSubmit.bind(this,this.props,radioValue)}
                    style={{marginTop:20,backgroundColor:'#3690cf',color:'#fff'}}
                >送出</Button>
            </Card>
        )
    }
    componentWillUnmount() {
        sessionStorage.removeItem('state')
    }
}

const mapStateToProps = (state) => {
    const { changeOrders , radioValue} = state.ordersReducer.waitAffirmTicketOutReducer;
    return { changeOrders , radioValue}
}
const mapDispatchToProps = (dispatch) => {
    return {
        handlePriceClick(record, allTickets){//allTickets是獲取單程多程往返的所有數據
            dispatch(actionCreators.priceClick(record, allTickets))
        },
        handleSubmit(props,radioValue){
            dispatch(actionCreators.submitOrder(props,radioValue));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangeOrders))