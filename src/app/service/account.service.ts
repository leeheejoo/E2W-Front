import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient) { 

	}

	login(email:string, password:string) {

		if(email && password){
			alert(`email: ${email}, password: ${password}`);
		}else{
			alert('Please enter all input values ​​for login.');
		}

	}

  	regster(email:string, password:string, secret:string){
    
		if(email && password && secret){
			alert(`email: ${email}, password: ${password}, secret: ${secret}`);
		}else{
			alert('Please enter all input values ​​for sign up.');
		}
  	}
}
