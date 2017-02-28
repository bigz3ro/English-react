function authReducer(state = {} , action){
	switch(action.type){
		case 'AUTH_UPDATE_PROFILE':
			return {
				...state,
				profile: { ...state.profile, ...action.data }
			}
		default: 
			return state;
	}
}


export default authReducer;