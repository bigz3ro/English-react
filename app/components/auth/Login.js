import React from 'react';
import LoginLayout from './LoginLayout';
import { reset, SubmissionError } from 'redux-form';
import md5 from 'blueimp-md5';
import 'whatwg-fetch';
import Tools from 'utils/helpers/Tools';
import {apiUrls, labels} from './_data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from 'app/actions/actionCreators';


class Login extends React.Component {

	constructor(props){
		super(props)
		this.loginHandle = this.loginHandle.bind(this);
	}

	loginHandle(eventData, dispatch) {
		try{
			//Call api here
			const params = {
				...eventData,
				password: md5(eventData.password)
			}
			return Tools.apiCall(apiUrls.authenticate, params).then((result) => {
				if(result.success){
					Tools.setStorage('authData', result.data);
					dispatch(reset('FormLogin'));
					Tools.goToUrl();
				}else{
					throw new SubmissionError(Tools.errorMessageProcessing(result.message));
				}
			});

		}catch(error){
			console.error(error)
		}
	}


	render(){
		return (
			<LoginLayout 
				labels={labels}
				checkSubmit={this.loginHandle}
			/>
		);
	}
}

function mapStateToProps(state){
	return{}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;