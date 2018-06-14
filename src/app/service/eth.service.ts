import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../configs/config';
import { Store } from '@ngrx/store';
import { BALACNE, ethState } from '../reducers/ethReducer';

@Injectable({
  	providedIn: 'root'
})
export class EthService {

	constructor(private http: HttpClient, private store: Store<ethState>) { 

	}

	getBalance(email) {

		console.log(email);

		if(email) {

			let params = new HttpParams().set('email', email);

			return this.http.get(`${Config.apiServer}${Config.apiVersion}/eth/balance`,{ params: params }).subscribe(
				res => {
				
					  if(res['code'] == 0 && res['data']){
					
						let balance = res['data']['balance'];
						console.log(balance);
						this.store.dispatch({ type: BALACNE,
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
}
