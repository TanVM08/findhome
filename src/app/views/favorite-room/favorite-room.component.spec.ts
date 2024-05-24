import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRoomComponent } from './favorite-room.component';

describe('FavoriteRoomComponent', () => {
  let component: FavoriteRoomComponent;
  let fixture: ComponentFixture<FavoriteRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteRoomComponent]
    });
    fixture = TestBed.createComponent(FavoriteRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
