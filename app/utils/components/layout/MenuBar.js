import React from 'react';
import Sidebar from 'react-sidebar';


class MenuBar extends React.Component {
	constructor(){
		super();
	}

	render(){
		return(
			<Sidebar
				sidebar={sidebarContent}
				docked={this.state.docked}
				open={this.state.open}
				onSetOpen={this.onSetOpen}
			>
				
			</Sidebar>
		);
	}

}
