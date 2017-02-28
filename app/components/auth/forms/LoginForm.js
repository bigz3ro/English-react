import React from 'react';
import { Field , reduxForm } from 'redux-form';
import InputRender from 'utils/components/forms/InputRender';

class LoginForm extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		// console.log(this.props.checkSubmit);
		return (
			<form onSubmit={handleSubmit(this.props.checkSubmit)}>
				<Field name="email" type="text" component={InputRender} label={this.props.labels.email} />
				<Field name="password" type="password" component={InputRender} label={this.props.labels.password} />
				
				<div className="row custom-modal-footer">
					<div className="col-md-6 cancel">
						{this.props.children}
					</div>
					<div className="col-md-6 submit">
						<button 
							className="btn btn-success"
							disabled={submitting}
							type="submit"
						>
							<span className="glyphicon glyphicon-ok"></span> &nbsp;
							{this.props.submitTitle}
						</button>
					</div>
				</div> 
			</form>
		);
	}
}

const validate = values => {
	const errors = {}
	if(!values.email){
		errors.email = "Required";
	}else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
		errors.email = 'Invalid email address';
	}

	if(!values.password){
		errors.password = "Required";
	}else if( values.password.length < 8){
		errors.password = "Too short";
	}
	return errors;
}


LoginForm = reduxForm({
  form: 'login', // a unique name for this form
  validate
})(LoginForm);

export default LoginForm;