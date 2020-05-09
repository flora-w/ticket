import React,{Component} from 'react';
import { Input,Row,Col,Select,Button,Form } from 'antd';
import { connect } from "react-redux";
import { actionCreators } from "../../store";
import { message } from "antd";
import '../index.less';

const Option = Select.Option;
class SearchPart extends Component{
    state = {
    }
    handleSearch = (e) => {
        const form = this.props.form.getFieldsValue();
        let index = 0;
        for(let key in form){
            if(!form[key]) index++;
        }
        if(index == 7) message.info('請輸入查詢條件');
        else if(form['travelempno'] && !form['Applyid']) message.info('請輸入填單人工號');
        else if(!form['travelempno'] && form['Applyid']) message.info('請輸入乘機人工號');
        else this.props.getSearchData(form);
    }   
    handleResetSearch = ()=>{
        this.props.form.setFieldsValue({
            travelempno:'',
            travelname:'',
            traveldept:'',
            Applyid:'',
            Applyname:'',
            travelcode:'T00',
            formstatus:'S00',
            ApplyEmpNo:'',
        });
        this.props.resetSearchData()
    }
    componentDidMount = () => {
    }
    
    render(){
        const {form:{getFieldDecorator},handleSearch,searchCondition} = this.props;
        let formstatus = searchCondition.formstatus.map(v=>(<Option key={v.Code} value={v.Code}>{v.Value}</Option>));
        let travels = searchCondition.travel.map(v=>(<Option key={v.Code} value={v.Code}>{v.Value}</Option>));
        const style = {width: 150};

        return (
            <div className="search_part">              
                <Row>
                    <Col span="8">
                    <b>乘機人工號:</b>
                    {
                        getFieldDecorator('travelempno',{initialValue:''})(
                            <Input size="small" style={style} autoComplete='off'/>            
                        )
                    }
                    </Col>
                    <Col span="8">
                    <b>乘機人姓名:</b>
                    {
                        getFieldDecorator('travelname',{initialValue:''})(
                            <Input size="small" style={style} autoComplete='off'/>            
                        )
                    }
                    </Col>
                    <Col span="8">
                    <b>乘機人部門:</b>
                    {
                        getFieldDecorator('traveldept',{initialValue:''})(
                            <Input size="small" style={style} autoComplete='off'/>            
                        )
                    }
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <b>填單人工號:</b>{
                        getFieldDecorator('Applyid',{initialValue:''})(
                            <Input size="small" style={style} autoComplete='off'/>            
                        )
                    }
                    </Col>
                    <Col span="8">
                    <b>填單人姓名:</b>{
                        getFieldDecorator('Applyname',{initialValue:''})(
                            <Input size="small" style={style} autoComplete='off'/>            
                        )
                    }
                    </Col>
                    <Col span="8">
                    <b>填單人部門:</b>{
                        getFieldDecorator('ApplyEmpNo',{initialValue:''})(
                            <Input size="small" style={style} autoComplete='off'/>            
                        )
                    }
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <b>旅行社名稱:</b>{
                            getFieldDecorator('travelcode',{initialValue:'T00'})(
                                <Select size="small" style={style} type="middle"
                                >
                                    {travels}
                                </Select>            
                            )
                        }
                    </Col>
                    <Col span="8">
                        <b>單據狀態:</b>
                        {
                            getFieldDecorator('formstatus',{initialValue:'S00'})(
                                <Select size="small" style={style} type="middle"
                                >
                                    {formstatus}
                                </Select>
                            )
                        }                   
                    </Col>
                    <Col span="8">
                        <b>其他:</b>
                        {
                            getFieldDecorator('extra',{initialValue:''})(
                                <Input size="small" style={style} autoComplete='off'/>
                            )
                        }                   
                    </Col>
                </Row>
                <Row style={{textAlign:'center'}}>
                    <Button  type="primary"
                    onClick={this.handleSearch.bind(this)}
                    htmlType='button'
                    >查詢</Button>
                    <Button  type="default" style={{marginLeft:'20px',backgroundColor:'#6c6',color:'#fff'}} onClick={this.handleResetSearch} htmlType='button'>重置</Button>
                </Row>               
            </div>

        )
    }
}
const mapStateToProps = ( state ) => {
    const { searchData , searchCondition} = state.adminMaintainReducer;
    return{
        searchData,searchCondition
    }
  }
const mapDispatchToProps = ( dispatch ) => {
    return{
        getSearchData(data){
            dispatch(actionCreators.searchResult(data))
        },
        resetSearchData(){
            dispatch(actionCreators.resetData())
        },
    }
}
export default connect( mapStateToProps, mapDispatchToProps )(Form.create()( SearchPart ))
