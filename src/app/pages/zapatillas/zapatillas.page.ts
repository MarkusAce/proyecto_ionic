import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-zapatillas',
  templateUrl: './zapatillas.page.html',
  styleUrls: ['./zapatillas.page.scss'],
})
export class ZapatillasPage implements OnInit {
  idUsuario: string = '';
  idRol: string = '';
  opaco: boolean = false;
  terminoBusqueda: string = "";

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
    this.bd.presentAlert('Exito', 'El producto ha sido deshabilitado')
    this.opaco = !this.opaco;
  }

}
