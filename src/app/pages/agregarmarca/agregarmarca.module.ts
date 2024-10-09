import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarmarcaPageRoutingModule } from './agregarmarca-routing.module';

import { AgregarmarcaPage } from './agregarmarca.page';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarmarcaPageRoutingModule,
    Paquete1Module,
    ReactiveFormsModule
  ],
  declarations: [AgregarmarcaPage]
})
export class AgregarmarcaPageModule {}
