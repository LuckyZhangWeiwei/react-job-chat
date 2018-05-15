
import React from 'react'
import {connect} from 'react-redux' 
import {List,Badge} from 'antd-mobile'
 
@connect(
	state=>state
)
class Msg extends React.Component{
	getLast(arr){
		return arr[arr.length-1]
	}
	render(){

		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id
		const userinfo = this.props.chat.users
		// console.log(this.props)
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
        let chatList=[];
        let sortList=[];
        for(let index in msgGroup){
            chatList.push(msgGroup[index]);
        }
        
        sortList =chatList.sort((a,b)=>{
			const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            //console.log(a_last,b_last,b_last-a_last);
			return b_last - a_last
        })
        //console.log("sortList:",sortList);

		// console.log([3,1,2,6,5].sort(function(a,b){
		// 	return b-a
		// }))
		// console.log(Object.values({name:'imooc',age:18}))
		// 按照聊天用户分组，根据chatid


		// 1. eslint代码校验工具
		// 2. react16特有的错误处理机制
		// 2. react性能优化
		return (
			<div>
				
					{sortList.map(v=>{
						const lastItem = this.getLast(v)
						const targetId = v[0].from===userid?v[0].to:v[0].from
						const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
						if (!userinfo[targetId]) {
							return null
						}
						// const name = userinfo[targetId]?userinfo[targetId].name:''
						// const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
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









