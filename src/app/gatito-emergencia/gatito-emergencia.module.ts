import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GatitoEmergenciaPageRoutingModule } from './gatito-emergencia-routing.module';

import { GatitoEmergenciaPage } from './gatito-emergencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GatitoEmergenciaPageRoutingModule
  ],
  declarations: [GatitoEmergenciaPage]
})
export class GatitoEmergenciaPageModule {}
