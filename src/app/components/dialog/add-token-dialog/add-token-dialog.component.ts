import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-token-dialog',
  templateUrl: './add-token-dialog.component.html',
  styleUrls: ['./add-token-dialog.component.css']
})
export class AddTokenDialogComponent implements OnInit {

  address : string;

  constructor() { }

  ngOnInit() {
  }

}
