import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { RouterLink } from '@angular/router';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-proyecto',
  imports: [NgFor, RouterLink, CommonModule, FormsModule],
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent {
  proyectos: any = [];
  proyectoSeleccionado: any = null;
  mostrarModal = false;
  searchTerm: string = ''; 

  constructor(private servicio: ServicioService, private firestore: Firestore) {}

  ngOnInit() {
    this.readProyectos();
  }

  async readProyectos() {
    this.proyectos = await this.servicio.getProyectos();
  }

  // Método corregido para filtrar correctamente
  filteredProyectos() {
    return this.searchTerm.trim()
      ? this.proyectos.filter((proyecto: any) =>
          proyecto.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.proyectos;
  }

  abrirModal(proyecto: any) {
    this.proyectoSeleccionado = proyecto;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.proyectoSeleccionado = null;
  }

  async eliminarProyecto(id: string | undefined) {
    if (!id) return;

    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        const docRef = doc(this.firestore, 'proyectos', id);
        await deleteDoc(docRef);
        alert('Proyecto eliminado con éxito.');
        this.cerrarModal();
        this.readProyectos();
      } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
      }
    }
  }
}
