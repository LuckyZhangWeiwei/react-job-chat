import React from 'react'
import {connect} from 'react-redux' 
import {List,Badge} from 'antd-mobile'
import {createSelector} from 'reselect'; 

let sortList=[];
let getLast=(arr)=>{
	return arr[arr.length-1]
}
const chatsSelector=createSelector(
   state=>state,
   (state)=>{
	
	const msgGroup = {}
	state.chat.chatmsg.forEach(v=>{
		msgGroup[v.chatid] = msgGroup[v.chatid] || []
		msgGroup[v.chatid].push(v)
	})
	let chatList=[];
	for(let index in msgGroup){
		chatList.push(msgGroup[index]);
	}
	
	sortList =chatList.sort((a,b)=>{
		const a_last = getLast(a).create_time
		const b_last = getLast(b).create_time
		return b_last - a_last
	})
	return {sortList:sortList,userid:state.user._id,userinfo:state.chat.users}
   }
)
@connect(
	state=>chatsSelector(state)
)
class Msg extends React.Component{
	render(){
		const Item = List.Item
		const Brief = Item.Brief
		const userid =this.props.userid; 
		const userinfo =this.props.userinfo; 
		
		return (
			<div>
				
					{this.props.sortList.map(v=>{
						const lastItem = getLast(v)
						const targetId = v[0].from===userid?v[0].to:v[0].from
						const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
						if (!userinfo[targetId]) {
							return null
						}
						return (
							<List key={lastItem._id}>
								<Item
									extra={<Badge text={unreadNum}></Badge>}
									thumb={require(`./../avatar-selector/imgs/${userinfo[targetId].avatar}.png`)}
									arrow="horizontal"
									onClick={()=>{
										this.props.history.push(`/chat/${targetId}`)
									}}
								>
									{lastItem.content}
									<Brief>{userinfo[targetId].name}</Brief>
								</Item>
							</List>
						)
					})}

				
			</div>
		)
	}
}
export default Msg









