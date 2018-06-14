import { Component, OnInit } from '@angular/core';
import { EthService } from '../../../../service/eth.service';
import { Store } from '@ngrx/store';
import { BALACNE, ethState } from '../../../../reducers/ethReducer';
import { Observable } from 'rxjs';

@Component({
	selector: 'eth-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	balance : Number = 0;
	ethOb : Observable<ethState>;

  	constructor(private ethService : EthService, private store: Store<ethState>) {

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
			this.ethService.getBalance(user.email);
		}

  	}

}
