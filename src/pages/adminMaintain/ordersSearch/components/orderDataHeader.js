import React from 'react';
import { withRouter } from "react-router-dom";

const OrderHeader = ({data}) => {
    // console.log(data)
    if(data){
        return (
            <div className="order-list-header">
                <div className="order-list-header-left">
                    <div><span>流水號</span></div>
                    <div><span>目標步驟</span></div>
                    <div><span>填單人</span></div>
                    <div><span>填單時間</span></div>
                    <div><span>類別</span></div>
                    <div><span>備注</span></div>
                    <div><span>附檔</span></div>
                </div>
                <div className="order-list-header-right">
                    <div><span>{data.SerialID}</span></div>
                    <div><span>{data.Status}</span></div>
                    <div><span>{data.ApplyName}</span></div>
                    <div><span>{data.ApplyDateTime}</span></div>
                    <div><span>{data.TravelTypeName}</span></div>
                    <div><span>{data.Remark}</span></div>
                    <div><span><a href="${data.FilePath}">{data.NFileName}</a></span></div>                      
                </div>
            </div>
        )
    }
    else{
        return null;
    }
}

export default withRouter( OrderHeader );