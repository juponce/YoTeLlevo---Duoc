import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesPasajeroPage } from './viajes-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesPasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesPasajeroPageRoutingModule {}
