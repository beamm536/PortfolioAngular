import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-proyecto',
  imports: [NgFor, RouterLink, CommonModule],
  templateUrl: './listar-proyecto.component.html',
  styleUrl: './listar-proyecto.component.css'
})
export class ListarProyectoComponent {
  proyectos: any;
  proyectoSeleccionado: any = null;
  mostrarModal = false;

  constructor(private servicio: ServicioService) {}

  ngOnInit() {
    this.readProyectos();
  }

  async readProyectos() {
    this.proyectos = await this.servicio.getProyectos();
  }

  abrirModal(proyecto: any) {
    this.proyectoSeleccionado = proyecto;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.proyectoSeleccionado = null;
  }
}
