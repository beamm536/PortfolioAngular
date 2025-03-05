import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-update-proyecto',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './update-proyecto.component.html',
  styleUrls: ['./update-proyecto.component.css'], // 🔥 Arreglamos "styleUrl" a "styleUrls"
})/*
export class UpdateProyectoComponent implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  tecnologias: string = '';
  participantes: string = '';
  id: string = '';
  proyecto: any = {}; // ✅ Asegurar que es un objeto vacío al inicio

  constructor(
    private servicio: ServicioService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  autoResize(textArea: HTMLTextAreaElement) {
    textArea.style.height = "auto"; // Restablecer altura
    textArea.style.overflowY = "hidden"; // Asegurar que no haya scroll
    textArea.style.height = textArea.scrollHeight + "px"; // Ajustar a contenido
  }
  
  
  goToListar() {
    this.router.navigate(['/listar-proyecto']);
  }
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
            setTimeout(() => {
              const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
              if (textArea) this.autoResize(textArea);
            }, 0);
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
  
}*/export class UpdateProyectoComponent implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  tecnologias: string = '';
  participantes: string = '';
  imagen: string = '';
  id: string = '';
  proyecto: any = {}; // Asegurarse de que sea un objeto vacío al inicio
  formError: boolean = false;  // Variable para controlar si hay un error en el formulario

  constructor(
    private servicio: ServicioService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  autoResize(textArea: HTMLTextAreaElement) {
    textArea.style.height = "auto"; // Restablecer altura
    textArea.style.overflowY = "hidden"; // Asegurar que no haya scroll
    textArea.style.height = textArea.scrollHeight + "px"; // Ajustar a contenido
  }

  goToListar() {
    this.router.navigate(['/listar-proyecto']);
  }

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
            this.imagen = proyecto.imagen || '';
            setTimeout(() => {
              const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
              if (textArea) this.autoResize(textArea);
            }, 0);
          }
        })
        .catch((error) => {
          console.error('Error al obtener el proyecto:', error);
        });
    }
  }

  async actualizarProyecto() {
    // Verificar que todos los campos estén llenos
    if (!this.titulo || !this.descripcion || !this.tecnologias || !this.participantes) {
      this.formError = true;  // Mostrar el mensaje de error
      return;  // No continuar con la actualización si hay campos vacíos
    }

    try {
      await this.servicio.updateProyectos(
        this.id,
        this.titulo,
        this.descripcion,
        this.tecnologias,
        this.participantes,
        this.imagen
      );
      alert('¡Proyecto actualizado con éxito!');
      this.formError = false;  // Restablecer el estado del error
      this.goToListar();
    } catch (error) {
      alert('Hubo un error al actualizar el proyecto. Intenta nuevamente.');
      console.error(error);
    }
  }
}

