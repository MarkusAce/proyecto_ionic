import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-zapatillasad',
  templateUrl: './zapatillasad.page.html',
  styleUrls: ['./zapatillasad.page.scss'],
})
export class ZapatillasadPage implements OnInit {

  terminoBusqueda: string = "";
  opaco: boolean = false;
  constructor(private router: Router,private alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK']
    });
    await alert.present();
  }

  irProducto(){
    this.router.navigate(['/producto'])
  }
  irInicio(){
    this.router.navigate(['/inicio'])
  }
  irEditar(){
    this.router.navigate(['/editarzapa'])
  }
  irAgregarZapa(){
    this.router.navigate(['/agregarzapa'])
  }
  irAgregarMarca(){
    this.router.navigate(['/agregarmarca'])
  }
  ocultar(){
    this.presentAlert('Exito', 'El producto ha sido deshabilitado')
    this.opaco = !this.opaco;
  }
}
