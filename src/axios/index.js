import JsonP from 'jsonp'
import axios from 'axios'
import { hahaha } from "../utils";
import { message } from 'antd';
import {baseURL} from "./baseURL";
import { LOGIN, LOGIN_TRAVEL } from "../config/api";

var ajax = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 10000,
  })
export default class Axios{
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }

    // 发送 GET 请求
    static get(options){
        return new Promise((resolve,reject)=>{
            ajax({
                url:options.url,
                method:'get',
                withCredentials:true,
                params:options.data || '',
                loading:options.loading
            }).then((response)=>{
                if(response.status === 200){
                        resolve(response.data);
                }else{
                    reject(response.data);
                }
            }).catch(err=>{
                message.error('error : 請求錯誤',2);
                console.log(err)
            })
        })
    }

    // 发送 POST 请求
    static post(options){
        return new Promise((resolve,reject)=>{
            ajax({
                method: 'post',
                url: options.url,
                data: formatPostData(options.data, options.format) || '',
                loading:options.loading,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then((response)=>{
                if(response.status === 200){
                        resolve(response.data);
                }else{
                    reject(response.data);
                }
            }).catch(err=>{
                reject(err)
            });
        })
    }
}


// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
    // console.log(unescape(hahaha()), 'color: green; font-weight: bold');
    if(!new RegExp(`^(${LOGIN})$|^(${LOGIN_TRAVEL})$`).test(config.url)){      
        let user = sessionStorage.getItem('user');
        let token = sessionStorage.getItem('token');
        let userId = sessionStorage.getItem('userId');
        if(user && token && userId){
            config.headers.common['Authorization'] = token;
        }else{
            window.location.hash = '/home';
            sessionStorage.setItem('user', '');
        }
    }else{

    }
    return config;
  }, function (error) {   
    return Promise.reject(error);
  });

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
    if(response.data.code === 2){
        sessionStorage.setItem('userId', '');
        sessionStorage.setItem('category', '');
        sessionStorage.setItem('user', '');
        window.location.hash = '/';
    }
    const token = response.config.headers.Authorization || response.data.token;
    if(token){
        sessionStorage.setItem('token', token);
        return response;
    }else{
        sessionStorage.setItem('userId', '');
        sessionStorage.setItem('category', '');
        sessionStorage.setItem('user', '');
        window.location.hash = '/';
        return response;
    }
    
  }, function (error) {
    return Promise.reject(error);
  });


/**
 * 格式化post提交數據
 * @param {object} data 
 */
const formatPostData = (data, format) => {
    let formData = new FormData();
    if(data instanceof FormData){
        return data;
    }
    if(typeof data === 'object' && !format){
        data = JSON.stringify(data);
        formData.append('data', data);
    }else if(typeof data === 'object'){
        for (const v of Object.keys(data)) {
            if(typeof data[v] === 'object'){
                formData.append(v, JSON.stringify(data[v]));
            }else{
                formData.append(v, data[v]);
            } 
        }
    }
    return formData;
}

