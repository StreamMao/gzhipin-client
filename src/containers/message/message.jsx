//消息界面路由容器组件
import React, { Component } from 'react'
import {connect} from 'react-redux'

class Message extends Component {
    state = {  } 
    render() { 
        return (
            <div>message</div>
        );
    }
}
 
export default connect(
    state => ({}),
    {}
)(Message);