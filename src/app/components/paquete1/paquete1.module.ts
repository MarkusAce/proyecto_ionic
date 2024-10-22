import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { BarrabusquedaComponent } from '../barrabusqueda/barrabusqueda.component';
import { BarrafooterComponent } from '../barrafooter/barrafooter.component';
import { CardinicioComponent } from '../cardinicio/cardinicio.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BarranavComponent } from '../barranav/barranav.component';
import { PreciochilePipe } from 'src/app/pipes/preciochile.pipe';
import { RutPipe } from 'src/app/pipes/rut.pipe';
import { FormatotarjetaPipe } from 'src/app/pipes/formatotarjeta.pipe';



@NgModule({
  declarations: [LogoComponent,BarrabusquedaComponent, BarrafooterComponent, CardinicioComponent, BarranavComponent, PreciochilePipe, RutPipe, FormatotarjetaPipe],
  exports: [LogoComponent, BarrabusquedaComponent, BarrafooterComponent, CardinicioComponent, BarranavComponent, PreciochilePipe, RutPipe, FormatotarjetaPipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class Paquete1Module { }
