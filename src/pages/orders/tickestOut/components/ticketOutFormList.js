import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import TicketOutSignList from '../components/ticketOutSignList'
import TicketOutForm from '../components/ticketOutForm';
import BackChangeTicket from '../components/backChangeTicket'
import { actionCreators } from '../store'



import "../index.less"

class TicketOutFormList extends Component {
    componentWillUnmount() {
        this.props.showListPage()
    }
    render() {
        const { ticketOutSignList, ticketOutForm , status} = this.props;
        return (
            <div className="orders">
                <TicketOutSignList data={ticketOutSignList} />
                <TicketOutForm data1={ticketOutForm} />

                {  status !== '退改簽完成' &&
                <Link 
                to='/orders/5/backChangeTicket'
                >
                    退票/改簽申請
                </Link>
                }
              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { ticketOutSignList, ticketOutForm, status } = state.ordersReducer.ticketsOutReducer;
    return { ticketOutSignList, ticketOutForm, status }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showListPage() {
            dispatch(actionCreators.goBackClick())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketOutFormList)