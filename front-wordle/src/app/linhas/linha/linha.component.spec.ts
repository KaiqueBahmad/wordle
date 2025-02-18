import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaComponent } from './linha.component';

describe('LinhaComponent', () => {
  let component: LinhaComponent;
  let fixture: ComponentFixture<LinhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
