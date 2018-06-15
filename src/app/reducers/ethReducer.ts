import { Action } from '@ngrx/store';

export const ETH_BALACNE : string = 'ETH_BALANCE';

export class EthBalanceAction implements Action {

	readonly type = ETH_BALACNE

	constructor(public balance : Number) {

	}
}

////////////////////////////////////////////

export const ETH_TRANSACTION_HISTORY : string = 'ETH_TRANSACTION_HISTORY';

export class TransactionHistory {

	constructor(public blockHash:string, 
		public blockNumber:Number, 
		public from:string, 
		public gas:Number, 
		public gasPrice:string, 
		public hash:string, 
		public input:string, 
		public nonce:Number, 
		public to:string, 
		public transactionIndex:Number, 
		public value:string, 
		public fees:string,
		public v:string,
		public r:string,
		public s:string,
		public time:string ) {

	}
}

export class EthTransactionHistoryAction implements Action {

	readonly type = ETH_TRANSACTION_HISTORY

	constructor(public transactionHistory: Array<TransactionHistory>) {

	}
}

//////////////////////////////////////////

export interface ethState {
	balance: Number;
	transactionHistory: Array<TransactionHistory>;
}

export const initialState: ethState = {
	balance: 0,
	transactionHistory:[]
};

export function ethReducer(state: ethState = initialState, action) {
	switch (action.type) {

		case ETH_BALACNE:
			return { balance : action.balance, transactionHistory : state.transactionHistory  };

		case ETH_TRANSACTION_HISTORY:
			return { balance : state.balance, transactionHistory : action.transactionHistory };

		default:
			return state;
	}
}