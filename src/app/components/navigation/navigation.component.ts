import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { EthService } from '../../service/eth.service';
import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT, loginState } from '../../reducers/loginReducer';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddTokenDialogComponent } from '../dialog/add-token-dialog/add-token-dialog.component';

@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	loginIcon : string = "lock";
	loginOb : Observable<loginState>;
	isLogIn : boolean = false;
	erc20Tokens : Array<string>;

	constructor(private accountService : AccountService, private ethService : EthService, private router: Router,
		private loginStore: Store<loginState>,  public dialog: MatDialog) {


		this.loginOb = this.loginStore.select('loginReducer');

		this.loginOb.subscribe(state => {

			if(state){	
				this.isLogIn = state.login;
				
				if(state.login == true){

					this.loginIcon = "face";

					let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
					let store = JSON.parse(localStorage.getItem('e2w-store'));

					if (store && store.tokens) {
			
						let tokens = store.tokens[user.email];
						
						if(tokens) {
							this.erc20Tokens = new Array<string>();
							for(let token in tokens) {
								this.erc20Tokens.push(token);
							}

						}else {
							this.erc20Tokens = undefined;
						}

					}
				}
				else {
					this.loginIcon = "lock";
					this.erc20Tokens = undefined;
				}
			}

		});
	
  	}

	ngOnInit() {
	
	}

	logOut(event) {
		this.accountService.logout();
	}

	addToken(event) {

		if(this.isLogIn) {

			let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
			let tmCurrent = new Date();

			if (user && user.exp > tmCurrent.getTime()) {
	
				let dialogRef = this.dialog.open(AddTokenDialogComponent, {
					minWidth: '400px',
				});
			  
				dialogRef.afterClosed().subscribe(result => {
	
					if(result !== 'cancel' ){
						if(result.address) {
							this.router.navigate([`/eth/erc20/${result.address}`]);
						}
					}
				});
	
				return;
			}
		}	
	}

	clickErc20TokenMenu(name) {

		let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
		let store = JSON.parse(localStorage.getItem('e2w-store'));

		if (store && store.tokens) {
			let tokens = store.tokens[user.email];
			if(tokens[name]){
				this.router.navigate([`/eth/erc20/${tokens[name]}`]);
			}
		}
	}
}
