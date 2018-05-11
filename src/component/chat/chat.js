import React from 'react';
import {List,TextareaItem,NavBar,Icon,Button} from 'antd-mobile';
import {connect}from 'react-redux';
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux';

@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg}  
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:''
        }
    }
    componentDidMount(){
        this.props.getMsgList();
        this.props.recvMsg();
    }
    handleSubmit(){
        if(!this.state.text){
            return null;
        }
      const from =this.props.user._id;
      const to=this.props.match.params.user;
      const msg=this.state.text;
      this.props.sendMsg({from,to,msg});
      this.setState({text:''});
    }
   render(){
       const user=this.props.match.params.user;
       const Item=List.Item;
       const users=this.props.chat.users;
       if(!users[user]){
           return null;
        }
       return (
           <div id='chat-page'>
               <NavBar mode='dark' className="stick-header" 
               icon={<Icon type="left"/>}
               onLeftClick={()=>{this.props.history.goBack()}}
               >{users[user].name}</NavBar>
               <div style={{marginTop:45,marginBottom:90}}>
                   <List id="chat-list">
                   {this.props.chat.chatmsg.map(v=>{
                        const avatarfrom=require(`./../avatar-selector/imgs/${users[v.from].avatar}.png`);
                        const avatarto=require(`./../avatar-selector/imgs/${users[v.to].avatar}.png`);
                        return v.from ===user?(
                            <Item key={v._id} thumb={avatarfrom} ><div className="you-mes">{v.content}</div></Item>
                        ):(
                            <Item key={v._id} extra={<img src={avatarto}/>} className='chat-me'><div className="me-mes">{v.content}</div></Item>
                        );
                   })}
                   </List>
               </div>
             <div className="stick-footer">
              <List>
                  <TextareaItem
                    placeholder='请输入'
                    value={this.state.text}
                    onChange={v=>{
                        this.setState({
                            text:v
                        })
                    }}
                    autoHeight
                  />
                  <Button type="primary"  onClick={()=>{this.handleSubmit()}}>发送</Button>
              </List>
             </div>
           </div>
       )
   }
}
export default Chat;