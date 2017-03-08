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
		this.state = {
			resetPassowrdModal: false
		}
		this.loginHandle = this.loginHandle.bind(this);
		this.handleToggle = this.handleToggle.bind(this);	
		this.handleResetPassword = this.handleResetPassword.bind(this);	
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
					//Get token and set localStorage
					Tools.setStorage('authData', result.data);
					//Reset Form
					dispatch(reset('FormLogin'));
					Tools.goToUrl();
				}else{
					throw new SubmissionError(Tools.errorMessageProcessing(result.message));
				}
			});

		}catch(error){
			console.error(error);
		}
	}

	handleResetPassword(eventData, dispatch){
		//Recieve email, passsword
		try{
			const params = {
				...eventData,
				password: md5(eventData.password),
				re_password: md5(eventData.re_password)
			}
			//Call api here
			if(eventData.password !== eventData.re_password){
				return Tools.sleep().then(() => {
					throw new SubmissionError(Tools.errorMessageProcessing('Passwords not matched!'));
				});
			}
			return Tools.apiCall(apiUrls.resetPassword, params).then( (result) => {
				if(result.success){
					Tools.setStorage('authData', result.data);
					dispatch(reset('FormResetPassword'));
					Tools.redirect('login');
				}else{
					throw new SubmissionError(Tools.errorMessageProcessing(result.message));
				}
			});

		}catch(error){
			console.error(error);
		}
	}

	handleToggle(){
		this.setState({
			resetPassowrdModal: !this.state.resetPassowrdModal
		});
	}

	render(){
		return (
			<LoginLayout 
				labels={labels}
				checkSubmit={this.loginHandle}
				handleResetPassword={this.handleResetPassword}
				handleToggle={this.handleToggle}
				resetPasswordModal={this.state.resetPassowrdModal}
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