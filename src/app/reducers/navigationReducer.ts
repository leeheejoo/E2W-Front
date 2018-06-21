import {  Action } from '@ngrx/store';

export const NAVI_UPDATE_ERC20_TOKENS = 'NAVI_UPDATE_ERC20_TOKENS';

export interface navigationState {
	updateErc20Tokens: boolean;
}

export const initialState: navigationState = {
	updateErc20Tokens:false,
};

export function navigationReducer(state: navigationState = initialState, action: Action) {
	switch (action.type) {
		case NAVI_UPDATE_ERC20_TOKENS:
			return { login : true };

		default:
			return state;
	}
}