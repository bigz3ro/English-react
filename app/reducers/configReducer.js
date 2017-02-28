import Tools from 'helpers/Tools';

function configReducer(state = {}, action){
	const PREFIX = 'CONFIG' + '_';
	switch(action.type){
		case PREFIX + 'OBJ':
			return {
				...state,
				obj: {...state.obj, ...action.data}
			};
		case PREFIX + 'NEW_LIST':
			return {
				...state,
				list: [...action.data.list],
				pages: action.data.pages
			};
		case PREFIX + 'APPEND_LIST':
			return {
				...state,
				list: [...state.list, ...action.data]
			};
		case PREFIX + 'ADD_ITEM':
			return {
				...state,
				list: [{...action.data}, ...state.list]
			};

		///Lay cai index muon edit roi cap nhat du lieu = cach day lan luot no vao state
		case PREFIX + 'EDIT_ITEM':
	
			return {
				...state,
				list: [
					...state.list.slice(0, action.index),
					{...state.list.slice(action.index, action.index + 1)[0], ...action.data},
					...state.list.slice(action.index + 1)
				]
			};
		case PREFIX + 'CHECK_ALL':
			return {
				...state,
				list: state.list.map(value => {
					return {...value, checked: true};
				})
			};
		case PREFIX + 'UNCHECK_ALL':
			return {
				...state,
				list: state.list.map(value => {
					return {...value, checked: false};
				})
			};
		case PREFIX + 'REMOVE_ITEM':
			return {
				...state,
				list: Tools.ignoreIndex(state.list, action.listIndex)
			};
		default:
			return state;
	}
}

export default configReducer;