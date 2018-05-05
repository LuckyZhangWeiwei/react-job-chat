import React from 'react';
import {Grid} from 'antd-mobile';

class AvatarSelector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedImage:''
        }
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                           .split(',')
                           .map(v=>({
                               icon:require(`./imgs/${v}.png`),
                               key:v
                           }));
        return (
            <div>
                <div>
                    <label>选择头像:</label>
                <span>
                    <img src={this.state.selectedImage} alt=""/>
                </span>
                </div>
                <Grid 
                  data={avatarList} 
                  columnNum={5}
                  onClick={e=>{this.setState({selectedImage:e.icon});this.props.onSelect(e)}}
                  />
            </div>
        )
    }
}

export default AvatarSelector;