import { Routes } from '@angular/router';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ListarProyectoComponent } from './listar-proyecto/listar-proyecto.component';
import { UpdateProyectoComponent } from './update-proyecto/update-proyecto.component';
import { VerMasProyectoComponent } from './ver-mas-proyecto/ver-mas-proyecto.component';

export const routes: Routes = [

    {path: 'crear-proyecto', component: CrearProyectoComponent},
    {path: 'listar-proyecto', component: ListarProyectoComponent},
    {path: 'actualizar-proyecto/:id', component: UpdateProyectoComponent },
    { path: 'ver-mas-proyecto/:id', component: VerMasProyectoComponent }
      

];
