import React, {Component} from 'react'
import {
    NavBar, 
    WingBlank, 
    List, 
    InputItem, 
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import Logo from  '../../components/logo/logo'


const ListItem = List.Item;

export default class Register extends Component {
    state = {
        username:'',
        password:'',
        password2:'',
        type:'dashen', 
    }
    
    register = () => {
        console.log(this.state)
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val //属性名不是name，而是name的值
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }
    
    render () {
        const {type} = this.state
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码:</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注册</Button>
                        <Button onClick={this.toLogin}>已有帐户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}