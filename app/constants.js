export const APP_TITLE = 'PROJECT';
export const APP_NAMESPACE = 'project';
export const APP = window.location.href.split("://")[1].split('/')[1];
export const URL_PREFIX = '/' + APP + '/';

export const API_PREFIX = '/api/v1/';
export const PROTOCOL = window.location.protocol + "//";
export const DOMAIN = window.location.host;
export const MEDIA_URL = PROTOCOL + DOMAIN + '/public/media';
export const LOCAL_STORAGE_PREFIX = APP_NAMESPACE + "_" + APP;

export const FIELD_TYPE = {
	STRING: 'STRING',
	EMAIL: 'EMAIL',
	INTEGER: 'INTEGER',
	FLOAT: 'FLOAT',
	IMAGE: 'IMAGE',
	FILE: 'FILE'
}