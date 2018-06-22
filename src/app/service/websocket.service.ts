import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

export interface Message {
	type: string;
	code: number;
	data: any;
}

@Injectable()
export class WebsocketService {

	ws : WebSocket;

	constructor() { 

	}

	private subject: Rx.Subject<MessageEvent>;

	public connect(url): Rx.Subject<MessageEvent> {
		if (!this.subject) {
			this.subject = this.create(url);
			console.log("Successfully connected: " + url);
		} 
		return this.subject;
	}

 	private create(url): Rx.Subject<MessageEvent> {
	  
		this.ws = new WebSocket(url);

		let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
				this.ws.onmessage = obs.next.bind(obs);
				this.ws.onerror = obs.error.bind(obs);
				this.ws.onclose = obs.complete.bind(obs);
				this.ws.onopen = this.opened;
				return this.ws.close.bind(this.ws);
		});

		let observer = {
			next: (msg: Message) => {

				if(msg.type === 'close'){
					this.ws.close();
				}
				else {

					if (this.ws.readyState === WebSocket.OPEN) {
						this.ws.send(JSON.stringify(msg));
					}
				}
			}
		}
		return Rx.Subject.create(observer, observable);
	}

	private opened (event){
		
	}
}