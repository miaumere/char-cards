import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFashionComponent } from './character-fashion.component';

describe('CharacterFashionComponent', () => {
  let component: CharacterFashionComponent;
  let fixture: ComponentFixture<CharacterFashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterFashionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
