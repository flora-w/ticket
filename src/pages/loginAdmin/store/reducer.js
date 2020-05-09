import * as actionTypes from "./actionTypes";
const defaultState = {
    login: false,
    loading: false,
};

/**
 * 登陆成功
 */
const loginSuccess = (newState, action) => {
  newState.login = true;
  newState.loading = false;
  return newState;
}

/**
 * loading
 */
const loading = (newState, action) => {
    newState.loading = true;
    return newState;
}

/**
 * 登陸失敗
 */
const loginFail = (newState, action) => {
    newState.loading = false;
    return newState;
}
export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(newState, action);

        case actionTypes.LOADING:
            return loading(newState, action);

        case actionTypes.LOGIN_FAIL:
            return loginFail(newState, action);

        default:
            break;
    }
    return newState;
    
}