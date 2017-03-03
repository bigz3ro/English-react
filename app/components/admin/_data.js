import Tools from 'helpers/Tools';
import {FIELD_TYPE} from 'app/constants';

const MAIN_CONTROLLER = 'admin';
const rawApiUrls = {
    obj: 'GET',
    list: 'GET',
    add: 'POST',
    edit: 'POST',
    remove: 'POST'
};


export const labels = {
	common: {
		title: 'Admin List'
	},
    mainForm: {
        first_name: {
            title: 'Frist Name',
            type: FIELD_TYPE.STRING,
            heading: true,
            init: null,
            rules: {
                required: true,
                min: 3
            }
        }, last_name: {
            title: 'Last Name',
            type: FIELD_TYPE.STRING,
            heading: true,
            init: null,
            rules: {
                required: true
            }
        }, email: {
            title: 'Email',
            type: FIELD_TYPE.STRING,
            heading: true,
            init: null,
            rules: {
                required: true
            }
        }
    }
};

/*Tra ve danh sach cua URl api duoi dang:
{
    add: {
        method: "POST",
        url: "http://myblog.dev/api/v1/config/edit"
    },
    edit:{
        ..
    },
    list:{
        ..
    },
    obj: {
        ..
    },
    remove: {
        ..
    }
}
*/

export const apiUrls = Tools.getApiUrls(MAIN_CONTROLLER, rawApiUrls);
// console.log(apiUrls);