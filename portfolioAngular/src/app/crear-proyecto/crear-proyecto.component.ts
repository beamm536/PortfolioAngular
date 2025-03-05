/*import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  userId: string = "";

  constructor(
    private servicio:ServicioService,
    private router: Router,
    private afAuth: AngularFireAuth
  ){}

  ngOnInit(): void {
    // Get the logged-in user's ID on component initialization
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid; // Save user ID
      } else {
        // Handle case if no user is logged in (redirect to login, etc.)
        console.log('No user logged in');
      }
    });
  }


  goToListar() {
    this.router.navigate(['/listar-proyecto']);
  }

  addProject(titulo: string, descripcion: string, tecnologias: string, participantes: string) {
    this.servicio.crearProyecto(titulo, descripcion, tecnologias, participantes, this.userId);
    alert('proyecto creado con éxito')
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';  // Using Firebase Modular API
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-crear-proyecto',
  imports: [FormsModule],
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  titulo: string = "";
  descripcion: string = "";
  tecnologias: string = "";
  participantes: string = "";
  userId: string = "";
  imagen: string="";

  constructor(
    private servicio: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize Firebase Authentication
    const auth = getAuth(); 
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        this.userId = user.uid; 
      } else {
        console.log('No user logged in');
        this.router.navigate(['/login']);  // Redirect to login if not authenticated
      }
    });
  }

  goToListar() {
    this.router.navigate(['/listar-proyecto']);
  }

  async addProject(titulo: string, descripcion: string, tecnologias: string, participantes: string, imagen: string) {
    if (!this.userId) {
      alert('User is not logged in. Please log in first.');
      return;
    }

    try {
      await this.servicio.crearProyecto(titulo, descripcion, tecnologias, participantes,imagen, this.userId);
      alert('Proyecto creado con éxito');
      this.goToListar();
    } catch (error) {
      console.error('Error creating project: ', error);
      alert('Error creating project. Please try again later.');
    }
  }
}
