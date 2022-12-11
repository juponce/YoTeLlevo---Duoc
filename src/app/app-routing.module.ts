import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { RegistroComponent } from './components/registro/registro.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'gatito-emergencia',
    loadChildren: () => import('./gatito-emergencia/gatito-emergencia.module').then( m => m.GatitoEmergenciaPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'geolocalizacion',
    loadChildren: () => import('./geolocalizacion/geolocalizacion.module').then( m => m.GeolocalizacionPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'foro',
    loadChildren: () => import('./foro/foro.module').then( m => m.ForoPageModule),
    canActivate: [AngularFireAuthGuard]
  },



];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
