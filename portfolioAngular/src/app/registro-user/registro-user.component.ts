import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], //he quitado de aqui el FormControl
  templateUrl: './registro-user.component.html',
  styleUrl: './registro-user.component.css'
  
})
export class RegistroUserComponent {
  

   constructor(
      public auth:Auth,
      private servicio:ServicioService,
      private router: Router
    ){}

    //AQUI HEMOS USADO UN REACTIVE-FORM Y LO HEMOS VINCULADO CON EL HTML (usando el binding)

  usuarioRegistroForm: FormGroup = new FormGroup({
    //aqui vamos a poner los valoresde los campos que va a tener nuestro form
    nombre: new FormControl("", [Validators.required]),
    apellidos: new FormControl("", [Validators.required]), 
    fechaNacimiento: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  get email() {
    return this.usuarioRegistroForm.get('email')!;
  }

  async newUser() {
    if (this.usuarioRegistroForm.invalid) { //por si no estan todas las validaciones
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const { nombre, apellidos, fechaNacimiento, email, password } = this.usuarioRegistroForm.value;

    try {
      await this.servicio.crearUsuarioRegistro(nombre, apellidos, fechaNacimiento, email, password);
      alert('Usuario registrado con éxito');
      this.usuarioRegistroForm.reset(); // Limpiar formulario después del registro
    } catch (error) {
      alert('Error en el registro: ');
    }
  }
  goToLogin() {
    this.router.navigate(['/']);
  }
 


  /*
  CORREGIR -- Q NO FUNCIONA
   newUser(nombre: string, apellidos: string, fechaNacimiento:Date ,email: string, password: string) {
    this.servicio.crearUsuarioRegistro(nombre, apellidos, fechaNacimiento,email, password);
    this.registroNuevoUsuario()
    alert('usuario registrado con éxito')
  } 
    
   registroNuevoUsuario(){
    const formValue = this.usuarioRegistroForm.value;
    console.log(formValue);
  }*/
}
