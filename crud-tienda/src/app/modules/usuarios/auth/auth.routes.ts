import { Routes } from "@angular/router";
import { SignupComponent } from "./pages/signup/signup.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { PerfilComponent } from "./pages/perfil/perfil.component";

export const AUTH_ROUTES: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'perfil', component: PerfilComponent },
];
