import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';
import { URL_PREFIX } from './constants';

import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';

//import boostrap
import 'libs/bootstrap/css/bootstrap.min.css';
// import 'libs/todc-bootstrap/css/todc-bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-select/dist/react-select.min.css';
import 'react-dd-menu/dist/react-dd-menu.min.css';
import 'rc-table/assets/index.css';
import 'libs/bootstrap/css/bootstrap.min.css';
// import 'libs/bootstrap/js/bootstrap.min.js';
// import 'libs/bootstrap/fonts/glyphicons-halflings-regular.ttf';
import './styles/main.css';
import Tools from 'utils/helpers/Tools';

//Import Component
import App from 'components/App';
import Config from 'components/config/Config';
import Profile from 'components/auth/Profile';
import Login from 'components/auth/Login';
import Admin from 'components/admin/Admin';
import NotFound from 'utils/components/404';

const changeRouteHandle = (nextState, replace, callback) => {
	const pathname = nextState.location.pathname;
	const path = pathname.replace(URL_PREFIX, '');
	// console.log(pathname);
	// console.log(nextState.routes);
	//Neu da login lay token va cho vao trong

	if(pathname === URL_PREFIX + 'login'){ 
		if(Tools.getToken()){
			replace(URL_PREFIX);
		//Neu chua login thi dieu huong ra trang login
		}
	}else{
		//Check params login .
		const login = Tools.checkLoginRequiredRoute(nextState.routes, path);
		if(login && !Tools.getToken()){
			replace(URL_PREFIX + 'login');
		}
	}
	callback();
}

const onEnter = (nextState, replace, callback) => {
	changeRouteHandle(nextState, replace, callback)
}

const onChange = (nextState, replace, callback) => {
	changeRouteHandle(nextState, replace, callback)
}

const rootElementAdmin = (
	<Provider store={store}>
		<Router history={history} >
			<Route path={URL_PREFIX + "login"} component={Login} params={{login: false}} onChange={onChange} onEnter={onEnter} />
			<Route path={URL_PREFIX} component={App} onEnter={onEnter} onChange={onChange}>
				<IndexRoute component={Profile} params={{login: true}}></IndexRoute>			
				<Route path="config" component={Config} params={{login: true}}/>
				<Route path="admin" component={Admin} params={{login: false}}/>
				<Route path="profile" component={Profile} params={{login: true}}/>
			</Route>
			<Route path="*" component={NotFound} params={{login: false}}/>
		</Router>

	</Provider>
);

ReactDOM.render(rootElementAdmin, document.getElementById("app"));