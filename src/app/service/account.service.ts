import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AlertDialogComponent as AlertDialog} from '../components/dialog/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient, private dialog: MatDialog) { 

	}

	login(email:string, password:string) {

		let dialogRef;

		if(email && password){

			dialogRef = this.dialog.open(AlertDialog,{
				data: { 
					title:'Login', 
					message:`email: ${email}, password: ${password}`
				} 
			});

		}else{

			dialogRef = this.dialog.open(AlertDialog,{
				data: { 
					title:'Warning', 
					message:'Please enter all input values ​​for login.'
				} 
			})
		}

		dialogRef.afterClosed().subscribe(result => {
			if (result == 'confirm') {
				console.log('Unregistered');
			}
		});
	}

  	regster(email:string, password:string, secret:string){
    
		let dialogRef;

		if(email && password && secret){

			dialogRef = this.dialog.open(AlertDialog,{
				data: { 
					title:'Login', 
					message:`email: ${email}, password: ${password}, secret: ${secret}`
				} 
			});

		}else{

			dialogRef = this.dialog.open(AlertDialog,{
				data: { 
					title:'Warning', 
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
