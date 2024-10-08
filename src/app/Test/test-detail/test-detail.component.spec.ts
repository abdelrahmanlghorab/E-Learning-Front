import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailComponent } from './test-detail.component';

describe('TestDetailComponent', () => {
  let component: TestDetailComponent;
  let fixture: ComponentFixture<TestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
