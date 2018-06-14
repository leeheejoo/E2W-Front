import {  Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface loginState {
	isLogin: boolean;
}

export function loginReducer(state: loginState, action: Action) {
	switch (action.type) {
		case LOGIN:
			return { isLogin : true };

		case LOGOUT:
			return { isLogin : false };

		default:
			return state;
	}
}