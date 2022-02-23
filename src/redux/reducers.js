// including reducer functions, return a new state according to previous state and action

import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from './action-types'

import {getRedirectTo} from '../utils'

const initUser = {
    username:'',
    type: '',
    msg: '',//错误提示信息
    redirectTo:''//需要自动重定向的路由路径
}

//产生user状态的reducer
function user(state=initUser, action) {
    switch(action.type) {
        case AUTH_SUCCESS: //data is user
            const {type, avatar} = action.data
            return {...action.data, redirectTo: getRedirectTo(type, avatar)}
        case ERROR_MSG: //data is msg
            return {...state, msg:action.data}
        case RECEIVE_USER: //data is user
            return action.data
        case RESET_USER: //data is msg
            return {...initUser, msg:action.data}
        default:
            return state
    }
}



// 返回合并后的reducer 函数
export default combineReducers({
    user
})

