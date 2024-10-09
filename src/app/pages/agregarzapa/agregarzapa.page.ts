import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-agregarzapa',
  templateUrl: './agregarzapa.page.html',
  styleUrls: ['./agregarzapa.page.scss'],
})
export class AgregarzapaPage implements OnInit {

  zapatilla: string = '';
  cantidad: number = 0;
  talla: string = '';
  marca: string = '';
  idUsuario: string = '';
  idRol: string = '';

  constructor(private router: Router, private bd: ServicesbdService) { }

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

  validarZapatilla(){
    if((this.zapatilla == '' ) || (this.cantidad == null) || (this.talla == '' ) || (this.marca == '' )){
      this.bd.presentAlert('Error','Los campos no pueden estar vacios.')
    }
    else if(this.cantidad < 0){
      this.bd.presentAlert('Error','La cantidad debe ser un numero positivo.')
    }
    else{
      this.bd.presentAlert('Exito','La zapatilla ha sido ingresada correctamente.')
      this.router.navigate(['/zapatillasad'])
    }
  }
}
