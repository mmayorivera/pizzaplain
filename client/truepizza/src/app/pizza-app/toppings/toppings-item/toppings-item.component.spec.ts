import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppingsItemComponent } from './toppings-item.component';

describe('ToppingsItemComponent', () => {
  let component: ToppingsItemComponent;
  let fixture: ComponentFixture<ToppingsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToppingsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppingsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
