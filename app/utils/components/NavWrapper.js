import React from 'react';
import Link from 'react-router/lib/Link';
import store from 'app/store';
import {wrapperAction} from 'app/actions/actionCreators';

import Sidebar from 'react-sidebar';
import DropdownMenu from 'react-dd-menu';

import { APP_TITLE, URL_PREFIX, APP } from 'app/constants';
import Tools from 'helpers/Tools';
import {apiUrls} from 'components/auth/_data';

class NavWrapper extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showHambuger: false,
			open: false,
			sidebarOpen: false,
			sidebarDocked: false,
			isMenuOpen: false
	    };
	    this.closeDropdown = this.closeDropdown.bind(this);
	    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
	    this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	shouldComponentUpdate(newProps, newState) {
		/*
		console.log(this.props['data-firstUpdate']);

		if(this.props['data-firstUpdate']){
			store.dispatch(wrapperAction('update'));
			return true;
		}
		return false;
		*/
		return true;
	}
	//Docked is button vao ra cua sidebar 
	//Hambuger nhu cai banh mi nit 3 soc ngang
	componentDidMount(){
		const mql = window.matchMedia(`(min-width: 800px)`);
	    mql.addListener(this.mediaQueryChanged);

	    this.setState({mql: mql});
	    this.setState({sidebarDocked: mql.matches});
		this.setState({sidebarOpen: mql.matches});
	    this.setState({showHambuger: !mql.matches});
	}
//Se remove khi min-width < 800px
	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged);
	}
//Thay doi state khi man hinh thay doi
	mediaQueryChanged() {
		this.setState({sidebarDocked: this.state.mql.matches});
		this.setState({sidebarOpen: this.state.mql.matches});
	    this.setState({showHambuger: !this.state.mql.matches});
	}

	onSetSidebarOpen(open) {
		this.setState({sidebarOpen: open});
	}

	toggleDropdown(){
		this.setState({ isMenuOpen: !this.state.isMenuOpen });
	}

	closeDropdown(){
		this.setState({ isMenuOpen: false });
	}

	handleLogout(){

		//Logout remove token -> chuyen url
		Tools.removeStorage('authData');
		Tools.goToUrl('login');
	}

	_renderMenu(){
			return (
				<ul className="list-group">
					<Link to={URL_PREFIX} className="list-group-item" activeClassName="active" onlyActiveOnIndex>
						<span className="glyphicon glyphicon-home"/> &nbsp;
						Profile
					</Link>
					<Link to={URL_PREFIX+'config'} className="list-group-item" activeClassName="active">
						<span className="glyphicon glyphicon-user"/> &nbsp;
						Cấu hình
					</Link>
					<Link to={URL_PREFIX+'admin'} className="list-group-item" activeClassName="active">
						<span className="glyphicon glyphicon-user"/> &nbsp;
						Cấu hình
					</Link>
				</ul>
			)
		}

	_renderToggleMenu(){
		if(this.state.showHambuger){
			return (
				<div className="heading">
					<span
						onClick={() => this.onSetSidebarOpen(true)}
						className="hambuger glyphicon glyphicon-menu-hamburger"></span>
					<span className="heading-logo">
						Admin
					</span>
					{this._renderRightDropdown()}
				</div>
			);
		}
		return (
			<div className="heading">
				{this._renderRightDropdown()}
			</div>
		);
	}

	_renderRightDropdown(){
		let toggleButton = <span type="button" className="pointer" onClick={this.toggleDropdown}>
			<span className="caret"></span>
		</span>;
		let menuOptions = {
			isOpen: this.state.isMenuOpen,
			close: this.closeDropdown,
			toggle: toggleButton,
			animate: true,
			menuAlign: 'right',
			textAlign: 'left'
		};
		return (
			<span className="main-right-dropdown">
				<DropdownMenu {...menuOptions}>
					<li>
						<a>
							<span
								className="glyphicon glyphicon-user"></span>&nbsp; Profile
						</a>
					</li>
					<li>
						<a onClick={this.handleLogout}>
							<span
								className="glyphicon glyphicon-off"
							>
							</span>&nbsp; Logout
						</a>
					</li>
				</DropdownMenu>
			</span>
		);
	}

	render(){
		let sidebarContent = (
			<div className="sidebar-content">
				<div className="heading">
					<span className="heading-logo">
						Admin
					</span>
				</div>
				{this._renderMenu()}
			</div>
		);
		var styles = {
			sidebar: {
				backgroundColor: 'white',
				zIndex: 4,
				transition: 'none',
    			WebkitTransition: 'none'
			},
			content:{
				transition: 'none',
    			WebkitTransition: 'none'
			},
			overlay: {
				zIndex: 3
			}
		};
		return (
			<Sidebar sidebar={sidebarContent}
				open={this.state.sidebarOpen}
				docked={this.state.sidebarDocked}
				onSetOpen={this.onSetSidebarOpen}
				className="main-sidebar"
				styles={styles}>
				<div className="content-wrapper">
					{ this._renderToggleMenu() }
					{ React.cloneElement(this.props.children, {...this.props}) }
				</div>
			</Sidebar>
		);
	}
}

export default NavWrapper;
