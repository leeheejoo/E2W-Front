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
	gasLimit : Number;
	gasPrace : Number;
	secret : string;
	secretHide : boolean = true;
	
	constructor(public dialogRef: MatDialogRef<TransferEthDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
		
	}

	ngOnInit() {
		
	}

}
