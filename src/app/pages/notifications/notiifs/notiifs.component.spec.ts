import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiifsComponent } from './notiifs.component';

describe('NotiifsComponent', () => {
  let component: NotiifsComponent;
  let fixture: ComponentFixture<NotiifsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotiifsComponent]
    });
    fixture = TestBed.createComponent(NotiifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
