import React from 'react';
import { Field , reduxForm } from 'redux-form';
import InputRender from 'utils/components/forms/InputRender';
import ValidateTools from 'helpers/ValidateTools';
import { FIELD_TYPE } from 'app/constants';

class FormResetPassword extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		// console.log(this.props.checkSubmit);
		return (
			<form onSubmit={handleSubmit(this.props.handleResetPassword)}>
				<Field name="email" type="text" component={InputRender} label={this.props.labels.email} />
				<Field name="password" type="password" component={InputRender} label={this.props.labels.password} />
				<Field name="re_password" type="password" component={InputRender} label={this.props.labels.re_password} />
				
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

const rules = {
	password: {
		type: FIELD_TYPE.STRING,
		required: true
	},re_password: {
		type: FIELD_TYPE.STRING,
		required: true
	}
}
const validate = values => {
	// console.log( ValidateTools.validateInput(values, rules));
	return ValidateTools.validateInput(values, rules);
}


FormResetPassword = reduxForm({
  form: 'FormResetPassword', // a unique name for this form
  validate
})(FormResetPassword);

export default FormResetPassword;