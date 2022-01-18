import React, {Component} from 'react'
import {
    NavBar, 
    WingBlank, 
    List, 
    InputItem, 
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {login} from '../../redux/actions'
import Logo from  '../../components/logo/logo'

class Login extends Component {
    state = {
        username:'',
        password:'',
    }
    
    login = () => {
        this.props.login(this.state)
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val //属性名不是name，而是name的值
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }
    
    render () {
        const {msg, redirectTo} = this.props.user
        //如果redirectTo有值，就需要重定向到指定的路由
        if(redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg? <div className="error-msg">{msg}</div> :null}
                        <WhiteSpace />
                        <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />

                        <Button type="primary" onClick={this.login}>登陆</Button>
                        <Button onClick={this.toRegister}>未注册帐户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default  connect(
    state => ({user: state.user}),
    {login}
)(Login)