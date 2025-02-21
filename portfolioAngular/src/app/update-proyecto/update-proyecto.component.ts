import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-proyecto',
  imports: [FormsModule],
  templateUrl: './update-proyecto.component.html',
  styleUrl: './update-proyecto.component.css'
})
export class UpdateProyectoComponent {

  titulo: string = '';
  descripcion: string = '';
  tecnologias: string = '';
  participantes: string = '';
  id: string = ''; //guardamos el id para despues seleccionar el proyecto  a editar

  constructor(private servicio:ServicioService, private route: ActivatedRoute){}


  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id') || ''; 
  }

  //este es el método para actualizar
  actualizarProyecto() {
    this.servicio.updateProyectos(
      this.id, 
      this.titulo, 
      this.descripcion, 
      this.tecnologias, 
      this.participantes
    ).then(() => {
      alert('¡Proyecto actualizado con éxito!');
    }).catch((error) => {
      alert('Hubo un error al actualizar el proyecto. Intenta nuevamente.');
    });
  }
}
