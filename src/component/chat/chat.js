import React from 'react';
import {List,InputItem} from 'antd-mobile';
import io from 'socket.io-client';

const socket= io('ws://localhost:9093');
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            msg:[]
        }
    }
    componentDidMount(){
        socket.on('receivemessage',(data)=>{
            this.setState({
                msg:[...this.state.msg,data.text]
            })
        })
    }
    handleSubmit(){
       socket.emit('sendmessage',this.state);
       this.setState({
           text:''
       })
    }
   render(){
       return (
           <div>
               <div>
                   {this.state.msg.map(v=>{
                       return <p key={v}>{v}</p>
                   })}
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