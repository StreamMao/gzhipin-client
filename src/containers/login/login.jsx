import React, {Component} from 'react'
import {
    NavBar, 
    WingBlank, 
    List, 
    InputItem, 
    WhiteSpace,
    Button
} from 'antd-mobile'
import Logo from  '../../components/logo/logo'

export default class Register extends Component {
    state = {
        username:'',
        password:'',
    }
    
    login = () => {
        console.log(this.state)
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
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
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