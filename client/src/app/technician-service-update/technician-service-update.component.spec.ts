import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianServiceUpdateComponent } from './technician-service-update.component';

describe('TechnicianServiceUpdateComponent', () => {
  let component: TechnicianServiceUpdateComponent;
  let fixture: ComponentFixture<TechnicianServiceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianServiceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianServiceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
