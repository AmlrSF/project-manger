import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFtpComponent } from './add-ftp.component';

describe('AddFtpComponent', () => {
  let component: AddFtpComponent;
  let fixture: ComponentFixture<AddFtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFtpComponent]
    });
    fixture = TestBed.createComponent(AddFtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
