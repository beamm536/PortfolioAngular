import { Routes } from '@angular/router';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ListarProyectoComponent } from './listar-proyecto/listar-proyecto.component';

export const routes: Routes = [

    {path: 'crear-proyecto', component: CrearProyectoComponent},
    {path: 'listar-proyecto', component: ListarProyectoComponent}
];
