import * as actionTypes from './actionTypes';
import { navConfig, navConfigTravel, navConfigCommon } from "../../config/navConfig";
const defaultState = {
    navConfig,
    navConfigTravel,
    navConfigCommon
};

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    let navConfig1;
    if(sessionStorage.getItem('category') === 'travel'){
        navConfig1 = newState.navConfigTravel
    }else{
        navConfig1 = newState.navConfig;
    }
    switch (action.type) {
        //当刷新页面后导航样式对应于激活状态的链接
        case actionTypes.CHANGE_NAV_ONLOAD:
            for (let item of navConfig1) {
                if(item.children && action.navData.path.indexOf(item.path) !== -1){
                    for (let v of item.children) {   
                        if(action.thisNav.indexOf(v.path)){          
                            v['active'] = false;
                        }else{
                            v['active'] = true;
                        }
                    }
                }
            }
            return newState;

        //点击左边导航，激活对应状态
        case actionTypes.CHANGE_NAV:
            for (let item of navConfig1) {
                if(item.children){                          //最外层循环
                    for (let v of item.children) {         //内部循环
                        if(action.path=== v.path){          //如果路径相同，则启用激活样式，否则为false
                            v['active'] = true;
                        }else{
                            v['active'] = false;
                        }
                    }
                }
            }
            return newState;

            //点击头部导航默认显示第一个左边导航，激活其状态
        case actionTypes.HEADER_NAV_CLICK:
            for (let item of navConfig1) {
                if(item.path === action.path){
                    if(item.children){ 
                        for (let v of item.children) {         
                            v['active'] = false;
                        }
                        item.children[0]['active'] = true;
                    }
                }
            }
            return newState;

            //鼠标移入时显示头部二级菜单
        case actionTypes.HEADER_NAV_OVER:
            for (let item of navConfig1) {
                if(item.path === action.path){
                    item.childrenShow = true;
                }else{
                    item.childrenShow = false;
                }
            }
            return newState;

             //鼠标移出时隐藏头部二级菜单
        case actionTypes.HEADER_NAV_LEAVE:
            for (let item of navConfig1) {
                item.childrenShow = false;
            }
            return newState;
        
    
        default:
            break;
    }
    return newState;
    
}