import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoextraComponent } from './infoextra.component';

describe('InfoextraComponent', () => {
  let component: InfoextraComponent;
  let fixture: ComponentFixture<InfoextraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoextraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoextraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
