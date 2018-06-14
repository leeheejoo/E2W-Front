import { Action } from '@ngrx/store';

export const BALACNE : string = 'BALANCE';

export class BalanceAction implements Action {

	readonly type = BALACNE

	constructor(public balance : Number) {

	}
}

export interface ethState {
	balance: Number;
}

export const initialState: ethState = {
	balance: 0,
};

export function ethReducer(state: ethState = initialState, action) {
	switch (action.type) {
		case BALACNE:
			return { balance : action.balance };

		default:
			return state;
	}
}