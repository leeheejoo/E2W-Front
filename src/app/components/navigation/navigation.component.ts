import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT, loginState } from '../../reducers/loginReducer';
import { Observable } from 'rxjs';

@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	loginIcon : string = "lock";
	loginOb : Observable<loginState>;
	isLogIn : boolean = false;

  	constructor(private accountService : AccountService, private store: Store<loginState>) {

		this.loginOb = this.store.select('loginReducer');

		this.loginOb.subscribe(state => {

			if(state){	
				this.isLogIn = state.login;
				
				if(state.login == true)
					this.loginIcon = "face";
				else
					this.loginIcon = "lock";
			}

		});
	
  	}

	ngOnInit() {

	}

	logOut(event) {
		this.accountService.logout();
	}
}
