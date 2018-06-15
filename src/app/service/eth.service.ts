import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../configs/config';
import { Store } from '@ngrx/store';
import { ETH_BALACNE, ETH_TRANSACTION_HISTORY, TransactionHistory, ethState } from '../reducers/ethReducer';

@Injectable({
  	providedIn: 'root'
})
export class EthService {

	constructor(private http: HttpClient, private store: Store<ethState>) { 

	}

	getEthBalance(email) {

		//console.log(email);

		if(email) {

			let params = new HttpParams().set('email', email);

			return this.http.get(`${Config.apiServer}${Config.apiVersion}/eth/balance`,{ params: params }).subscribe(
				res => {
				
					  if(res['code'] == 0 && res['data']){
					
						let balance = res['data']['balance'];
						//console.log(balance);
						this.store.dispatch({ type: ETH_BALACNE,
							'balance':balance,
						});
					}			 
				},
				err => {
					console.log("EthService getBalance error occured");
					console.log(err);
				}
			);
	
		}
	}

	getEthTransactionHistory(email) {

		if(email) {

			let params = new HttpParams().set('email', email);

			return this.http.get(`${Config.apiServer}${Config.apiVersion}/eth/transactionHistory`,{ params: params }).subscribe(
				res => {
				
					  if(res['code'] == 0 && res['data']){

						let ths = new Array<TransactionHistory>();
					
						res['data'].forEach(t => {

							let th = new TransactionHistory(
								t.blockHash,
								t.blockNumber,
								t.from,
								t.gas,
								t.gasPrice,
								t.hash,
								t.input,
								t.nonce,
								t.to,
								t.transactionIndex,
								t.value,
								t.fees,
								t.v,
								t.r,
								t.s,
								t.time,
							);

							ths.push(th);
							
						});

						this.store.dispatch({ type: ETH_TRANSACTION_HISTORY,
							'transactionHistory':ths,
						});
					}			 
				},
				err => {
					console.log("EthService getEthTransactionHistory error occured");
					console.log(err);
				}
			);
	
		}
	}
}
