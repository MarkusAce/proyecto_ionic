import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarmarcaPageRoutingModule } from './editarmarca-routing.module';

import { EditarmarcaPage } from './editarmarca.page';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarmarcaPageRoutingModule,
    Paquete1Module,
    ReactiveFormsModule
  ],
  declarations: [EditarmarcaPage]
})
export class EditarmarcaPageModule {}
