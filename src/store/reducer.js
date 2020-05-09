import { combineReducers } from 'redux';
import { reducer as loginReducer } from "../pages/login/store";
import { reducer as commonPageReducer } from "../commonPages/store";
import fillFormReducer from "../pages/purchaseTicket/store";
import personInfoReducer from "../pages/personInfo/store";
import signReducer from '../pages/sign/store'
import ordersReducer from '../pages/orders/store'
import { reducer as travelAgencyPlatformReducer } from '../pages/travelAgencyPlatform/store'
import { reducer as adminMaintainReducer } from "../pages/adminMaintain/store";

//使用combine使小的reducer组成一个总的reducer
const reducer = combineReducers({
    loginReducer,
    commonPageReducer,
    fillFormReducer,
    signReducer,
    personInfoReducer,
    travelAgencyPlatformReducer,
    ordersReducer,
    adminMaintainReducer
});
export default reducer;