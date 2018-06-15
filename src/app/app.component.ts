import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN, loginState } from './reducers/loginReducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

	constructor(private router: Router,  private store: Store<loginState>){

	}

 	ngOnInit(){
		let user = JSON.parse(localStorage.getItem('e2w-currentUser'));
		let tmCurrent = new Date();

		if (user && user.exp > tmCurrent.getTime()) {

			if(user.lastUrl && user.lastUrl !== '')
				this.router.navigate([user.lastUrl]);
			else
				this.router.navigate(['/eth']);

			this.store.dispatch({ type: LOGIN });

			return;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/login']);
  	}
}
