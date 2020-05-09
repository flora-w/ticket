import React,{ useState} from 'react';
import { connect } from 'react-redux';
import { Select, Input, Button } from "antd";
import { actionCreators } from "../store";
import { formatDate } from "../../../../utils";

const { Option } = Select;
const { TextArea } = Input;

const BaseInfo = ({baseInfo, areaSelect, handleSeatChange, handleRemarkChange, handleHobbyChange, personHobbySave}) => {
  const { dept, empno, name, enName, ziDeng, hireDate, birthDate, sex, phone, eMail, areaData, seat, eat, areaSelectData,seatSelectData, hobbySelectData, remark, hobby } = baseInfo;
  const areas = areaData && areaData.map(v => (<Select.Option value={v.Value} key={v.Value}>{v.Value}</Select.Option>));
  const seatOption = seat.map(v => (<Option value={v.Value} key={v.Value}>{v.Value}</Option>));
  const eatOption = eat.map(v => (<Option value={v.Value} key={v.Value}>{v.Value}</Option>));
  const InputStyle = {width: 'auto'};
  const [inputValue, setInputValue] = useState();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }
    return(
      <div className="person-info">
        <div>
          <b>部門:</b><span>{dept}</span>
          <b>工號:</b><span>{empno}</span>
          <b>姓名:</b> <span>{name}</span>
          <b>英文名:</b><span className="en-length">{enName}</span>
        </div>
        <div>
          <b>職等:</b><span>{ziDeng}</span>
          <b>入職日期:</b> <span>{formatDate(hireDate)}</span>
          <b>出生日期:</b> <span>{formatDate(birthDate)}</span>
        </div>
        <div>
          <b>性別:</b><span>{sex} </span>
          <b>手機號:</b> <Input defaultValue={phone} style={InputStyle} onChange={handleInputChange.bind(this)}/> 
          <b>E-Mail:</b> <span>{eMail}</span>
        </div>
        <div>
          <b>所在地:</b>
          <Select className="area" size="small" onChange={areaSelect} value={areaSelectData} >
            {areas}
          </Select>
        </div>
        <div>
          <b>座位喜好:</b>
          <Select
            className="select"
            size="small"
            onChange={handleSeatChange}
            value={seatSelectData}
          >
            {seatOption}
          </Select>
          <b>飲食愛好:</b>
          <Select
            className="select"
            size="small"
            onChange={handleHobbyChange}
            value={hobbySelectData}
            >
            {eatOption}
          </Select>
        </div>
        <div><b className="clearfix" style={{ float: 'left' }}>備註:</b>
          <TextArea
            className="textArea clearfix"
            onChange={handleRemarkChange} 
            value={remark}
            /></div>
        <div className="submit-btn">
          <Button onClick={() => personHobbySave(empno, name, areaSelectData,seatSelectData, hobbySelectData, remark, inputValue, phone)}>保存</Button>
        </div>
      </div>
    )
  
}
  

const mapStateToProps = ( state ) => {
  const { baseInfo, areaSelectData, seatSelectData, hobbySelectData } = state.personInfoReducer.personInfoMaintain;
  return{baseInfo, areaSelectData, seatSelectData, hobbySelectData}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleSeatChange(value){
      dispatch(actionCreators.seatChange(value))
    }, 
    handleHobbyChange(value){
      dispatch(actionCreators.hobbyChange(value))
    },
    handleRemarkChange(e){
      dispatch(actionCreators.remarkChange(e.target.value))
    },
    personHobbySave(empno, name, areaSelectData,seatSelectData, hobbySelectData, remark,inputValue,phone){
      const Phone = inputValue || phone;
      dispatch(actionCreators.personHobbySave(empno, name, areaSelectData,seatSelectData, hobbySelectData, remark,Phone));
    },
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( BaseInfo )