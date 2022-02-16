/*
大神信息完善的路由容器组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

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
        console.log(this.state)
    }

    render () {
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
    state => ({}),
    {}
)(DashenInfo)

