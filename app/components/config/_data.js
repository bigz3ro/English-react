import Tools from 'helpers/Tools';
import {FIELD_TYPE} from 'app/constants';

const MAIN_CONTROLLER = 'config';
const rawApiUrls = {
    obj: 'GET',
    list: 'GET',
    add: 'POST',
    edit: 'POST',
    remove: 'POST'
};


export const labels = {
	common: {
		title: 'Quản lý config'
	},
    mainForm: {
        uid: {
            title: 'Tên config',
            type: FIELD_TYPE.STRING,
            heading: true,
            init: null,
            rules: {
                required: true,
                min: 3
            }
        }, value: {
            title: 'Giá trị',
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