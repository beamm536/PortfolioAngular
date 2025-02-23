import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-update-proyecto',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './update-proyecto.component.html',
  styleUrls: ['./update-proyecto.component.css'], // 🔥 Arreglamos "styleUrl" a "styleUrls"
})
export class UpdateProyectoComponent implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  tecnologias: string = '';
  participantes: string = '';
  id: string = '';
  proyecto: any = {}; // ✅ Asegurar que es un objeto vacío al inicio

  constructor(
    private servicio: ServicioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.servicio
        .getProyectoById(this.id)
        .then((proyecto) => {
          if (proyecto) {
            this.proyecto = proyecto;
            this.titulo = proyecto.titulo || '';
            this.descripcion = proyecto.descripcion || '';
            this.tecnologias = proyecto.tecnologias || '';
            this.participantes = proyecto.participantes || '';
          }
        })
        .catch((error) => {
          console.error('Error al obtener el proyecto:', error);
        });
    }
  }

  async actualizarProyecto() {
    try {
      await this.servicio.updateProyectos(
        this.id,
        this.titulo,
        this.descripcion,
        this.tecnologias,
        this.participantes
      );
      alert('¡Proyecto actualizado con éxito!');
    } catch (error) {
      alert('Hubo un error al actualizar el proyecto. Intenta nuevamente.');
      console.error(error);
    }
  }
}
