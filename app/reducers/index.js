import { combineReducers } from 'redux'
import configReducer from './configReducer';
import adminReducer from './adminReducer';
import authReducer from './authReducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

//cac reducer thuc hien day ra du lieu moi
const rootReducer = combineReducers({
	adminReducer,	
 	configReducer,
 	authReducer,
 	routing: routerReducer,
 	form: formReducer
})

export default rootReducer;