import { Component } from '@angular/core';
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
}
