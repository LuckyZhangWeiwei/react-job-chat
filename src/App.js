import React, { Component } from 'react';
import {Button,List} from 'antd-mobile';
class App extends React.Component{
  render(){
    const boss=`李云龙`;
    return (
    <div>
      <h2>独立团,团长{boss}</h2>
       <一营 leader='张大彪'/>
       <骑兵连 leader='孙德胜'/>
    </div>)
  }
}
function 骑兵连(props){
    return <h2>骑兵连，连长：{props.leader}</h2>
}
class 一营 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      soliders:['士兵1','士兵2','士兵3','士兵4','士兵5','士兵6','士兵7','士兵8','士兵9','士兵10','士兵11','士兵12']
    }
    this.addSolider=this.addSolider.bind(this);
  }
  addSolider(){
      this.setState({
        soliders:[...this.state.soliders,`新兵${Math.random()}`]
      })
  }
  render(){
    return (
      <div>
        <h2>一营,营长：{this.props.leader}</h2>
        <Button type='primary' onClick={this.addSolider}>新兵入伍</Button>
        <List renderHeader={()=>'士兵列表'}>
        {
            this.state.soliders.map(v=>{
              return <List.Item key={v}>{v}</List.Item>
            })
          }
        </List>
      </div>
      
    );
  }
}
export default App;