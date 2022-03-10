import { io } from "socket.io-client";
// including a few action creators
import { AUTH_SUCCESS, 
        ERROR_MSG, 
        RECEIVE_USER, 
        RESET_USER, 
        RECEIVE_USER_LIST,
        RECEIVE_MSG_LIST,
        RECEIVE_MSG,
        MSG_READ
    } from './action-types'
import {reqRegister, 
        reqLogin, 
        reqUpdateUser, 
        reqUser,
        reqUserList,
        reqChatMsgList,
        reqReadMsg
    } from '../api'


/* 
单例对象：
1.创建对象之前：判断对象是否已经存在，只有不存在才去创建
2.创建对象之后：保存对象
*/
function initIO(dispatch, userid) {
  if (!io.socket) {
    // 连接服务器, 得到代表连接的socket 对象
    //  保存对象
    io.socket = io("ws://localhost:4000");

    // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
    io.socket.on("receiveMsg", function (chatMsg) {
      console.log("浏览器端接收到消息:", chatMsg);
      //只有当chatMsg是与当前用户相关的消息，才去分发同步action保存消息
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid));
      }
    });
  }
}

//异步获取消息列表数据
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid);
  const response = await reqChatMsgList();
  const result = response.data;
  if (result.code === 0) {
    const { users, chatMsgs } = result.data;
    //分发同步action
    dispatch(receiveMsgList({ users, chatMsgs, userid }));
  }
}

//发送消息的异步action
export const sendMsg = ({from, to , content}) => {
    return dispatch => {
        console.log('发送消息', {from, to , content})
        // initIO()
        //发消息
        io.socket.emit('sendMsg', {from, to , content})
    }
}
//读取消息的异步action
export const readMsg = (from, to) => { 
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result= response.data
        if(result.code===0) {
            const count = result.data
            dispatch(msgRead({count, from, to}))
        }
    }
}


//授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
//接受用户的同步action
const receiveUser = (user) => ({type:RECEIVE_USER, data:user})
//重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
//接收用户列表的同步action
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
//接收消息列表的同步action
export const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})
//接收一个消息的同步action
export const receiveMsg = (chatMsg, userid) => ({ type: RECEIVE_MSG, data: {chatMsg, userid} });
//读取了某个聊天消息的同步action
const msgRead = ({count, from, to}) => ({ type:MSG_READ, data: {count, from, to}})

//注册异步action
export const register = (user) => {
    const {username, password, password2, type} = user
    //做表单的前排验证，如果不通过，分发一个errMsg的同步action
    if(!username) {
        return errorMsg('Please input the username!')
    } else if(password !== password2) {
        return errorMsg('password does not match!')
    }
    //表单数据和发，返回一个ajax请求的一异步action函数
    
    return async dispatch => {
        //发送注册的异步ajax请求

        /* 
        //用promise的写法，此时所在函数不需要声明为async
        const promise = reqRegister(user) 
        promise.then(response => {
            const result = response.data //{code: 0/1, data:user, msg:''}
        })
        */
        
        //用async, await的写法
        const response = await reqRegister({username, password, type}) //reqRegister()返回promise, 用await表示“等”response,可以直接得到response. 声明await的语句所在的函数就必须声明成async
        const result = response.data
        if (result.code === 0) { //成功
            getMsgList(dispatch, result.data._id);
            //授权成功的同步action
            dispatch(authSuccess(result.data))
        } else { //失败
            // 分发错误提示信息的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}

//登录异步action
export const login = (user) => {
    const {username, password} = user
    //做表单的前排验证，如果不通过，分发一个errMsg的同步action
    if(!username) {
        return errorMsg('Please input the username!')
    } else if(!password) {
        return errorMsg('Please input the password!')
    }
    
    return async dispatch => {
        //发送注册的异步ajax请求
       
        /* 
        //用promise的写法，此时所在函数不需要声明为async
        const promise = reqLogin(user) 
        promise.then(response => {
            const result = response.data //{code: 0/1, data:user, msg:''}
        })
        */
        
        //用async, await的写法
        const response = await reqLogin(user) //reqRegister()返回promise, 用await表示“等”response,可以直接得到response. 声明await的语句所在的函数就必须声明成async
        const result = response.data
        if (result.code === 0) { //成功
            getMsgList(dispatch, result.data._id);
            //授权成功的同步action
            dispatch(authSuccess(result.data))
        } else { //失败
            // 分发错误提示信息的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}

//更新用户异步actjion
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)//通过设置好的api向服务器发请求
        const result = response.data
        if (result.code===0) {//更新成功：data
            dispatch(receiveUser(result.data))
        } else {//更新失败：msg
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户异步action
export const getUser = () => {
    return async dispatch => {
        //执行异步ajax请求
        const response = await reqUser()
        const result = response.data
        if(result.code===0) {//成功
            getMsgList(dispatch, result.data._id);
            dispatch(receiveUser(result.data))
        } else {//失败
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表的异步action
export const getUserList = (type) => {
    return async dispatch => {
        //执行异步ajax请求
        const response = await reqUserList(type)
        const result = response.data
        if(result.code===0) {//成功
            dispatch(receiveUserList(result.data))
        } 
    }
}