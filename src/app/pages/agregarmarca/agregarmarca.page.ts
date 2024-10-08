import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-agregarmarca',
  templateUrl: './agregarmarca.page.html',
  styleUrls: ['./agregarmarca.page.scss'],
})
export class AgregarmarcaPage implements OnInit {

  marca: string = '';
  
  constructor(private router: Router, private bd:ServicesbdService) { }

  ngOnInit() {
  }

  validarMarca(){
    if(this.marca==''){
      this.bd.presentAlert('Error','Los campos no pueden estar vacios.')
    }
    else if(this.marca=='Puma', 'Adidas'){
      this.bd.presentAlert('Error','La marca ingresada ya existe.')
    }
    else{
      this.bd.presentAlert('Exito','La marca se ha ingresado exitosamente')
      this.router.navigate(['/zapatillasad'])
    }
  }

  insertar(){
    this.bd.insertarMarca(this.marca);
  }
}
