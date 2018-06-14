import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertDialogComponent as AlertDialog } from '../components/dialog/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import { Config } from '../configs/config';
import { Router } from '@angular/router';

@Injectable({
  	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient, public router: Router, private dialog: MatDialog) { 

	}

	login(email:string, password:string) {

		if(email && password){

			return this.http.post(`${Config.apiServer}${Config.apiVersion}/login`, { 'email': email, password: password }).subscribe(
				res => {
				
				  	if(res['code'] == 0 && res['data']){
						let user = {
							'email': res['data']['email'],
							'exp': res['data']['exp']*1000,
							'token': res['data']['token'],
							'ethAddress': res['data']['ethAddress'],
						}

						localStorage.setItem('e2w-currentUser', JSON.stringify(user));

						this.router.navigate(['eth']);

						//console.log(user);
					}
					else{
						let dialogRef = this.dialog.open(AlertDialog,{
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
				data: { 
					title:'Login', 
					message:'Please enter all input values ​​for login.'
				} 
			});
		}

	}

	logout() {
		localStorage.removeItem('e2w-currentUser');
	}

  	regster(email:string, password:string, secret:string){
    
		let dialogRef;

		if(email && password && secret){

			dialogRef = this.dialog.open(AlertDialog,{
				data: { 
					title:'Sign In', 
					message:`email: ${email}, password: ${password}, secret: ${secret}`
				} 
			});

		}else{

			dialogRef = this.dialog.open(AlertDialog,{
				data: { 
					title:'Sign In', 
					message:'Please enter all input values ​​for sign up.'
				} 
			})
		}

		dialogRef.afterClosed().subscribe(result => {
			if (result == 'confirm') {
				console.log('Unregistered');
			}
		});
  	}
}
