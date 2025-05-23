import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianChatComponent } from './technician-chat.component';

describe('TechnicianChatComponent', () => {
  let component: TechnicianChatComponent;
  let fixture: ComponentFixture<TechnicianChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
