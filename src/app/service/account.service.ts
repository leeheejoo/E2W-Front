import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertDialogComponent as AlertDialog } from '../components/dialog/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import { Config } from '../configs/config';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT, loginState } from '../reducers/loginReducer';
import * as CryptoJS from 'crypto-js';

@Injectable({
  	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient, public router: Router, private store: Store<loginState>, private dialog: MatDialog) { 

	}

	login(email:string, password:string) {

		if(email && password){

			let encyptedPassword = CryptoJS.SHA256(password).toString();
			//console.log(encyptedPassword);

			return this.http.post(`${Config.apiServer}${Config.apiVersion}/login`, { 'email': email, password: encyptedPassword}).subscribe(
			//return this.http.post(`${Config.apiServer}${Config.apiVersion}/login`, { 'email': email, password: password}).subscribe(
				res => {
				
				  	if(res['code'] == 0 && res['data']){
						let user = {
							'email': res['data']['email'],
							'exp': res['data']['exp']*1000,
							'token': res['data']['token'],
							'ethAddress': res['data']['ethAddress'],
							'lastUrl':'',
							'uncommitedTransfers':[]
						}

						localStorage.setItem('e2w-currentUser', JSON.stringify(user));

						this.router.navigate(['eth']);

						this.store.dispatch({ type: LOGIN });
						//console.log(user);
					}
					else{
						let dialogRef = this.dialog.open(AlertDialog,{
							minWidth: '300px',
							data: { 
								title:'Login', 
								message:res['msg']
							} 
						});
					}
				 
				},
				err => {
				  	console.log("AccountService login error occured");
				  	console.log(err);
				}
			);

		}else{

			let dialogRef = this.dialog.open(AlertDialog,{
				minWidth: '300px',
				data: { 
					title:'Login', 
					message:'Please enter all input values ​​for login.'
				} 
			});
		}

	}

	logout() {
		localStorage.removeItem('e2w-currentUser');
		this.store.dispatch({ type: LOGOUT });
	}

  	regster(email:string, password:string, secret:string){

		if(email && password && secret){

			let encyptedPassword = CryptoJS.SHA256(password).toString();
			let encyptedSecret = CryptoJS.SHA256(secret).toString();

			return this.http.post(`${Config.apiServer}${Config.apiVersion}/register`, { 'email': email, password: encyptedPassword, secret: encyptedSecret }).subscribe(
				res => {
				
				  	if(res['code'] == 0){
						
						this.store.dispatch({ type: LOGIN });
						this.login(email,password);

					}
					else{
						let dialogRef = this.dialog.open(AlertDialog,{
							minWidth: '300px',
							data: { 
								title:'Sign Up', 
								message:res['msg']
							} 
						});
					}
				 
				},
				err => {
				  	console.log("AccountService sign-up error occured");
				  	console.log(err);
				}
			);

		}else{

			let dialogRef = this.dialog.open(AlertDialog,{
				minWidth: '300px',
				data: { 
					title:'Sign In', 
					message:'Please enter all input values ​​for sign up.'
				} 
			})
/*
			dialogRef.afterClosed().subscribe(result => {
				if (result == 'confirm') {
	
				}
			});
*/
		}
  	}
}
