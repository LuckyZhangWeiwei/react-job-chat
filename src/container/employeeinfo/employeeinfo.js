import React from 'react';
import {List,InputItem,WhiteSpace,Icon,NavBar,TextareaItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {updateUserInfo} from '../../redux/user.redux';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
@connect(
    state=>state.user,
    {updateUserInfo}
)
class EmployeeInfo extends React.Component{
   constructor(props){
      super(props);
      this.state={
         title:'',
         avatar:'',
         desc:''
      };
      this.UpdateInfo=this.UpdateInfo.bind(this);
      this.selectAvator=this.selectAvator.bind(this);
   }
   handleChange(key,val){
       this.setState({
           [key]:val
       });
   }
   UpdateInfo(){
     this.props.updateUserInfo(this.state);
   }
   selectAvator(v){
     this.setState({
        avatar:v.key
     });
   }
   render(){
       const path=this.props.location.pathname;
       const redirectToPath=this.props.redirectTo;
       return (
        <div>
          {redirectToPath && redirectToPath !==path?<Redirect to={this.props.redirectTo}/>:null}
          <NavBar mode="dark" rightContent={[<Icon type="check" key='ok' onClick={this.UpdateInfo}/>]}>求职者完善信息</NavBar>
          <AvatarSelector onSelect={this.selectAvator}></AvatarSelector>
          <List>
            <InputItem onChange={v=>this.handleChange('title',v)}>求职岗位</InputItem>
            <WhiteSpace/>
            <TextareaItem 
               onChange={v=>this.handleChange('desc',v)}
               rows={5}
               autoHeight={true}
               title="个人简介"/>
          </List>
        </div>
       )
   }
}
export default EmployeeInfo;