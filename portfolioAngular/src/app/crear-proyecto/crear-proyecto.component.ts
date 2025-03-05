import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-proyecto',
  imports: [FormsModule],
  templateUrl: './crear-proyecto.component.html',
  styleUrl: './crear-proyecto.component.css'
})
export class CrearProyectoComponent {

  titulo: string = "";
  descripcion: string = "";
  tecnologias: string = "";
  participantes: string = "";

  constructor(private servicio:ServicioService,
    private router: Router,
  ){}

  goToListar() {
    this.router.navigate(['/listar-proyecto']);
  }

  addProject(titulo: string, descripcion: string, tecnologias: string, participantes: string) {
    this.servicio.crearProyecto(titulo, descripcion, tecnologias, participantes);
    alert('proyecto creado con éxito')
  }
}
