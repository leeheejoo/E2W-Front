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

////////////////////////////////////////////////


export const ETH_TRANSFER_COMMITED : string = 'ETH_TRANSFER_COMMITED';

export class EthTransferAction implements Action {

	readonly type = ETH_TRANSFER_COMMITED

	constructor(public transaction: TransactionHistory) {

	}
}


////////////////////////////////////////////////


export const ETH_ERC20_INFO : string = 'ETH_ERC20_INFO';
export const ETH_ERC20_INFO_FAIL : string = 'ETH_ERC20_INFO_FAIL';

export class EthErc20TokenInfo {

	constructor( public address:string,
		public adjustedBalance:string, 
		public balance:string, 
		public decimal:string, 
		public name:string, 
		public symbol:string ) {

	}
}

export class EthErc20InfoAction implements Action {

	readonly type = ETH_ERC20_INFO

	constructor( public info : EthErc20TokenInfo) {

	}
}

//////////////////////////////////////////

export interface ethState {
	actionType : string,
	balance: Number;
	transactionHistory: Array<TransactionHistory>;
	erc20Info: EthErc20TokenInfo;
}

export const initialState: ethState = {
	actionType : undefined,
	balance: 0,
	transactionHistory:[],
	erc20Info: undefined
};

export function ethReducer(state: ethState = initialState, action) {
	switch (action.type) {

		case ETH_BALACNE:
			return { actionType : ETH_BALACNE, balance : action.balance };

		case ETH_TRANSACTION_HISTORY: {
			return { actionType : ETH_TRANSACTION_HISTORY, transactionHistory : action.transactionHistory };
		}

		case ETH_TRANSFER_COMMITED:{
			state.transactionHistory.unshift(action.transaction);
			return { actionType : ETH_TRANSFER_COMMITED, transactionHistory : state.transactionHistory };
		}

		case ETH_ERC20_INFO:{
			return { actionType : ETH_ERC20_INFO, erc20Info : action.info};
		}

		case ETH_ERC20_INFO_FAIL: {
			return { actionType : ETH_ERC20_INFO_FAIL};
		}

		default:
			return state;
	}
}