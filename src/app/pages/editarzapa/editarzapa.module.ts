import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarzapaPageRoutingModule } from './editarzapa-routing.module';

import { EditarzapaPage } from './editarzapa.page';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarzapaPageRoutingModule,
    Paquete1Module,
    ReactiveFormsModule
  ],
  declarations: [EditarzapaPage]
})
export class EditarzapaPageModule {}
