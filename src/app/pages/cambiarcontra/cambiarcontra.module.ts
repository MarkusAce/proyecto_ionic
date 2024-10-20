import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarcontraPageRoutingModule } from './cambiarcontra-routing.module';

import { CambiarcontraPage } from './cambiarcontra.page';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarcontraPageRoutingModule,
    Paquete1Module,
    ReactiveFormsModule
  ],
  declarations: [CambiarcontraPage]
})
export class CambiarcontraPageModule {}
