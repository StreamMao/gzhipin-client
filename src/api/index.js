// 包含了n个接口请求的函数模块
// 函数返回值为：promise

import ajax from "./ajax"

//register接口
export const reqRegister = (user) => ajax('/register', user, 'POST')
//login接口
export const reqLogin = (user) => ajax('/login', user, 'POST')

//update user接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')