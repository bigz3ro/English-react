import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputRender from 'utils/components/forms/InputRender';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'app/actions/actionCreators';

class ConfigMainForm extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		const { handleSubmit, onSubmit ,pristine, reset, submitting, error } = this.props;
		return(
			<form
				onSubmit={handleSubmit(onSubmit)}>
				<Field
      				name="uid"
      				type="text"
      				focus={true}
      				component={InputRender}
      				label={this.props.labels.uid}/>
      			<Field
      				name="value"
      				type="text"
      				component={InputRender}
      				label={this.props.labels.value}/>

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


function mapStateToProps(state){
	return {
		//Goi den object va set cho form null
		initialValues: state.configReducer.obj
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch);
}


// Decorate the form component
ConfigMainForm = reduxForm({
	form: 'ConfigMainForm', // a unique name for this form
	enableReinitialize: true,
	validate
})(ConfigMainForm);

ConfigMainForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConfigMainForm);

export default ConfigMainForm;