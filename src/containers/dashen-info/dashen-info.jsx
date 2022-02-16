/*
大神信息完善的路由容器组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class LaobanInfo extends Component {
     render () {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <AvatarSelector />
                <InputItem placeholder='请输入求职岗位'>求职岗位：</InputItem>
                <InputItem placeholder='请输入个人介绍'>个人介绍：</InputItem>
                {/* <TextareaItem title="职位要求"
                            rows={3}/> */}
                <Button type='primary'>保存</Button>
            </div>
        )
    }
}

export default connect (
    state => ({}),
    {}
)(LaobanInfo)

