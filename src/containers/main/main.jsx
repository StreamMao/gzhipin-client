import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux' 
import Cookies from 'js-cookie' //可以操作前端cookie的对象 some method: set()/get()/remove()
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {
    navList = [
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        //如果之前有登陆过（cookie中有userid），但此次还没有登陆（redux管理的user中没有_id），发请求获取对应的user；
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id) {
            //发送异步请求，从后端获取user信息
            console.log('发送ajax请求获取user')
            this.props.getUser()
        }
    }

    render () {
        //读取cookie中的额userid
        const userid = Cookies.get('userid')
        //如果cookie中没有userid，自动重定向到登陆界面
        if (!userid) {
            return <Redirect to='/login'/>
        }
        //如果有cookie中有userid，接着读取redux中的user state
        const {user} = this.props
        //如果Redux中user没有_id，返回null(不做任何显示)，等待从后端获取user信息
        if (!user._id) {
            return null
        } else {
            //如果有_id, 说明已经登陆，显示对应的界面
            //如果请求根路径，根据user type和是否完善信息(user.avatar)的情况, 来决定重定向的路由路径， 并自动重定向
            let path = this.props.location.pathname
            if (path === '/') {
                // 得到一个重定向的路由路径
                path = getRedirectTo(user.type, user.avatar)
                return <Redirect to={path} />
            }
        }
        
        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path) //得到当前的nav，可能没有

        if(currentNav) {
            //决定哪个路由需要隐藏
            if (user.type === 'laoban') {
                //隐藏数组的第2个，dashen
                navList[1].hidden = true;
            } else {
                //隐藏数组的第1个，laoban
                navList[0].hidden = true;
            }
        }

        return (
            <div>
                {/* //控制导航头部出不出现 */}
                {currentNav ? <NavBar className="sticky-header">{currentNav.title}</NavBar> : null} 
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/laobaninfo' component={LaobanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route path='/chat/:userid' component={Chat}/>

                    <Route component={NotFound}/>
                </Switch>
                {/* 控制底部导航栏出不出现 */}
                {currentNav ? <NavFooter navList={navList} /> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {getUser}
)(Main)

/*
1.实现自动登陆
    1）如果之前有登陆过（cookie中有userid），但此次还没有登陆（redux管理的user中没有_id），发请求获取对应的user， 
    此过程需要时间，期间暂时不做任何显示
    2）如果cookie没有userid，直接重定向到login
    3）判断redux状态管理中user中是否有_id。如果没有，暂时不做任何显示
    4）如果有，说明当前已经登陆，显示对应的界面
    5）如果请求根路径：根据user type和是否完善信息(user.avatar)的情况, 来决定重定向的路由路径， 并自动重定向
    
    Note: 1)在componentDidMount()中实现： 2)-5)在render()中实现
*/