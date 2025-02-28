import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-login-user',
  imports: [FormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  email: string = "";
  password: string = "";

  constructor(
    public auth: Auth,
    private servicio: ServicioService
  ) { }

  /* LOGIN CON GOOGLE */
  login() {
    console.log("login")
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

/* LOGIN CON CORREO Y CONTRASEÑA */
  loginWithMail() {
    console.log("Intentando login con correo:", this.email);
    this.servicio.loginWithMail(this.email, this.password)
      .then(userCredential => {
        if (userCredential) {
          console.log("Usuario autenticado:", userCredential.user);
        }
      })
      .catch(error => console.error("Error en login:", error));
  }


}
