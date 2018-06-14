import {  Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface loginState {
	login: boolean;
}

export const initialState: loginState = {
	login:false,
};

export function loginReducer(state: loginState = initialState, action: Action) {
	switch (action.type) {
		case LOGIN:
			return { login : true };

		case LOGOUT:
			return { login : false };

		default:
			return state;
	}
}