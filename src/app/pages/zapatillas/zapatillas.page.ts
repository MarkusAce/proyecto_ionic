import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';
import { Zapatilla } from 'src/app/services/zapatilla';

@Component({
  selector: 'app-zapatillas',
  templateUrl: './zapatillas.page.html',
  styleUrls: ['./zapatillas.page.scss'],
})
export class ZapatillasPage implements OnInit {

  terminoBusqueda: string = "";
  idUsuario: string = '';
  idRol: string = '';

  arregloZapatillas: Zapatilla[] = [];

  arregloFiltrado: Zapatilla[] = [];

  arregloUsuario: Zapatilla[] = [];

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
          this.arregloUsuario = this.arregloZapatillas.filter(zapatilla => zapatilla.zestado === 0 && zapatilla.tallas.some(t => t.stock > 0));
          this.arregloFiltrado = this.arregloZapatillas.filter(zapatilla => zapatilla.zestado === 0)
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
  irEditar(idzapatilla: string){
    let navigationExtras: NavigationExtras = {
      state: {
        id: idzapatilla
      }
    }
    this.router.navigate(['/editarzapa'], navigationExtras)
  }
  irAgregarZapa(){
    this.router.navigate(['/agregarzapa'])
  }
  irAgregarMarca(){
    this.router.navigate(['/agregarmarca'])
  }

  async confirmarDeshabilitar(id:string){
    this.bd.deshabilitarProducto(id)
    this.router.navigate(['/zapatillas'])
  }

}
