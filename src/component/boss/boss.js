import React from 'react';
import axios from 'axios';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
class Boss extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        axios.get(`/user/list?type=employee`)
             .then(res=>{
                 if(res.data.code===0){
                     this.setState({
                         data:res.data.data
                     })
                 }
             })
    }
    render(){
        const Header=Card.Header;
        const Body=Card.Body;
        return (
            <WingBlank>
                <WhiteSpace/>
             {this.state.data.map(v=>(
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