import React from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

@withRouter
class NavLinkBar extends React.Component{
    static propTypes={
        data:PropTypes.array.isRequired
    }
    constructor(props){
        super(props)
    }
    render(){
        const navList=this.props.data.filter(v=>!v.hide);
        const {pathname}=this.props.location;
        return (
            <TabBar>
                {
                    navList.map(v=>(
                        <TabBar.Item
                           key={v.path}
                           title={v.title}
                           icon={{uri:require(`./images/${v.icon}.png`)}}
                           selectedIcon={{uri:require(`./images/${v.icon}-active.png`)}}
                           selected={pathname===v.path}
                           onPress={()=>{this.props.history.push(v.path)}}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default NavLinkBar;