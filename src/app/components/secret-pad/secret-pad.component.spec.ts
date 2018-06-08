import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretPadComponent } from './secret-pad.component';

describe('SecretPadComponent', () => {
  let component: SecretPadComponent;
  let fixture: ComponentFixture<SecretPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
