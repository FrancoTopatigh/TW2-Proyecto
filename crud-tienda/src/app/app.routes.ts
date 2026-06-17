import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { SignupComponent } from './modules/usuarios/auth/pages/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'auth/signup', component: SignupComponent }//esta ruta es provisoria es para ver el formulario de registro
];
