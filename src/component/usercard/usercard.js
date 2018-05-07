import React from 'react';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';

class UserCard extends React.Component{
    static propTypes={
        userList:PropTypes.array.isRequired
    }
    render(){
        const Header=Card.Header;
        const Body=Card.Body;
        return (
            <WingBlank>
            <WhiteSpace/>
         {this.props.userList.map(v=>(
            v.avatar ? (<Card key={v._id}>
                 <Header 
                    title={v.user}
                    thumb={require(`./../avatar-selector/imgs/${v.avatar}.png`)}   
                    extra={<span>{v.title}</span>}>  
                 </Header>
                 <Body>
                     {v.desc.split('\n').map(v=>(<p key={v}>{v}</p>))}
                 </Body>
            </Card>):null
         ))}
        </WingBlank>
        )
    }
}
export default UserCard;