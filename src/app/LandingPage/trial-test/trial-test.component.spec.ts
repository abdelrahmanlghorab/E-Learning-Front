import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialTestComponent } from './trial-test.component';

describe('TrialTestComponent', () => {
  let component: TrialTestComponent;
  let fixture: ComponentFixture<TrialTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrialTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
