import React from 'react';
import FormLogin from './forms/LoginForm';

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
						>
								Forgot password
						</button>
						</FormLogin>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginLayout;