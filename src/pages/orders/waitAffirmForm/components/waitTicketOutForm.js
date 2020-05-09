import React, { Component } from 'react';
import { connect } from 'react-redux';
import {actionCreators} from "../store"
import WaitTicketOutSignList from "../components/waitTicketOutSignList";
import WaitTicketOut from "../components/waitTicketOut";
import ChangeOrders from "../components/changeOrders";
import "../index.less"


class WaitTicketOutForm extends Component { 
    componentWillUnmount() {
    this.props.showListPage()
}


render() {
    const { waitTicketOutSignList, waitTicketOut ,offRepList} = this.props;
    return (
        <div className="orders">
            <WaitTicketOutSignList data={waitTicketOutSignList} />
            <WaitTicketOut data1={waitTicketOut} />
            <ChangeOrders data2={offRepList} />
            {/* <Row>
                    <Col className="form-title" span="8"></Col>
                    <Col span="10">
                        <Button 
                        className="submit-btn"
                        onClick={handleOutPrice.bind(this, changeOrders)}
                        >送出</Button>
                    </Col>
                </Row> */}
        </div>
    )
}
}
    
const mapStateToProps = ( state ) => {
    const { waitTicketOutSignList, waitTicketOut,changeOrders ,offRepList} = state.ordersReducer.waitAffirmTicketOutReducer;
    return { waitTicketOutSignList, waitTicketOut,changeOrders,offRepList}
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        showListPage() {
            dispatch(actionCreators.goBackClick())
        },
        // handleOutPrice(changeOrders){
        //     this.props.form.validateFields((err, values) => {
        //         if (!err) {
        //           console.log('Received values of form: ', values);
        //           dispatch(actionCreators.outPrice(values, changeOrders));
        //           this.props.form.resetFields()
        //         }else{
        //             message.warning('請選擇报价')
        //         }
        //       });
        // }
    }
}
export default connect( mapStateToProps, mapDispatchToProps )( WaitTicketOutForm )