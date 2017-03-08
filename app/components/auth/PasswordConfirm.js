import React from 'react';
import Link from 'react-router/lib/Link';
import Tools from 'utils/helpers/Tools';
import { apiUrls } from './_data.js';

class PasswordConfirm extends React.Component{
	constructor(){
		super();
		this.state = {
			confirmSuccess: true,
			confirmMessage: 'Please waiting...',
			type: null
		}
	}

	componentDidMount(){
		let endPoint = null;
		// console.log(this.props);
		if(this.props.params.type === 'change'){
			this.setState({ type: 'Change'});
			endPoint = apiUrls.changePasswordConfirm;
		}else if(this.props.params.type === 'reset'){
			this.setState({ type: 'Reset'});
			endPoint = apiUrls.resetPasswordConfirm;
		}
		try{
			const params = {
				token: this.props.params.token
			};
			Tools.apiCall( endPoint , params ).then( result => {
				this.setState({ confirmMessage: result.message.common ? result.message.common: result.message });
			});
		}catch(err){
			console.error(err);
		}
	}

	render(){
		return(
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<div className="well">
						<p>
							<strong>
								{ this.state.type ? `${this.state.type} Password Confirm ` : 'Password Confirm'} 
							</strong>
						</p>
						<p>
							{this.state.confirmMessage}
						</p>

						<Link to={Tools.toUrl('login')} className="btn btn-success">
							<span className="glyphicon glyphicon-user"></span> &nbsp;
							Login
						</Link>
					</div>
				</div>	
			</div>
		);
	}
}

export default PasswordConfirm;