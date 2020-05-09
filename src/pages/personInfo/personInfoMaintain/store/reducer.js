import * as actionTypes from "./actionTypes";
import { message } from "antd";
import { formatDate } from '../../../../utils/'
const defaultState = {
    baseInfo: {
        dept: '',
        empno: '',
        name: '',
        enName: '',
        ziDeng: '',
        hireDate: '',
        birthDate: '',
        sex: '',
        phone: '',
        eMail: '',
        areaData: [],
        seat: [],
        eat: [],
        areaSelectData: '',
        seatSelectData: '',
        hobbySelectData: '',
        remark: '',
        hobby: {}
    },
    vipAndHobby: {
        company: [],
        companyAndCard: [],       
    },
    cardInfo: {
        cardCategory: [],
        data: []
    }

    
};
//頁面數據
const pageData = (newState, {data:{BaseInfo, Country, Hobby, Seat, Diet, CertType, Company, VIPCard, CertInfo}}) => {
    newState.baseInfo.empno = BaseInfo[0].Empno;
    newState.baseInfo.name = BaseInfo[0].ChName;
    newState.baseInfo.dept = BaseInfo[0].Deptcode;
    newState.baseInfo.enName = BaseInfo[0].EnName;
    newState.baseInfo.ziDeng = BaseInfo[0].JobName;
    newState.baseInfo.hireDate = BaseInfo[0].HireDate;
    newState.baseInfo.birthDate = BaseInfo[0].BirthDate;
    newState.baseInfo.sex = BaseInfo[0].Sex === 'M'? '男' : '女';
    newState.baseInfo.phone = BaseInfo[0].Phone;
    newState.baseInfo.eMail = BaseInfo[0].Mail;
    newState.baseInfo.areaData = Country;
    newState.baseInfo.seat = Seat;
    newState.baseInfo.eat = Diet;
    newState.baseInfo.hobby = Hobby[0];
    if(Hobby.length > 0){
        newState.baseInfo.areaSelectData = Hobby[0].Country;
        newState.baseInfo.seatSelectData = Hobby[0].SeatType;
        newState.baseInfo.hobbySelectData = Hobby[0].FoodType;
        newState.baseInfo.remark = Hobby[0].Remark;
    }else{
        newState.baseInfo.areaSelectData = '';
        newState.baseInfo.seatSelectData = '';
        newState.baseInfo.hobbySelectData = '';
        newState.baseInfo.remark = '';
    }
    newState.vipAndHobby.company = Company;
    newState.vipAndHobby.companyAndCard = VIPCard;
    newState.cardInfo.cardCategory = CertType;
    for(let i = 0 ,len = CertInfo.length;i<len;i++){
        if(CertInfo[i].CertValidTime) CertInfo[i].CertValidTime = formatDate(CertInfo[i].CertValidTime);
        if(CertInfo[i].SignValidTime) CertInfo[i].SignValidTime = formatDate(CertInfo[i].SignValidTime);
        if(CertInfo[i].TaiwanValidTime) CertInfo[i].TaiwanValidTime = formatDate(CertInfo[i].TaiwanValidTime)
    }
    newState.cardInfo.data = CertInfo;
    return newState;
}
  //區域選擇
const areaData = (newState, action) => {
    newState.baseInfo.areaSelectData = action.data;
    return newState;
}
//航空公司和卡號
const addCompanyAndCard =(newState, {companyInfo, card}) => {
    const obj = { 
            value: companyInfo.value,
            company: companyInfo.text,
            cardNo: card
        }
    for (const {cardNo} of newState.vipAndHobby.companyAndCard) {
        if(cardNo === card){
            message.warning('卡號重複');
            return newState;
        }
    }
    newState.vipAndHobby.companyAndCard.push(obj);
    console.log(obj)
    return newState;
}

//刪除航空公司和卡號
const deleCompanyCard =(newState, {i}) => {
    newState.vipAndHobby.companyAndCard.splice(i, 1);
    return newState;
}

//座位選擇
const siteChange =(newState, {data}) => {
    newState.baseInfo.seatSelectData = data;
    return newState;
}

//愛好選擇
const hobbyChange =(newState, {data}) => {
    newState.baseInfo.hobbySelectData = data;
    return newState;
}

//備註
const remarkChange =(newState, {data}) => {
    newState.baseInfo.remark = data;
    return newState;
}

//card信息增加
const cardNewAdd =(newState, {data}) => {
   
    return newState;
}
export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面數據
        case actionTypes.PAGE_DATA:
            return pageData(newState, action);

        //區域選擇
        case actionTypes.AREA_DATA:
            return areaData(newState, action);

        //航空公司和卡號
        case actionTypes.ADD_COMPANY_AND_CARD:
            return addCompanyAndCard(newState, action);

        //刪除航空公司和卡號
        case actionTypes.DEL_COMPANY_CARD:
            return deleCompanyCard(newState, action);

        //座位選擇
        case actionTypes.SITE_CHANGE:
            return siteChange(newState, action);

        //愛好選擇
        case actionTypes.HOBBY_CHANGE:
            return hobbyChange(newState, action);

        //備註
        case actionTypes.REMARK_CHANGE:
            return remarkChange(newState, action);

        //card信息增加
        case actionTypes.CARD_NEW_ADD:
            return cardNewAdd(newState, action);


        default:
            return newState;
    }
}