import { notification } from 'antd';
/**
 * 获取cookie
 */
    export function getCookie(cookieName){
        let arr1 = document.cookie.split(';');
        for (let value of arr1) {
            let arr2 = value.split('=');
            if(arr2[0].trim() ===cookieName){
                return new Buffer(arr2[1],'base64').toString()  //解码
            }
        }
        return null;
    }

/**
 * 删除cookie
 */
    export function deleteCookie(cookieName){
        let exp = new Date();
        exp.setTime(exp.getTime() -1);
        let val = getCookie(cookieName);
        document.cookie = `${cookieName}=${val};expires=${exp.toUTCString()}`;
    }

/**
 * 格式化时间
 */
    export const formatDate = (d, flag = '-', hasTime) => {
        // d = d.replace(/[\u4e00-\u9fa5]+/g, '');
        const date = new Date(d);
        if(date.toString() === 'Invalid Date'){
            return null
        }
        const year = date.getFullYear();
        const month = date.getMonth()+1 > 9? date.getMonth()+1 : '0' + (date.getMonth()+1);
        const day = date.getDate() > 9? date.getDate() : '0' + (date.getDate());
        const hours = date.getHours() > 9? date.getHours() : '0' + (date.getHours());
        const minutes = date.getMinutes() > 9? date.getMinutes() : '0' + (date.getMinutes());
        const seconds = date.getSeconds() > 9? date.getSeconds() : '0' + (date.getSeconds());  
        if(hasTime){
            return  year + flag + month + flag + day + ' ' + hours + ':' + minutes + ':' + seconds
        }else{
            return  year + flag + month + flag + day;
        }
    }

/**
 * 组合函数
 */
    export const compose = (...funcs) => component => {
        if (funcs.lenght === 0) {
          return component;
        }
        const last = funcs[funcs.length - 1];
        return funcs.reduceRight((res, cur) => cur(res), last(component));
      };

/**
 * 返回单个的栏位页面文本值
 */
export const getText = (code, arr, name) => {
    for (const v of arr) {
      if(Object.values(v).includes(code)){
        return v[name];
      }
    }
    return null;
  }
  
  /**
   * 将栏位的key和value的方式返回
   */
export const getArrText = (codeArr, arr, codeName) => {
    let id = codeArr;
    let name = [];
    for (const v of codeArr) {
      name.push(getText(v, arr, codeName));
    }
    return { id, name }
  }

/**
 * 获取url参数
 */
export const getUrlParam = (params, key) => {
    let paramStr = params;
    if(params.indexOf('?') === 0){
        paramStr = params.slice(1);
    }
    let paramArr = paramStr.split('&');
    for (let v of paramArr) {
        let vArr = v.split('=');
        if(vArr[0] === key){
            return decodeURIComponent(vArr[1]);
        }
    }
    return null;
}

export const showNotification = ({type, message, duration=4.5, description, placement='topRight', onClose}) => (
    notification[type]({
        description,
        duration,
        message,
        onClose,
        placement
    })
)
    

// /**
//  * other
//  */
// export const hahaha = () => {
//     return "%25c%u65F6%u95F4%u8FC7%u5F97%u771F%u5FEB%uFF0C%u8FD9%u4E2A%u9879%u76EE%u662F%u6211%u4EEC%u4E00%u8D77%u505A%u7684%u7B2C%u4E00%u4E2A%u8F83%u5927%u7684%u9879%u76EE%uFF0C%u5B83%u5C31%u50CF%u6211%u4EEC%u7684%u5B69%u5B50%u4E00%u6837%uFF0C%u4ECE%u6700%u521D%u7684%u73AF%u5883%u642D%u5EFA%uFF0C%u5230%u6574%u4E2A%u9879%u76EE%u7684%u8FD0%u4F5C%uFF0C%u521D%u73B0%u96CF%u5F62%uFF0C%u4E00%u6B65%u6B65%u7684%u770B%u7740%u5B83%u6210%u957F%u3002%0A%u9700%u6C42%u7684%u4E0D%u65AD%u589E%u52A0%uFF0C%u4E5F%u8BA9%u5B83%u4ECE%u4E00%u4E2A%u5C0F%u5B69%u5B50%u6210%u957F%u4E3A%u4E00%u4E2A%u5927%u5B69%u5B50%u3002%u6BCF%u4E00%u6B21bug%u7684%u4FEE%u6539%uFF0C%u628A%u5B83%u5E7C%u5C0F%u7684%u5FC3%u7075%u4ECE%u4ECE%u7070%u6697%u7684%u89D2%u843D%u62C9%u56DE%u6B63%u8F68%u3002%0A%u5B83%u662F%u6211%u4EEC%u5171%u540C%u7684%u7ED3%u6676%uFF0C%u51DD%u805A%u4E86%u6240%u6709%u4EBA%u7684%u5FC3%u8840%u548C%u6C57%u6C34%u3002%u671F%u95F4%u7684%u8FF7%u832B%u3001%u65E0%u5948%u3001%u5206%u6B67%u3001%u559C%u60A6%u751A%u81F3%u6124%u6012%uFF0C%u8FD9%u4E9B%u9178%u751C%u82E6%u8FA3%uFF0C%u6B63%u662F%u6211%u4EEC%u6210%u957F%u7684%u5171%u540C%u89C1%u8BC1%u3002%0A%u5E0C%u671B%u6211%u4EEC%u7684%u56E2%u961F%u8D8A%u6765%u8D8A%u597D%uFF0C%u5E0C%u671B%u6211%u4EEC%u6BCF%u4E2A%u4EBA%u90FD%u80FD%u6210%u4E3A%u81EA%u5DF1%u60F3%u8981%u6210%u4E3A%u7684%u90A3%u4E2A%u4EBA%u3002%0A%u6700%u540E%uFF1A%u5F92%u5F1F%uFF01%u4F60%u662F%u6700%u68D2%u7684%uFF01"
// }