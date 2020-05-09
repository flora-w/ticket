import * as actionTypes from "./actionTypes";
const defaultState = {
    info:null,
};

const loginInfo = (newState,action) =>{
    return newState;
}


export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTypes.GET_PROJECT_NAME:
           
            return newState;
        case actionTypes.AUTO_LOGIN:
            return loginInfo(newState,action);


        default:
            break;
    }
    return newState;
    
}