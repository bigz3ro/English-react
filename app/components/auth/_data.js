import Tools from 'utils/helpers/Tools';
import { FIELD_TYPE, APP } from '../../constants';

export const labels = {
    login: {
        email: {
            title: 'Your email',
            type: 'string',
            heading: false,
            init: null,
            rules: {
                required: true
            }
        }, password: {
            title: 'Your password',
            type: 'string',
            heading: false,
            init: null,
            rules: {
                required: true
            }
        }, re_password:{
            title: "Retype password",
            type: 'string',
            heading: false,
            init: null,
            rules:{
                required: true
            }
        }
    }, resetPassword: {
        email: {
            title: 'Your email',
            type: 'string',
            heading: false,
            init: null,
            rules: {
                required: true
            }
        }, password: {
            title: 'Your password',
            type: 'string',
            heading: false,
            init: null,
            rules: {
                required: true
            }
        }, re_password:{
            title: "Retype password",
            type: 'string',
            heading: false,
            init: null,
            rules:{
                required: true
            }
        }
    }
};

const MAIN_CONTROLLER = APP;

const rawApiUrls = {
    obj: 'GET',
    authenticate: 'POST',
    logout: 'POST',
    profile: 'GET',
    updateProfile: 'POST',
    resetPassword: 'POST',
    resetPasswordConfirm: 'GET',
    changePassword: 'POST',
    changePasswordConfirm: 'GET'
};


/*Tra ve danh sach cua URl api duoi dang:
{
    method: 'GET',
    url:http://myblog.dev/api/v1/admin/profile"
}
*/
export const apiUrls = Tools.getApiUrls(MAIN_CONTROLLER, rawApiUrls);
// console.log(apiUrls);