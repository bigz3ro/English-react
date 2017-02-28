import React from 'react';

//Render tableFilter
export class TableFilter extends React.Component {
	constructor(props){
		super(props);
		this.state = { keyword: ''}

		this._renderBulkRemove = this._renderBulkRemove.bind(this);
		this.onFilter =  this.onFilter.bind(this);
	}

	onFilter(event){
		console.log(event);
		this.setState({ keyword : event.target.value });
		this.props.onFilter(event);
	}

	_renderBulkRemove(){
		return(
			<span
				className="glyphicon glyphicon-remove"
				onClick={this.props.onRemove}
			>	
			</span>
		);
	}

	render(){
		return(
			<div className="input-group">
				<span className="input-group-addon bulk-remove">
					{this._renderBulkRemove()}
				</span>
				<input 
					type="text"
					className="form-control"
					value={this.state.keyword}
					onChange={this.onFilter}
					placeholder="Search"
				/>
			</div>
		);
	}
}

//Nut V checAll
export class TableCheckAll extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		if(!this.props.bulkRemove){
			return null;
		}
		return(
			<span 
				className="glyphicon glyphicon-ok"
				onClick={this.props.onCheckAll}
			>
			</span>
		);
	}
}

export class TableCheckBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		
		if(!this.props.bulkRemove){
			return null
		}
		return (
	        <input type="checkbox"
				checked={this.props.checked}
				onChange={this.props.onCheck}
	        />
		);
	}
}
export class TableAddButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		return (
			<button
				onClick={ this.props.onExecute }
				type="button"
				className="btn btn-success btn-block btn-xs">
		        <span className="glyphicon glyphicon-plus"></span>&nbsp;
				Add
			</button>
		)
	}
}

//Button edit delete
export class TableRightTool extends React.Component {
	constructor(props){
		super(props);
	}

	//Neu table nao can nut remove thi ta moi set state
	_renderRemove(){
		if(this.props.allowRemove){
			return(
				<span>
					&nbsp;&nbsp;&nbsp;
					<span 
						className="glyphicon glyphicon-remove pointer"
						onClick={this.props.onRemove}
					></span>
				</span>
			);	
		}

		return null;
		
	}
	render(){
		return(
			<div className="pull-right">
				<span 
					className="glyphicon glyphicon-pencil pointer"
					onClick={ this.props.toggleModal }
				>
				</span>
				{this._renderRemove()}
			</div>
		);
	}

}