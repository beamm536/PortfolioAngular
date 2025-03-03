import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  // Método para hacer logout
  logout() {
    signOut(this.auth).then(() => {
      console.log("Usuario cerrado sesión");
      // Redirigir al usuario a la página de login o home después de hacer logout
      this.router.navigate(['/']);
    }).catch(error => {
      console.error("Error al cerrar sesión:", error);
    });
  }

}
