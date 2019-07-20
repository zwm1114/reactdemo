import React,{Component} from 'react';
import './style.css';

export class OrderItem extends Component {
	constructor(props){
		super(props);
		this.state ={
			editing: false,
			stars: this.props.stars || 0,
			comment: this.props.comment ||''
		}
	}
	render() {
		const {shop,price,product,picture,ifcommented} = this.props.data;
		return (
		<div>
		<div className='orderItem'>
			<div className='orderItem__picContainer'>
				<img className='orderItem__pic' src={picture}/>
			</div>
			<div className='orderItem__content'>
				<div className='orderItem__product'>{product}</div>
				<div className='orderItem__shop'>{shop}</div>
				<div className='orderItem__detail'>
					<div className='orderItem__price'>{price}</div>
					<div>
					{
						ifcommented 
						? 
						(<button className='orderItem__btn orderItem__btn--grey'>已评价</button>)
						:
						(<button className='orderItem__btn orderItem__btn--red' 
							onClick={this.handleEditArea}>评价</button>)
					}
					</div>
				</div>
			</div>
		</div>
		{this.state.editing?this.renderEditArea():null}
		</div>
		);
	}

	renderEditArea() {
			return (
					<div className="orderItem__commentContainer">
						<textarea className="orderItem__comment" 
						onChange={this.handleCommentChange} value={this.state.comment}/>
						{this.renderStars()}
						<button className="orderItem__btn orderItem__btn--red" 
						onClick={this.handleCommentSubmit}>提交</button>
						<button className="orderItem__btn orderItem__btn--grey" 
						onClick={this.handleCommentCancle}>取消</button>
					</div>
				);
		}

		renderStars(){
			const {stars}  = this.state;
			return(
				<div>
					{
						[1,2,3,4,5].map((item,index) => {
							const lightClass = stars >= item ?
							"orderItem__star--light":"";
							return(
								<span
								key={index} 
								className={"orderItem__star " + lightClass}
								onClick={this.handleClickStars.bind(this, item)}
								>
								★
								</span>
								);
						})
					}
				</div>
				);
		}	

		handleEditArea = () => {
			this.setState({
				editing: true
			});
		};

		handleCommentChange = (e) => {

			this.setState({
				comment: e.target.value
			});

		};

		handleClickStars = stars => {
			console.log("stars",stars);
			this.setState({
				stars: stars
			});
		};

		handleCommentCancle = () => {
			this.setState({
				editing:false,
				stars: this.props.stars || 0,
				comment: this.props.comment ||''
			});
		};

		handleCommentSubmit = () => {
			const { id } = this.props.data;
			const { comment, stars } = this.state;
			this.setState({
				editing:false
			})
			this.props.onSubmit(id, comment, stars)
		};
}

export default OrderItem