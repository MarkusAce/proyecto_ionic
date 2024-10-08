import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-barrafooter',
  templateUrl: './barrafooter.component.html',
  styleUrls: ['./barrafooter.component.scss'],
})
export class BarrafooterComponent  implements OnInit {

  @Input() tipoUsuario: string = "";

  constructor(private router: Router, private bd: ServicesbdService) { }

  ngOnInit() {}
  irInicio(){
    this.router.navigate(['/inicio'])
  }
  irZapatillas(){
    this.router.navigate(['/zapatillas'])
  }
  irCompras(){
    if(this.tipoUsuario == "2" || this.tipoUsuario == "3"){
      this.router.navigate(['/listadocompras'])
    }
    if(this.tipoUsuario =="1"){
      this.bd.presentAlert('Ver compras', 'Primero tiene que acceder a su cuenta.')
      this.router.navigate(['/login']);
    }
    
  }
  irCarrito(){
    if(this.tipoUsuario == "2" || this.tipoUsuario == "3"){
      this.router.navigate(['/carrito'])
    }
    if(this.tipoUsuario =="1"){
      this.bd.presentAlert('Ver carrito', 'Primero tiene que acceder a su cuenta.')
      this.router.navigate(['/login']);
    }
  }
}
