import React from 'react';
import {List,InputItem,NavBar} from 'antd-mobile';
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
      const from =this.props.user._id;
      const to=this.props.match.params.user;
      const msg=this.state.text;
      this.props.sendMsg({from,to,msg});
         this.setState({
             text:''
         })
    }
   render(){
       const user=this.props.match.params.user;
       const Item=List.Item;
       return (
           <div id='chat-page'>
               <NavBar mode='dark' className="stick-header">{user}</NavBar>
               <div style={{marginTop:45,marginBottom:45}}>
                   <List>
                   {this.props.chat.chatmsg.map(v=>{
                        return v.from ===user?(
                            <Item key={v._id}><p className="you-mes">{v.content}</p></Item>
                        ):(
                            <Item key={v._id} extra={'avatar'} className='chat-me'><div className="me-mes">{v.content}</div></Item>
                        );
                   })}
                   </List>
               </div>
             <div className="stick-footer">
              <List>
                  <InputItem
                    placeholder='请输入'
                    value={this.state.text}
                    onChange={v=>{
                        this.setState({
                            text:v
                        })
                    }}
                    extra={<span onClick={()=>{this.handleSubmit()}}>发送</span>}
                  ></InputItem>
              </List>
             </div>
           </div>
       )
   }
}
export default Chat;