import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
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
	userAddress : string;
	transactionHistory : Array<TransactionHistory>;

	constructor(private ethService : EthService, private store: Store<ethState>, private elementRef: ElementRef, private renderer: Renderer2) {

		this.ethOb = this.store.select('ethReducer');

		this.ethOb.subscribe(state => {

			if(state){	
				this.transactionHistory = state.transactionHistory;
				//console.log(this.transactionHistory);
			}

		});
   }

	ngOnInit() {

		let user = JSON.parse(localStorage.getItem('e2w-currentUser'));

		if(user){
			this.userAddress = user.ethAddress;
			this.ethService.getEthTransactionHistory(user.email);
		}
	}
}
