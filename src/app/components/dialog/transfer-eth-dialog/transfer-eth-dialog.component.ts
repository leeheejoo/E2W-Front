import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'app-transfer-eth-dialog',
	templateUrl: './transfer-eth-dialog.component.html',
	styleUrls: ['./transfer-eth-dialog.component.css']
})
export class TransferEthDialogComponent implements OnInit {

	to : string;
	ether : Number;
	gasLimit : Number = 22000;
	gasPrice : Number = 80;
	secret : string;
	secretHide : boolean = true;
	unit : string;
	
	constructor(public dialogRef: MatDialogRef<TransferEthDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
		if(data)
			this.unit = data.unit;
	}

	ngOnInit() {
		
	}

}
