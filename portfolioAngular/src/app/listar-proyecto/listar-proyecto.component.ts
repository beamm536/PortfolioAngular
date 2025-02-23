import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-proyecto',
  imports: [NgFor, RouterLink],
  templateUrl: './listar-proyecto.component.html',
  styleUrl: './listar-proyecto.component.css'
})
export class ListarProyectoComponent {

  proyectos: any;

  constructor(private servicio:ServicioService){}

  ngOnInit(){
    this.readProyectos();
  }

  //la llamada a la base de datos - con el metodo GETPROYECTOS --> lo hacems desde Servicio
  async readProyectos(){
    this.proyectos = await this.servicio.getProyectos();
  }

}
