import React from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component{
    static propTypes={
        onSelect:PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state={
            selectedImage:''
        }
    }
    renderHeader(){
        const gridHeader=this.state.selectedImage?
                        (
                            <div>
                            <label>选择头像:</label>
                        <span>
                            <img src={this.state.selectedImage} style={{width:20}} alt=""/>
                        </span>
                        </div>
                        ):
                        <div>
                            <label>请选择头像:</label>
                        </div>;
                        return gridHeader;
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                           .split(',')
                           .map(v=>({
                               icon:require(`./imgs/${v}.png`),
                               key:v
                           }));
        return (
            <div style={{marginTop:45}}>
                <List renderHeader={()=>this.renderHeader()}>
                <Grid 
                  data={avatarList} 
                  columnNum={5}
                  onClick={e=>{this.setState({selectedImage:e.icon});this.props.onSelect(e)}}
                  />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;