import React , { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from "../store";
import { Table, Input,Card,Tag,Modal ,Row,Col,Button} from 'antd';   
import './index.less';
import CardTitle from '../../../components/card';
import SearchPart from './components/searchPart';
import OrderHeader from './components/orderDataHeader';
import MergeCellTable from '../../../components/table/mergeCellsTable'
import { getOrderData } from '../store/actionCreators';
import NoAuthority from './../../../commonPages/noAuthority/index';

const Search = Input.Search;

class OrderSearch extends Component{
    state = { 
        visible: false,
     }
    showModal = () => {
        this.setState({
        visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
        visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
        visible: false,
        });
    }
    componentDidMount(){
        this.props.getAuth();
    }

    render(){
        //搜索結果表頭
        const columns_1 = [
        {
            title:'單號編號',
            align:'center',
            dataIndex:'SerialID',
            render: (text, record) => (
            <span  style={{color:'#1890ff',cursor:'pointer'}}
                onClick = {(e) =>{
                    this.props.getOrderData(e.target.innerText,record.Remark);
                    this.showModal()
                    }}
            >
                {text}
            </span>
            )
        },
        {title:'表單名稱',align:'center',dataIndex:'Name',},
        {title:'填單日期',align:'center',dataIndex:'ApplyDatetime',},
        {title:'目前狀態',align:'center',dataIndex:'Status', width:100,render: text => <Tag color="blue" >{text}</Tag>},
        ]
        const data=[
            {id:219,step:'Node.js',fillperson:'2018.1.1',date:'...',classify:'219',remark:' ',extra:'附檔'},
        ]

        
        const modalStyle = {
            height:520,
        }
        //具體單據表頭
        const columns_2 = [
            {title:'姓名',align:'center',dataIndex:'Chname',key:'Chname',width:90},
            {title:'性別',align:'center',dataIndex:'Sex',key:'Sex',width:90},
            {title:'行程類型',align:'center',dataIndex:'TripType',key:'TripType',width:90},
            {title:'行程',align:'center',
            children:[
                {title:'出發時間區間',align:'center',dataIndex:'Section',key:'Section'},
                {title:'出發機場',align:'center',dataIndex:'StartAirportName',key:'StartAirportName'},
                {title:'到達機場',align:'center',dataIndex:'EndAirportName',key:'EndAirportName'},
                {title:'航班',align:'center',dataIndex:'FlyNo',key:'FlyNo'},
                {title:'金額',align:'center',dataIndex:'Cost',key:'Cost',render:(text,record)=>{
                    if(text){
                        return <Tag size='small' color='blue' >{text}</Tag>}
                    }
                },
                {title:'中標旅行社',align:'center',dataIndex:'TravelName',key:'TravelName'},
                {title:'出票日期',align:'center',dataIndex:'TicketTime',key:'TicketTime'},
                {title:'退票費',align:'center',dataIndex:'ReturnPrice',key:'ReturnPrice',render:(text,record)=>{
                    if(text){
                        return <Tag size='small' color='blue' >{text}</Tag>}
                    }
                },
                {title:'退票日期',align:'center',dataIndex:'ReturnTime',key:'ReturnTime'},
                {title:'改簽費',align:'center',dataIndex:'ChangePrice',key:'ChangePrice',render:(text,record)=>{
                    if(text){
                        return <Tag size='small' color='blue' >{text}</Tag>}
                    }
                },
                {title:'改簽日期',align:'center',dataIndex:'ChangeTime',key:'ChangeTime'},
                {title:'退改費用挂賬',align:'center',dataIndex:'IsPublic',key:'IsPublic'},
                {title:'總費用',align:'center',dataIndex:'AllPrice',key:'AllPrice',render:(text,record)=>{
                    if(text){
                        return <Tag size='small' color='blue' >{text}</Tag>}
                    }
                },
            ],
            },
        ]
        const mergeItem=['Chname','Sex','TripType']; 
        return(
           <div>
               {
                !this.props.isAuthority && 
                <NoAuthority></NoAuthority>
            }
            {
                this.props.isAuthority && 
                <div>
                    <Card title="單據查詢" style={{minHeight:300}}>
                        <CardTitle title="請輸入查詢條件" >
                            <SearchPart />
                        </CardTitle>
                        <Table 
                            size="middle"
                            columns={columns_1}
                            style={{maxWidth:880,paddingTop:20,}}   
                            dataSource={this.props.searchData}
                            rowKey={'SerialID'}
                        />
                    </Card>
                    <Modal
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        bodyStyle={modalStyle}
                        centered
                        onCancel={this.handleCancel}
                        keyboard
                        title={"機票申請清單"}
                        width={1280}
                        centered={true}
                        bodyStyle={{minHeight:100}}
                        footer={[<Button onClick={this.handleOk} type="primary" key="close">关闭</Button>]}
                        >
                        <OrderHeader data={this.props.orderData.head} />
                            <h2>行程信息:</h2>
                        <div className='information'>
                            <MergeCellTable
                            columns={columns_2}
                            data={this.props.orderData.record}   
                            scroll={{x:1800}}
                            rowKey={'key'}
                            mergeItems={mergeItem}
                            />
                        </div>
                    </Modal>
                </div>
            }
           </div>
               
        )
    }
    componentWillUnmount(){
        this.props.resetSearchData();
        this.props.changeAuth();
    }
}


const mapStateToProps = (state) => {
    const { 
        searchData ,
        orderData ,
        isAuthority,
        showModal,
     } = state.adminMaintainReducer;
    return { 
        searchData , 
        orderData ,
        isAuthority,
        showModal,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        resetSearchData(){
            dispatch(actionCreators.resetData())
        },
        getOrderData(id,remark){
            dispatch(actionCreators.getOrderData(id,remark))
        },
        getAuth(){
            dispatch(actionCreators.getIsAuth())
        },
        changeAuth(){
            dispatch(actionCreators.isAuthority(false))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderSearch);