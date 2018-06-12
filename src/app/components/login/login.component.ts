import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AccountService} from '../../service/account.service';

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
	secret : string;

	constructor(private accountService : AccountService) {

	}

	ngOnInit() {
	}

	submit(event) {

		if(this.emailControl.invalid){
			return alert('Not a vaild email.');
		}

		this.accountService.login(this.email,this.password);
	}

	getErrorMessage() {
		return this.emailControl.hasError('required') ? 'You must enter a value' : this.emailControl.hasError('email') ? 'Not a valid email' : '';
	}
}
