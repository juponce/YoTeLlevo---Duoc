import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesPasajeroPageRoutingModule } from './viajes-pasajero-routing.module';

import { ViajesPasajeroPage } from './viajes-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesPasajeroPageRoutingModule
  ],
  declarations: [ViajesPasajeroPage]
})
export class ViajesPasajeroPageModule {}
