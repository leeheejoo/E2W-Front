import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../configs/config';
import { Store } from '@ngrx/store';
import { ETH_BALACNE, ETH_TRANSACTION_HISTORY, TransactionHistory, ethState } from '../reducers/ethReducer';
import { AlertDialogComponent as AlertDialog } from '../components/dialog/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import * as CryptoJS from 'crypto-js';

@Injectable({
  	providedIn: 'root'
})
export class EthService {

	constructor(private http: HttpClient, private store: Store<ethState>, private dialog: MatDialog) { 

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

	transfer(email, to, value, gasLimit, gasPrice, secret) {

		//console.log(email);

		if(email && to && value && gasLimit && gasPrice && secret) {

			//let encyptedSecret = CryptoJS.SHA256(secret).toString();
			let encyptedSecret = secret;

			return this.http.post(`${Config.apiServer}${Config.apiVersion}/eth/transfer`, { 'email': email, 'to': to, 'value':+value, 'gasLimit': +gasLimit, 'gasPrice':+gasPrice, 'secret': encyptedSecret }).subscribe(
				res => {
				
				  	if(res['code'] == 0){
						
						//this.store.dispatch({ type: LOGIN });
						//this.login(email,password);

					}
					else{
						let dialogRef = this.dialog.open(AlertDialog,{
							minWidth: '300px',
							data: { 
								title:'Transfer Ether', 
								message:res['msg']
							} 
						});
					}
				 
				},
				err => {
				  	console.log("EthService transfer ether error occured");
				  	console.log(err);
				}
			);
	
		}else{

			let dialogRef = this.dialog.open(AlertDialog,{
				minWidth: '300px',
				data: { 
					title:'Transfer Ether', 
					message:'Please enter all input values ​​for transfer.'
				} 
			});
		}
	}
}
