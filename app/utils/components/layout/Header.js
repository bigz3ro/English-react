import React from 'react';
import { Link } from 'react-router';


class Header extends React.Component {

	_renderRightHeader(){
		return (
			<p>
				<Link to="#" className="navbar-link">Logout</Link>				
			</p>
		);
	}

	render(){
		return(
			<nav className="navbar navbar-default" role="navigation">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Admin</a>
					</div>
					<div className="collapse navbar-collapse navbar-ex1-collapse">
						<ul className="nav navbar-nav navbar-right">
							<li>
								<Link>
									<span 
										className="glyphicon glyphicon-off"
										onClick={this.props.handleLogout}
									>
									</span>	
								</Link>							
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;