import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadradoComponent } from './quadrado.component';

describe('QuadradoComponent', () => {
  let component: QuadradoComponent;
  let fixture: ComponentFixture<QuadradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuadradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
