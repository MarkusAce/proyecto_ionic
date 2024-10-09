import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  terminoBusqueda: string = "";
  talla: string = "";
  marca: string = "";

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

  validarProducto(){
    if ((this.talla== '') || (this.marca== '')){
      this.bd.presentAlert('Error','Los campos no pueden estar vacios')
    }

    else{
      this.bd.presentAlert('Exito','Los productos se añadieron correctamente.')
      this.router.navigate(['/carrito'])
    }
  }
}
