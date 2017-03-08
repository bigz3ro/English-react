import React from 'react';
import FormLogin from './forms/LoginForm';
import FormResetPassword from './forms/FormResetPassword';
import CustomModal from 'utils/components/CustomModal';

class LoginLayout extends React.Component {
	
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<div className="well">
						<p>
							<strong>Login</strong>
						</p>
						<p>
							Please enter your username as email & password.
						</p>
						<FormLogin
							labels={this.props.labels.login}
							submitTitle="Login"
							checkSubmit={this.props.checkSubmit}
						>
						<button
							type="button"
							className="btn btn-warning"
							onClick={this.props.handleToggle}
						>
								Forgot password
						</button>
						</FormLogin>
					</div>
					
					{/*Display form ResetPassword*/}
					<CustomModal
						open={this.props.resetPasswordModal}
						close={() => this.props.handleToggle()}
						size="md"
						title="Reset Password"
					>
					<div>
						<div className="custom-modal-content">
							<FormResetPassword
								labels={this.props.labels.resetPassword}
								submitTitle="Done"
								handleResetPassword={this.props.handleResetPassword}
							>
							</FormResetPassword>
						</div>
					</div>
					</CustomModal>

				</div>
			</div> 

		);
	}
}

export default LoginLayout;