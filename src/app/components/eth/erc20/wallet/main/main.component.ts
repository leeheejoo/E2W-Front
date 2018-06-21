import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { EthService } from '../../../../../service/eth.service';
import { Store } from '@ngrx/store';
import { ethState, ETH_ERC20_INFO } from '../../../../../reducers/ethReducer';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { TransferEthDialogComponent } from '../../../../dialog/transfer-eth-dialog/transfer-eth-dialog.component';

@Component({
	selector: 'eth-erc20-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	balance : string;
	address : string;
	email : string;
	ethOb : Observable<ethState>;
	name : string;
	unit : string;

  	constructor(private ethService : EthService, private store: Store<ethState>, public dialog: MatDialog, private router: Router, private activeRoute: ActivatedRoute) {

		this.ethOb = this.store.select('ethReducer');

		this.ethOb.subscribe(state => {

			if(state.actionType ===  ETH_ERC20_INFO &&  state.erc20Info){	

				this.balance = state.erc20Info.adjustedBalance;
				this.address = state.erc20Info.address;
				this.name = state.erc20Info.name;
				this.unit = state.erc20Info.symbol;

				let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
				let store = JSON.parse(localStorage.getItem('e2w-store'));

				if(user && store && store.tokens){

					if(!store.tokens[user.email]){
						store.tokens[user.email] = {};
					}
					
					store.tokens[user.email][this.unit] = this.address;	
					localStorage.setItem('e2w-store',JSON.stringify(store));

					user.lastUrl = `/eth/erc20/${this.address}`;
					localStorage.setItem('e2w-currentUser',JSON.stringify(user));
				}

			}
		});

		this.activeRoute.params.subscribe( params => {
			this.address = params.address;
		});

   	}

  	ngOnInit() {

		let user = JSON.parse(localStorage.getItem('e2w-currentUser'));

		if(user){
			this.ethService.getErc20TokenInfo(user.email,this.address);
			this.email = user.email;
		}

	}

	transfer(event) {

		let dialogRef = this.dialog.open(TransferEthDialogComponent, {
			minWidth: '400px',
			data: { 
				unit: this.unit
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
