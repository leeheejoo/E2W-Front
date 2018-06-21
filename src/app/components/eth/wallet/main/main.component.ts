import { Component, OnInit } from '@angular/core';
import { EthService } from '../../../../service/eth.service';
import { Store } from '@ngrx/store';
import { ethState, ETH_BALACNE } from '../../../../reducers/ethReducer';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { TransferEthDialogComponent } from '../../../dialog/transfer-eth-dialog/transfer-eth-dialog.component';

@Component({
	selector: 'eth-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	balance : Number = 0;
	address : string;
	email : string;
	ethOb : Observable<ethState>;
	name : string = "< Ethereum >";

  	constructor(private ethService : EthService, private store: Store<ethState>, public dialog: MatDialog) {

		this.ethOb = this.store.select('ethReducer');

		this.ethOb.subscribe(state => {

			if(state.actionType == ETH_BALACNE && state.balance){	
				this.balance = state.balance;

				let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
				if(user) {
					user.lastUrl = `/eth`;
					localStorage.setItem('e2w-currentUser',JSON.stringify(user));
				}
			}
		});
   	}

  	ngOnInit() {

		let user = JSON.parse(localStorage.getItem('e2w-currentUser'));

		if(user){
			this.ethService.getEthBalance(user.email);
			this.email = user.email;
			this.address = user.ethAddress;
		}

  	}

	transfer(event) {

		let dialogRef = this.dialog.open(TransferEthDialogComponent, {
			minWidth: '400px', 
			data: {
				unit:"ETH"
			}
		});
	  
		dialogRef.afterClosed().subscribe(result => {

			if(result !== 'cancel') {
				let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
				if(user) {
					let email = user.email;
					this.ethService.transfer(email, result.to, result.ether, result.gasLimit, result.gasPrice, result.secret);
				}
			}

		});
	}
}
