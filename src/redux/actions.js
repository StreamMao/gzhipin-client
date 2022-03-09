// including a few action creators
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST } from './action-types'
import {reqRegister, 
        reqLogin, 
        reqUpdateUser, 
        reqUser,
        reqUserList
    } from '../api'

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