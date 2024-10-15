import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarzapaPageRoutingModule } from './agregarzapa-routing.module';

import { AgregarzapaPage } from './agregarzapa.page';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarzapaPageRoutingModule,
    Paquete1Module,
    ReactiveFormsModule
  ],
  declarations: [AgregarzapaPage]
})
export class AgregarzapaPageModule {}
