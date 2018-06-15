import { Component, OnInit } from '@angular/core';
import { EthService } from '../../../../service/eth.service';
import { Store } from '@ngrx/store';
import { TransactionHistory, ethState } from '../../../../reducers/ethReducer';
import { Observable } from 'rxjs';

@Component({
	selector: 'eth-transaction-history',
	templateUrl: './transaction-history.component.html',
	styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

	ethOb : Observable<ethState>;
	transactionHistory : Array<TransactionHistory>;

	constructor(private ethService : EthService, private store: Store<ethState>) {

		this.ethOb = this.store.select('ethReducer');

		this.ethOb.subscribe(state => {

			if(state){	
				this.transactionHistory = state.transactionHistory;
				console.log(this.transactionHistory);
			}

		});
   }

	ngOnInit() {

		let user = JSON.parse(localStorage.getItem('e2w-currentUser'));

		if(user){
			this.ethService.getEthTransactionHistory(user.email);
		}
	}

}
