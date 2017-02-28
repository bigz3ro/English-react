import { createStore, compose , applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import browserHistory from 'react-router/lib/browserHistory';


const middleware = routerMiddleware(browserHistory);

//State ban dau cua store
const defaultState = {
	authReducer: {
			login: {
				email: null,
				password: null
			},profile: {
				email: null,
				frist_name: null,
				last_name: null,
				role_id: null
			}
	},
	configReducer: {
		obj: {},
		list: [],
		pages: 1
	},
	adminReducer: {
		obj:{},
		list: [],
		page: 1
	}

}


//store luu tru state ban dau va cac state tra ra tu co may reducer
let store = createStore(
	rootReducer,
	defaultState,
	composeWithDevTools(
		applyMiddleware( middleware )
	)
);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;