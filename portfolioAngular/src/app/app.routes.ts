import { Routes } from '@angular/router';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ListarProyectoComponent } from './listar-proyecto/listar-proyecto.component';
import { UpdateProyectoComponent } from './update-proyecto/update-proyecto.component';
import { VerMasProyectoComponent } from './ver-mas-proyecto/ver-mas-proyecto.component';
import { RegistroUserComponent } from './registro-user/registro-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LogoutComponent } from './logout/logout.component';
import { PrivateAuthGuard } from './guards/private-guard.guard';
import { PublicAuthGuard } from './guards/public-guard.guard';

export const routes: Routes = [

    { path: 'crear-proyecto', component: CrearProyectoComponent },
    { path: 'listar-proyecto', component: ListarProyectoComponent, canActivate: [PrivateAuthGuard] },
    { path: 'actualizar-proyecto/:id', component: UpdateProyectoComponent },
    { path: 'ver-mas-proyecto/:id', component: VerMasProyectoComponent },
    { path: 'registro-user', component: RegistroUserComponent },
    { path: '', component: LoginUserComponent, canActivate: [PublicAuthGuard] },
    { path: 'logout', component: LogoutComponent },


];
