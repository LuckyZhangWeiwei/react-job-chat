import React from 'react';
import axios from 'axios';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount(){
        this.props.getUserList(`employee`);
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

export default Boss;