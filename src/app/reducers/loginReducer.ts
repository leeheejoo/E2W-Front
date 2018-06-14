import {  Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface loginState {
	login: boolean;
}

export function loginReducer(state: loginState, action: Action) {
	switch (action.type) {
		case LOGIN:
			return { login : true };

		case LOGOUT:
			return { login : false };

		default:
			return state;
	}
}