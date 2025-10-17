import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCompletePage } from './purchase-complete-page';

describe('PurchaseCompletePage', () => {
  let component: PurchaseCompletePage;
  let fixture: ComponentFixture<PurchaseCompletePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseCompletePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
