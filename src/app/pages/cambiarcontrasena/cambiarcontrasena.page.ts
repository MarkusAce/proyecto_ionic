import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.page.html',
  styleUrls: ['./cambiarcontrasena.page.scss'],
})
export class CambiarcontrasenaPage implements OnInit {

  contrasena1:string = "";
  contrasenarepetida: string = "";

  idUsuario: string = '';
  idRol: string = '';

  constructor(private router: Router,private bd:ServicesbdService) { }

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

  validarContrasena(){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if((this.contrasena1 == '') || (this.contrasenarepetida == '')) {
      this.bd.presentAlert('Error','Los campos no pueden estar vacios.')
    }
    else if(!passwordRegex.test(this.contrasena1)){
      this.bd.presentAlert('Error', 'La contraseña ingresada no puede tener menos de 8 caracteres, debe contener una mayuscula, un numero y un caracter especial Ej: @')
    }
    else{
      this.bd.presentAlert('Exito', 'La contraseña se ha cambiado exitosamente')
      this.router.navigate(['/inicio'])
    }
  }
}
