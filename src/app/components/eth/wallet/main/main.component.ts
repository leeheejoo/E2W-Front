import { Component, OnInit } from '@angular/core';
import { EthService } from '../../../../service/eth.service';
import { Store } from '@ngrx/store';
import { ethState } from '../../../../reducers/ethReducer';
import { Observable } from 'rxjs';
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

  	constructor(private ethService : EthService, private store: Store<ethState>, public dialog: MatDialog) {

		this.ethOb = this.store.select('ethReducer');

		this.ethOb.subscribe(state => {

			if(state){	
				this.balance = state.balance;
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
		});
	  
		dialogRef.afterClosed().subscribe(result => {
				console.log(result);
		});
	}
}
