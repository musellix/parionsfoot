import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesearchComponent } from './leaguesearch.component';

describe('LeaguesearchComponent', () => {
  let component: LeaguesearchComponent;
  let fixture: ComponentFixture<LeaguesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaguesearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
