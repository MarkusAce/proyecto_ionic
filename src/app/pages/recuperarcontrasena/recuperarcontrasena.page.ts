import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'src/app/services/apirest.service';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {

  idUsuario: string = '';
  idRol: string = '';
  email: string = '';

  constructor( private bd: ServicesbdService , private apirest: ApirestService) {  }

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
        //
      }
    });
  }

  recuperarContrasena(){
    let codigo = Math.floor(Math.random() * 100000);

    this.bd.presentAlert('codigo',JSON.stringify(codigo))
    this.bd.presentAlert('email',JSON.stringify(this.email))
    this.apirest.enviarCorreo(this.email, codigo.toString()).subscribe(res=>{
      if(res){
        alert('Correo enviado con éxito. Revise su bandeja de entrada.');
      }else{
        alert('Ha ocurrido un error al enviar el correo.');
      }
    })
  }

}
