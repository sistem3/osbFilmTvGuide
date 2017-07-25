import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmTvGuideComponent } from './film-tv-guide.component';

describe('FilmTvGuideComponent', () => {
  let component: FilmTvGuideComponent;
  let fixture: ComponentFixture<FilmTvGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmTvGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmTvGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
