import { Component, OnInit } from '@angular/core';
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
	loginOb : Observable<boolean>;

  	constructor(private store: Store<loginState>) {
		this.loginOb = this.store.select('loginReducer');
		this.loginOb.subscribe(state => {

		if(state == true)
			this.loginIcon = "home";
		else
			this.loginIcon = "face";

		})
  	}

	ngOnInit() {

	}

}
