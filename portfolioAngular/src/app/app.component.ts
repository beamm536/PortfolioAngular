import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrearProyectoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolioAngular';
}
