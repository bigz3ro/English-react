export function configAction(action, data=[], index=null){
	// console.log(action);
	// console.log(data);

	const PREFIX = 'CONFIG' + '_';
	switch(action){
		case 'obj':
			return { type: PREFIX + 'OBJ', data };
		case 'newList':
			return { type: PREFIX + 'NEW_LIST', data };
		case 'appendList':
			return { type: PREFIX + 'APPEND_LIST', data };
		case 'add':
			return { type: PREFIX + 'ADD_ITEM', data };
		case 'edit':
			return { type: PREFIX + 'EDIT_ITEM', data, index: index };
		case 'remove':
			return { type: PREFIX + 'REMOVE_ITEM',data, listIndex:index}
		case 'checkAll':
			return { type: PREFIX + 'CHECK_ALL'};
		case 'uncheckAll':
			return { type: PREFIX + 'UNCHECK_ALL'};
	}
}

export function adminAction(action, data=[], index=null){
	// console.log(action);
	// console.log(data);

	const PREFIX = 'ADMIN' + '_';
	switch(action){
		case 'obj':
			return { type: PREFIX + 'OBJ', data };
		case 'newList':
			return { type: PREFIX + 'NEW_LIST', data };
		case 'appendList':
			return { type: PREFIX + 'APPEND_LIST', data };
		case 'add':
			return { type: PREFIX + 'ADD_ITEM', data };
		case 'edit':
			return { type: PREFIX + 'EDIT_ITEM', data, index: index };
		case 'remove':
			return { type: PREFIX + 'REMOVE_ITEM',data, listIndex:index}
		case 'checkAll':
			return { type: PREFIX + 'CHECK_ALL'};
		case 'uncheckAll':
			return { type: PREFIX + 'UNCHECK_ALL'};
	}
}

export function updateProfile(data){
	return { type: 'AUTH_UPDATE_PROFILE', data}
}