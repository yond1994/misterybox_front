import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessusersComponent } from './processusers.component';

describe('ProcessusersComponent', () => {
  let component: ProcessusersComponent;
  let fixture: ComponentFixture<ProcessusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
