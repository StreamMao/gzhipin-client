/*
选择用户头像的组件
*/

import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends Component {
    
    static propTypes = {
        setAvatar: PropTypes.func.isRequired
    }

    state = {
        icon: null
    }

    constructor(props) {
        super(props)
        //prepare the data for avatar list
        this.avatarList = []
        for (let i = 0; i < 20; i++) {
            this.avatarList.push({
                text: '头像' + (i+1),
                icon: require(`./images/头像${i+1}.png`)
            })
        }
    }
    
    handleClick = ({text, icon}) => {
        //update current component state
        this.setState({icon})
        //update father component state
        this.props.setAvatar(text)
    }
    
    render() {
        //Avatar view parts
        const {icon} = this.state
        const listHeader= !icon ? "Please select a avatar" : (
            <div>
                Avatar Selected:<img src={icon} alt="avatar"/>
            </div>
        )
        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.avatarList} 
                    columnNum={5} 
                    onClick={this.handleClick}/>
            </List>
        )
    }
}