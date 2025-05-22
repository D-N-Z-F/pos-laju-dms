import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceProgressComponent } from './customer-service-progress.component';

describe('CustomerServiceProgressComponent', () => {
  let component: CustomerServiceProgressComponent;
  let fixture: ComponentFixture<CustomerServiceProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerServiceProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerServiceProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
