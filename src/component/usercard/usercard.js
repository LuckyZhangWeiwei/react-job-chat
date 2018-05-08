import React from 'react';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'

@withRouter
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
            v.avatar ? (<Card key={v._id} onClick={()=>{this.props.history.push(`/chat/${v.user}`)}}>
                 <Header 
                    title={v.user}
                    thumb={require(`./../avatar-selector/imgs/${v.avatar}.png`)}   
                    extra={<span>{v.title}</span>}>  
                 </Header>
                 <Body>
                     {v.usertype==='boss'?<p>公司:{v.company}</p>:null}
                     {v.desc.split('\n').map(v=>(<p key={v}>{v}</p>))}
                     {v.usertype==='boss'?<p>薪资:{v.salary}</p>:null}
                 </Body>
            </Card>):null
         ))}
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
        </WingBlank>
        )
    }
}
export default UserCard;