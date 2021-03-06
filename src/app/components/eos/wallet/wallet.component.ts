import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'eos-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  	constructor() { 

	}

	ngOnInit() {
		let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
		if(user) {
			user.lastUrl = '/eos';
			localStorage.setItem('e2w-currentUser',JSON.stringify(user));
		}
	}

}
