import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.page.html',
  styleUrls: ['./cambiarcontra.page.scss'],
})
export class CambiarcontraPage implements OnInit {

  email1: string = "";
  idUsuario: string = '';
  idRol: string = '';

  constructor(private router: Router,private bd: ServicesbdService) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data =>{
      if(data){
        this.bd.fetchTipoUsuario().subscribe(res =>{
          if(res.length> 0){
            this.idUsuario = res[0].idUsuario;
            this.idRol = res[0].idRol;
          }else{
            this.idUsuario = '';
            this.idRol = '1';
          }
        });
      }
    });
  }

  validarCambioContra(){
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(this.email1== ''){
      this.bd.presentAlert('Error','Los campos no pueden estar vacios.')
    }
    else if(!correoRegex.test(this.email1)){
      this.bd.presentAlert('Error','El email no es válido.')
    }
    else{
      this.bd.presentAlert('Enviado','El correo fue enviado con exito.')
      this.router.navigate(['/cambiarcontrasena'])
    }
  }
}
