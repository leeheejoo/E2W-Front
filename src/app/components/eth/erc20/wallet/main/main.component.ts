import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { EthService } from '../../../../../service/eth.service';
import { Store } from '@ngrx/store';
import { ethState, ETH_ERC20_INFO, ETH_ERC20_INFO_FAIL, ETH_ERC20_BALACNE } from '../../../../../reducers/ethReducer';
import { navigationState, NAVI_UPDATE_ERC20_TOKENS } from '../../../../../reducers/navigationReducer';
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
	decimal : number;
	contractAddress : string;
	email : string;
	ethOb : Observable<ethState>;
	name : string;
	unit : string;

	constructor(private ethService : EthService, private ethStore: Store<ethState>, private naviStore: Store<navigationState>, public dialog: MatDialog, private router: Router,
		 private activeRoute: ActivatedRoute) {

		this.ethOb = this.ethStore.select('ethReducer');

		this.ethOb.subscribe(state => {

			let user = JSON.parse(localStorage.getItem('e2w-currentUser'));

			if(state.actionType ===  ETH_ERC20_INFO &&  state.erc20Info){	

				this.contractAddress = state.erc20Info.address;
				this.balance = state.erc20Info.adjustedBalance;
				this.name = state.erc20Info.name;
				this.unit = state.erc20Info.symbol;
				this.decimal = Number(state.erc20Info.decimal);

				let store = JSON.parse(localStorage.getItem('e2w-store'));

				if(user && store && store.tokens){

					this.address = user.ethAddress;

					if(!store.tokens[user.email]){
						store.tokens[user.email] = {};
					}

					store.tokens[user.email][this.unit] = this.contractAddress;	
					localStorage.setItem('e2w-store',JSON.stringify(store));

					user.lastUrl = `/eth/erc20/${this.contractAddress}`;
					localStorage.setItem('e2w-currentUser',JSON.stringify(user));

					naviStore.dispatch({type:NAVI_UPDATE_ERC20_TOKENS});
				}
			}
			else if(state.actionType === ETH_ERC20_BALACNE) {
				let balance = Number(state.balance);
				for(let i=0; i < this.decimal; i++)
					balance = balance/10;
				this.balance = balance.toFixed(this.decimal).toString();
			}
			else if(state.actionType === ETH_ERC20_INFO_FAIL) {
				router.navigate([user.lastUrl]);
			}
		});

		this.activeRoute.params.subscribe( params => {
			this.contractAddress = params.address;
		});

   	}

  	ngOnInit() {

		let user = JSON.parse(localStorage.getItem('e2w-currentUser'));

		if(user){
			this.ethService.getErc20TokenInfo(user.email,this.contractAddress);
			this.email = user.email;
		}

	}

	transfer(event) {

		let dialogRef = this.dialog.open(TransferEthDialogComponent, {
			minWidth: '400px',
			data: { 
				unit: this.unit,
				gasLimit: 42000,
				gasPrice: 80
			} 
		});
	  
		dialogRef.afterClosed().subscribe(result => {

			if(result !== 'cancel') {
				let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
				if(user) {
					let email = user.email;
					let value = Number(result.value);
					for(let i=0; i < this.decimal; i++)
						value*=10;
					this.ethService.transferForErc20Token(email, this.contractAddress, result.to, value, result.gasLimit, result.gasPrice, result.secret, this.unit);
				}
			}

		});
	}

}
