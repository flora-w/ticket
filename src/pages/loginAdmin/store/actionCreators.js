import axios from "../../../axios";
import { LOGIN_ADMIN } from "../../../config/api";
import { message } from "antd";
import { actionTypes } from "./index";
export const login = (history, values, category) => {
  const formData = new FormData();
  formData.append('Account', new Buffer(values.userName).toString('base64'));
  return dispatch => {
    const url = LOGIN_ADMIN;
    dispatch({type: actionTypes.LOADING});  //启用loading效果
    axios.post({url, data: formData})
    .then(res => {
      if(res.code === 1){
        sessionStorage.setItem('user', res.data.Name);   //保存登陆者姓名
        sessionStorage.setItem('userId', res.data.User_id);   //保存登陆者工号
        sessionStorage.setItem('category', category);   //保存登陆者類型
        sessionStorage.setItem('token', res.data.token);
        dispatch({type: actionTypes.LOGIN_SUCCESS});
        history.push('/'); //成功之后跳转到首页
      }else{
        dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
        message.warning(res.message)
      } 
    })
    .catch(err => {
      dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
      message.warning('请求出错');
      console.log(err)
    })
  }
}