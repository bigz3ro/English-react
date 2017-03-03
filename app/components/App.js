import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'app/actions/actionCreators';

class App extends React.Component {
	constructor(){
		super();
	}

	render(){
		return(
			<div>
				{React.cloneElement(this.props.children, {...this.props})}
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