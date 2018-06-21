import {  Action } from '@ngrx/store';

export const ADD_ERC20_TOKEN = 'ADD_ERC20_TOKEN';

export class AddErc20TokenInfo {

	constructor( public symbol : string, public address: string ) {

	}
}

export class AddErc20TokenAction implements Action {

	readonly type = ADD_ERC20_TOKEN

	constructor(public info : AddErc20TokenInfo) {

	}
}

export interface navigationState {
	addErc20Token: AddErc20TokenInfo;
}

export const initialState: navigationState = {
	addErc20Token:undefined
};

export function navigationReducer(state: navigationState = initialState, action) {
	switch (action.type) {
		case ADD_ERC20_TOKEN:
			return { addErc20Token : action.info };

		default:
			return state;
	}
}