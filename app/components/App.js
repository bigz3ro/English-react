import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'app/actions/actionCreators';
import MenuBar from 'utils/components/layout/MenuBar';
import Header from 'utils/components/layout/Header';
import Footer from 'utils/components/layout/Footer';
import Tools from 'utils/helpers/Tools';
import { LOCAL_STORAGE_PREFIX } from 'app/constants';

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			isLogout: false
		}

		this.handleLogout = this.handleLogout.bind(this);

	}

	handleLogout(){
		Tools.removeStorage('authData');
		Tools.goToUrl('login');
	}

	render(){
		
		return(
			<div className="wrapper">
				<MenuBar />
				<div className="container-fluid">
				 	<div className="row">
				 		<div id="content" className="col-md-10">
				 			{React.cloneElement(this.props.children, {...this.props})}
				 		</div>
				 	</div>
				 </div>
				 <Footer />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		...state
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch);
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);