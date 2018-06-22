import { Component, OnInit } from '@angular/core';
import { EthService } from '../../../../service/eth.service';
import { Store } from '@ngrx/store';
import { TransactionHistory, ethState, ETH_TRANSFER_COMMITED, ETH_TRANSACTION_HISTORY, ETH_BALACNE, ETH_ERC20_BALACNE } from '../../../../reducers/ethReducer';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Config } from '../../../../configs/config'
import { WebsocketService, Message } from '../../../../service/websocket.service';
import { MatDialog } from '@angular/material';
import {AlertDialogComponent as AlertDialog} from '../../../dialog/alert-dialog/alert-dialog.component';

@Component({
	selector: 'eth-transaction-history',
	templateUrl: './transaction-history.component.html',
	styleUrls: ['./transaction-history.component.css'],
	providers: [WebsocketService]
})
export class TransactionHistoryComponent implements OnInit {

	ethOb : Observable<ethState>;
	userAddress : string;
	transactionHistory : Array<TransactionHistory>;
	e2wServer: Subject<Message>;

	constructor(private ethService : EthService, wsService: WebsocketService, private store: Store<ethState>, 
		 public dialog: MatDialog, ) {

		this.ethOb = this.store.select('ethReducer');

		this.ethOb.subscribe(state => {

			if( (state.actionType === ETH_TRANSACTION_HISTORY || state.actionType === ETH_TRANSFER_COMMITED) && state.transactionHistory){	
				this.transactionHistory = state.transactionHistory;
				//console.log(this.transactionHistory);
			}

		});

		this.e2wServer = <Subject<Message>>wsService
		.connect(Config.wsServer)
		.pipe(
			map((response: MessageEvent): Message => {
				//console.log(response.data);
				let msg = JSON.parse(response.data);
				return msg;
			})
		);

		this.e2wServer.subscribe(msg => {

			if(msg.type == 'getEmail'){

				let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
				if(user){
					this.e2wServer.next({
						type : 'myEmail',
						code : 0,
						data : {
							email:user.email
						}
					});	
				}
			} else 	if(msg.type == 'ethTransferCommited'){

				//console.log(msg);

				if(msg.code === 0 ){
					let commitedTransfer = {
						blockNumber: msg.data.blockNumber,
						time: msg.data.time,
						from: msg.data.from,
						to: msg.data.to,
						value: msg.data.value,
						fees:msg.data.fees,
					};
		
					this.store.dispatch({ type: ETH_TRANSFER_COMMITED, 'transaction':commitedTransfer });
					this.store.dispatch({ type: ETH_ERC20_BALACNE, 'balance':msg.data.balance });
					this.store.dispatch({ type: ETH_BALACNE, 'balance':msg.data.balance });
				
				} else {

					this.dialog.closeAll();

					let dialogRef = this.dialog.open(AlertDialog,{
						minWidth: '300px',
						data: { 
							title:"Trenfer result", 
							message:msg.data
						} 
					});
				}
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

	ngOnDestroy() {
		this.e2wServer.next({
			type :'close',
			code : 0,
			data: {}
		});
	}
}
