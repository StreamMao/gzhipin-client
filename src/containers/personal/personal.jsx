//个人界面路由容器组件
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'


const Item = List.Item
const Brief = Item.Brief



class Personal extends Component {
    logout = () => {
        Modal.alert('Exit', 'Are you sure to exit', [
            {
                text: 'cancel'
            },
            {
                text: 'confirm',
                onPress: () => {
                    //删除cookiez中的userid
                    Cookies.remove('userid')
                    //删除redux中的user
                    this.props.resetUser()
                }
            }
        ])
    }

    render() { 
        const {username, info, avatar, company, post, salary} = this.props.user
        return (
            <div>
                <Result
                    img={<img src={require(`../../assets/images/${avatar}.png`)} style={{width: 50}}
                    alt="header"/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资: {salary}</Brief> : null}
                        
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        );
    }
}
 
export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal);