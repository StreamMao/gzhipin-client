// including reducer functions, return a new state according to previous state and action

import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'

const initUser = {
    username:'',
    type: '',
    msg: '',//错误提示信息
}

function user(state=initUser, action) {
    switch(action.type) {
        case AUTH_SUCCESS: //data is user
            return {...state, ...action.data}
        case ERROR_MSG: //data is msg
            return {...state, msg:action.data}
        default:
            return state
    }
}



// 返回合并后的reducer 函数
export default combineReducers({
    user
})
