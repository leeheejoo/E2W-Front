import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient) { 

	}

  login(email:string, password:string) {

  }

  regster(email:string, password:string, secret:string){
    
  }
}
