import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableViewerComponent } from './variable-viewer.component';

describe('EvaluableComponent', () => {
  let component: VariableViewerComponent;
  let fixture: ComponentFixture<VariableViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
