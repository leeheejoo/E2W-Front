import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEthDialogComponent } from './transfer-eth-dialog.component';

describe('TransferEthDialogComponent', () => {
  let component: TransferEthDialogComponent;
  let fixture: ComponentFixture<TransferEthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEthDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
