//大神主界面路由容器组件
import React, { Component } from 'react'
import {connect} from 'react-redux'

class Laoban extends Component {
    state = {  } 
    render() { 
        return (
            <div>Loaban</div>
        );
    }
}
 
export default connect(
    state => ({}),
    {}
)(Laoban);