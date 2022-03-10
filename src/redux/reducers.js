// including reducer functions, return a new state according to previous state and action

import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
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

const initUserList = []
//产生userlist状态的reducer
function userList(state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST: //data值为userList
            return action.data
        default:
            return state
    }
}

const initChat = {
    users:{}, //所有用户信息的对象 属性名：userid，属性值是：{username, avatar}
    chatMsgs:[], //当前用户所有相关的msg数组
    unReadCount: 0 //总的未读数量
}
//产生聊天状态的reducer
function chat(state=initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST: //data:{users, chatMsgs}
            const {users, chatMsgs, userid} =action.data
            return { 
                users, 
                chatMsgs, 
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read&&msg.to===userid? 1:0), 0)
                // unReadCount: 0
            }
        case RECEIVE_MSG: //data: chatMsg
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            } 
        default:
            return state
    }
}

// 返回合并后的reducer 函数
export default combineReducers({
    user,
    userList,
    chat
})
//向外暴露状态的结构：{user:{}, userList:[], chat:{}}

