import React from 'react'


class App extends React.Component{
    render(){
        const store=this.props.store;
        const num=store.getState();
        return (
            <div>
                <h1>现在有机枪:{num}架</h1>
                <button onClick={()=>store.dispatch(this.props.addGun())}>申请机枪</button>
                <button onClick={()=>store.dispatch(this.props.subtractGun())}>上缴机枪</button>
                <button onClick={()=>store.dispatch(this.props.addGunAsync())}>异步申请机枪</button>
            </div>
        )
    }
}
export default App;