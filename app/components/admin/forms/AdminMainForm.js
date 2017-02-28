import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputRender from 'utils/components/forms/InputRender';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'app/actions/actionCreators';
import ValidateTools from 'utils/helpers/ValidateTools';
import Tools from 'utils/helpers/Tools';
import { labels } from '../_data';


class AdminMainForm extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		const { handleSubmit, onSubmit ,pristine, reset, submitting, error } = this.props;
		return(
			<form
				onSubmit={handleSubmit(onSubmit)}>
				<Field
      				name="first_name"
      				type="text"
      				focus={true}
      				component={InputRender}
      				label={this.props.labels.first_name}
      			/>
      			<Field
      				name="last_name"
      				type="text"
      				component={InputRender}
      				label={this.props.labels.last_name}
      			/>
      			<Field
      				name="email"
      				type="text"
      				component={InputRender}
      				label={this.props.labels.email}
      			/>

				{error && <div className="alert alert-danger" role="alert">{error}</div>}

				<div className="row custom-modal-footer">
					{/*Button Cancel*/}
					<div className="col-md-6 cancel">
						{this.props.children}
					</div>
					{/*Button Cancel*/}

					{/*Button Save */}
					<div className="col-md-6 submit">
						<button className="btn btn-success" disabled={submitting}>
							<span className="glyphicon glyphicon-ok"></span> &nbsp;
							{this.props.submitTitle}
						</button>
					</div>
					{/*Button Save */}

				</div>
			</form>
		);
	}
}

const validate = values => {
	return ValidateTools.validateInput(
		values,
		Tools.getRules(labels.mainForm)
	);
};	


function mapStateToProps(state) {
	return {
		//Goi den object va set cho form null
		initialValues: state.adminReducer.obj
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch);
}


// Decorate the form component
AdminMainForm = reduxForm({
	form: 'AdminMainForm', // a unique name for this form
	enableReinitialize: true,
	validate
})(AdminMainForm);

AdminMainForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminMainForm);

export default AdminMainForm;