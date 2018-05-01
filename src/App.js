import React from 'react';
import {connect} from 'react-redux';
import {add_gun,subtract_gun,add_gun_async} from './index.redux'

@connect(state=>({num:state}),{add_gun,subtract_gun,add_gun_async})
class App extends React.Component{
    render(){
        const num=this.props.num;
        return (
            <div>
                <h1>现在有机枪:{num}架</h1>
                <button onClick={this.props.add_gun}>申请机枪</button>
                <button onClick={this.props.subtract_gun}>上缴机枪</button>
                <button onClick={this.props.add_gun_async}>异步申请机枪</button>
            </div>
        )
    }
}

export default App;