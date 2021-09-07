// including reducer functions, return a new state according to previous state and action

import {combineReducers} from 'redux'

function xxx(state = 0, action) {
    return state
}

function yyy(state = 0, action) {
    return state
}
    // 返回合并后的reducer 函数
export default combineReducers({
    xxx,
    yyy
})
