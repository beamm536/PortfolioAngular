import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMasProyectoComponent } from './ver-mas-proyecto.component';

describe('VerMasProyectoComponent', () => {
  let component: VerMasProyectoComponent;
  let fixture: ComponentFixture<VerMasProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerMasProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMasProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
