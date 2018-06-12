import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AccountService} from '../../service/account.service';
import {AlertDialogComponent as AlertDialog} from '../dialog/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	emailControl = new FormControl('', [Validators.required, Validators.email]);
	passwordHide : boolean = true;
	secretHide : boolean = true;
	email : string;
	password : string;

	constructor(private accountService : AccountService, private dialog: MatDialog) {

	}

	ngOnInit() {
	}

	submit(event) {

		if(this.emailControl.invalid){

			let dialogRef = this.dialog.open(AlertDialog,{
				width: '300px',
				data: { 
					title:"Warning", 
					message:'Not vaild email.'
				} 
			});

			dialogRef.afterClosed().subscribe(result => {
				if (result == 'ok') {
				
				}
			});

			return;
		}

		this.accountService.login(this.email,this.password);
	}

	getErrorMessage() {
		return this.emailControl.hasError('required') ? 'You must enter a value' : this.emailControl.hasError('email') ? 'Not a valid email' : '';
	}
}
