import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoChipsComponent} from './info-chips.component';

describe('InfoChipsComponent', () => {
  let component: InfoChipsComponent;
  let fixture: ComponentFixture<InfoChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
