import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

//希望在非路由组件中使用路由库的api
// withRouter()
class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
  
    render() {
        let {navList, unReadCount} = this.props
        //过滤掉hidden为true的nav
        navList = navList.filter(nav => !nav.hidden)
        const path = this.props.location.pathname //请求的path
        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item key={nav.path} 
                            title={nav.title}
                            badge={nav.path === '/message' ? unReadCount : 0}
                            icon={{uri: require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                            selected={path === nav.path}
                            onPress={() => this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        )
  }
}

//向外暴露withRouter()包装产生的组件
//内部会向组件中传入一些路由组件的特有属性：history/location/math
export default withRouter(NavFooter) 
