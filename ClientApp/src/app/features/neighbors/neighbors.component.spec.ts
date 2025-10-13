import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborsComponent } from './neighbors.component';

describe('NeighborsComponent', () => {
  let component: NeighborsComponent;
  let fixture: ComponentFixture<NeighborsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeighborsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
