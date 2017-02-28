import React from 'react';

class InputRender extends React.Component {
	render(){
		const touched = this.props.meta.touched;
		const error = this.props.meta.error;
		return(
			<div className="form-group">
				<label>{this.props.label.title}</label>
				<input {...this.props.input} className="form-control" type={this.props.type} />
				{touched && ((error && <span className="text-danger" >{error}</span>))}
			</div>
		);
	}
}

export default InputRender;