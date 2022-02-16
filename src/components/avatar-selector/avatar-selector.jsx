/*
选择用户头像的组件
*/

import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'

export default class AvatarSelector extends Component {
    constructor(props) {
        super(props)
        //prepare the data for avatar list
        this.avatarList = []
        for (let i = 0; i < 20; i++) {
            this.avatarList.push({
                text: 'Avatar' + (i+1),
                icon: require(`./images/头像${i+1}.png`)
            })
        }
    }
    
    avatarList
    
    render() {
        //Avatar view parts
        const listHeader="Please select a avatar"
        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.avatarList} columnNum={5} />
            </List>
        )
    }
}