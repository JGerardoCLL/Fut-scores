import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/pantalla principal/principal';
import { GeneralComponent } from './components/pantalla general/general';

export const routes: Routes = [
    {path: '',component: PrincipalComponent},
    {path: 'general',component: GeneralComponent}
];
