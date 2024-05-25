import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComfirmComponent } from './dialog-comfirm.component';

describe('DialogComfirmComponent', () => {
  let component: DialogComfirmComponent;
  let fixture: ComponentFixture<DialogComfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComfirmComponent]
    });
    fixture = TestBed.createComponent(DialogComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
