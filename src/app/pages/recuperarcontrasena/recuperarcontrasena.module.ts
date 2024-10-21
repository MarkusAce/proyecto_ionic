import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarcontrasenaPageRoutingModule } from './recuperarcontrasena-routing.module';

import { RecuperarcontrasenaPage } from './recuperarcontrasena.page';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarcontrasenaPageRoutingModule,
    Paquete1Module,
    ReactiveFormsModule
  ],
  declarations: [RecuperarcontrasenaPage]
})
export class RecuperarcontrasenaPageModule {}
