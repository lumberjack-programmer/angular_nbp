import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideComponentComponent } from './right-side-component.component';

describe('RightSideComponentComponent', () => {
  let component: RightSideComponentComponent;
  let fixture: ComponentFixture<RightSideComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSideComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSideComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
