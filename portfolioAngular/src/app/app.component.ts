/*import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrearProyectoComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolioAngular';
  fotoLogo="assets/logoSin.png";
  iconoPer="assets/iconoPer.png";


}
*/
import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolioAngular';
  fotoLogo = "assets/logoSin.png";
  iconoPer = "assets/iconoPer.png";
  mostrarBarra: boolean = true;
  dropdownVisible: boolean = false;

  constructor(
    private router: Router,
    private auth: Auth
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.mostrarBarra = !['/', '/registro-user'].includes(event.url);
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    console.log("Dropdown visible:", this.dropdownVisible);
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log("Usuario cerró sesión");
      this.router.navigate(['/']);
    }).catch(error => {
      console.error("Error al cerrar sesión:", error);
    });
  }

  // 🔹 Cierra el dropdown si se hace clic fuera de él
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdown = document.querySelector('.dropdown');
    const usuarioIcono = document.querySelector('.usuario');
    
    if (dropdown && !dropdown.contains(event.target as Node) && 
        usuarioIcono && !usuarioIcono.contains(event.target as Node)) {
      this.dropdownVisible = false;
    }
  }
}
