import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-user',
  imports: [FormsModule], //he quitado de aqui el FormControl
  templateUrl: './registro-user.component.html',
  styleUrl: './registro-user.component.css'
})
export class RegistroUserComponent {

}
