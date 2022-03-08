//个人界面路由容器组件
import React, { Component } from 'react'
import {connect} from 'react-redux'

class Personal extends Component {
    state = {  } 
    render() { 
        return (
            <div>personal</div>
        );
    }
}
 
export default connect(
    state => ({}),
    {}
)(Personal);