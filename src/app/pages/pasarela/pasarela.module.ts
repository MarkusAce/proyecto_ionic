import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasarelaPageRoutingModule } from './pasarela-routing.module';

import { PasarelaPage } from './pasarela.page';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasarelaPageRoutingModule,
    Paquete1Module,
    ReactiveFormsModule
  ],
  declarations: [PasarelaPage]
})
export class PasarelaPageModule {}
