import React from 'react';
import * as actionCreators from 'app/actions/actionCreators';
import Tools from 'utils/helpers/Tools';
import { apiUrls } from './_data';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavWrapper from 'utils/components/NavWrapper';

class Profile extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		Tools.apiCall(apiUrls.profile, {}, false).then((result) => {
			// console.log(result);
			if(result.success){
				this.props.updateProfile({
					email: result.data.email,
					frist_name: result.data.frist_name,
					last_name: result.data.last_name,
					role_id: result.data.role_id
				})
			}
		})
	}

	render(){
		return(
			<NavWrapper>
				<div>
				<table className="table table-striped">
					<tbody>
						<tr>
							<td>Email</td>
							<td>{ this.props.authReducer.profile.email }</td>
						</tr>
						<tr>
							<td>Name</td>
							<td>{`${this.props.authReducer.profile.first_name || ''} ${this.props.authReducer.profile.last_name || ''}`}</td>
						</tr>
					</tbody>
				</table>
			</div>
			</NavWrapper>			
		);
	}
}


function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch){
	return {
		...bindActionCreators(actionCreators, dispatch)
	}
}

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;