import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PreciochilePipe } from 'src/app/pipes/preciochile.pipe';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  terminoBusqueda: string = "";
  idUsuario: string = '';
  idRol: string = '';

  arregloZapatillas: any = [
    {
      id: '',
      nombre: '',
      foto: '',
      precio: '',
      stock: '',
      estado: '',
      talla: '',
      idmarca:'',
      mnombre: ''
    }
  ]
  
  constructor(private router: Router, private bd: ServicesbdService) {
   }

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

    this.bd.dbState().subscribe(data=>{
      if(data){
        this.bd.fetchZapatilla().subscribe(res=>{
          this.arregloZapatillas = res;
        })
      }
    })
  }

  irProducto(idzapatilla: string){
    let navigationExtras: NavigationExtras = {
      state: {
        id: idzapatilla
      }
    }
    this.router.navigate(['/producto'], navigationExtras)
  }
}


