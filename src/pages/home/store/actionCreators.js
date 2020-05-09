import axios from "../../../axios/";
import * as actionTypes from './actionTypes';

export const canAutoLogin = () =>{
    return {
        type:actionTypes.AUTO_LOGIN,
    }
}

export const autoLogin = () =>{
    // let a = document.cookie;
    // a = a.split(';');
    // console.log(a)
    return dispatch =>{
        dispatch(canAutoLogin())
    }
}