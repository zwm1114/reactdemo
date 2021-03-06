import React,{Component} from 'react';
import OrderItem from '../OrderItem';

export class OrderList extends Component {
	constructor(props){
		super(props);
		this.state = {data: []};
	}
	componentDidMount(){
		//用fetch从mock中获取数据,网络请求传递的参数是一个url
		 fetch('/mock/orders.json').then(res =>{
		 	console.log("res:",res);
		 	if(res.ok){
		 		res.json().then(data => { 
		 			console.log("data:",data);
		 			this.setState({
		 				data
		 			})
		 		})
		 	}
		 })
	}
	render() {
		return (
			<div>
			{
				this.state.data.map(item =>{
					return <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit}/>
				})
			}
			</div>
		)
	}

	handleSubmit = (id, comment, stars) => {
		//如果有服务器，有后台saveComment的接口的话
		/*fetch('/saveComment').then(()=>{
			//修改newData的代码放进来
		})*/
		const newData = this.state.data.map(item => {
			return item.id === id ?
			{
				...item,comment,stars,ifcommented:true
			}: item;
		});
		this.setState({
			data: newData 
		});
	}

}

export default OrderList