/*
大神信息完善的路由容器组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {updateUser} from '../../redux/actions'

class DashenInfo extends Component {

    state = {
        avatar: '',
        post: '',
        info:'',
    }
    //update Avatar
    setAvatar =(avatar) => {
        this.setState({
            avatar
        })
    }
    
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    render () {
        //如果信息已经完善，自动重定向到对应的主界面
        const {avatar, type} = this.props.user
        if (avatar) { //说明信息已经完善  
            const path = type === 'dashen' ? '/dashen':'/laoban'
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <AvatarSelector setAvatar={this.setAvatar} />
                <InputItem placeholder='请输入求职职位' onChange={val => {this.handleChange('post', val)}}>求职职位：</InputItem>
                <TextareaItem title="个人介绍:"
                            rows={3}
                            onChange={val => {this.handleChange('info', val)}} />
                <Button type='primary' onClick={this.save}>保存</Button>
            </div>
        )
    }
}

export default connect (
    state => ({user:state.user}),
    {updateUser}
)(DashenInfo)

