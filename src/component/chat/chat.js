import React from 'react';
import ReactDOM from 'react-dom';
import {List,TextareaItem,NavBar,Icon,Button,Grid} from 'antd-mobile';
import {connect}from 'react-redux';
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux';
import { getChatId } from '../../util';

@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg,readMsg}  
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            marginHeight:0,
            showIconPanel:false
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    componentDidUpdate(preProps,preState){
         if(this.props.chat.chatmsg.length!==preProps.chat.chatmsg.length){
              document.getElementById("chat-page").scrollTop=document.getElementById("chat-page").scrollHeight+45;
         }
    }
    componentWillUnmount(){
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
    fixCarousel(){
        setTimeout(() => {
            var resizeEvent = window.document.createEvent('UIEvents'); 
           resizeEvent .initUIEvent('resize', true, false, window, 0); 
           window.dispatchEvent(resizeEvent);
           }, 0);
    }
    handleSubmit(){
        if(!this.state.text){
            return null;
        }
      const from =this.props.user._id;
      const to=this.props.match.params.user;
      const msg=this.state.text;
      this.props.sendMsg({from,to,msg});
      this.setState({text:'',showIconPanel:false});
      this.props.chat.chatmsg
      document.getElementById("chat-page").scrollTop=document.getElementById("chat-page").scrollHeight+45;
    }
   render(){
      const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺ 🙂 🤗 🤔 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 😬 😰 😱 😳 😵 😡 😠 😷 🤒 🤕 🤢 🤧 😇 🤠 🤡 🤥 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
      .split(' ')
      .filter(v => v)
      .map(v => ({text: v}));
       const userid=this.props.match.params.user;
       const Item=List.Item;
       const users=this.props.chat.users;
       const chatid=getChatId(userid,this.props.user._id);
       const chatmsgs=this.props.chat.chatmsg.filter(v=>{
         return v.chatid===chatid
       });
       if(!users[userid]){
           return null;
        }
       return (
           <div id='chat-page'>
               <NavBar mode='dark' className="stick-header" 
               icon={<Icon type="left"/>}
               onLeftClick={()=>{this.props.history.goBack()}}
               >{users[userid].name}</NavBar>
               <div style={{marginTop:90,marginBottom:90}}>
                   <List id="chat-list">
                   {chatmsgs.map(v=>{
                        const avatar=require(`./../avatar-selector/imgs/${users[v.from].avatar}.png`);
                        return v.from ===userid?(
                            <Item key={v._id} thumb={avatar} ><div className="you-mes">{v.content}</div></Item>
                        ):(
                            <Item key={v._id} extra={<img src={avatar}/>} className='chat-me'><div className="me-mes">{v.content}</div></Item>
                        );
                   })}
                   </List>
               </div>
             <div className="stick-footer">
              <List renderFooter={()=>{
                  return <span onClick={()=>{this.setState({showIconPanel:!this.state.showIconPanel});this.fixCarousel()}}>😊</span>;
              }}>
                  {
                      this.state.showIconPanel?
                      <Grid data={emoji} columnNum={9} carouselMaxRow={3}  isCarousel={true}
                      onClick={(el)=>{
                          this.setState({
                              text:this.state.text+el.text
                          });
                      }}
                      />
                      :null
                  }
             <TextareaItem
                        placeholder='请输入'
                        value={this.state.text}
                        ref="content"
                        onChange={v=>{
                            let content=ReactDOM.findDOMNode(this.refs.content); 
                            this.setState({text:v,marginHeight:content.clientHeight});
                            document.getElementById("chat-page").scrollTop=document.getElementById("chat-page").scrollHeight+this.state.marginHeight;
                        }}
                        autoHeight
                      />
                  <div>
                   {/* <Button type="primary" className="chatsendbutton" onClick={()=>{this.setState({showIconPanel:!this.state.showIconPanel});this.fixCarousel()}}>😊</Button> */}
                  <Button type="primary" className="chatsendbutton" onClick={()=>{this.handleSubmit()}}>发送</Button>
                  </div>
              </List>
             
             </div>
           </div>
       )
   }
}
export default Chat;