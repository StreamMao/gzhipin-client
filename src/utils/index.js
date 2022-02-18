// 工具函数模块

/*
用户注解main路由
    dashen: /dashen
    laoban: /laoban
用户信息完善界面路由
    dashen:/dasheninfo
    laoban:/laobaninfo
判断用户是否已经完善信息？user.avatar是否有值
判断用户类型：user.type
*/
export function getRedirectTo(type, avatar) {
    let path = ''
    if(type==='laoban') {
        path = '/laoban'
    } else {
        path = '/dashen'
    }

    if(!avatar) {
        path += 'info'
    }
    return path
}

