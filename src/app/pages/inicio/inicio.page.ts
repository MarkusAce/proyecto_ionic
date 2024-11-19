import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';
import { Usuario } from 'src/app/services/usuario';
import { Zapatilla } from 'src/app/services/zapatilla';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  terminoBusqueda: string = "";
  idUsuario: string = '';
  idRol: string = '';
  uusuario!: string;

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
            this.uusuario = res[0].uusuario;
          }else{
            this.bd.traerSesion().then(res =>{
              if(res){
                this.idUsuario = res.idusuario;
                this.idRol = res.idrol;
                this.bd.guardarTipoUsuario(res.uusuario);
              }else{
                this.idUsuario = '';
                this.idRol = '1';
                this.uusuario = '';
              }
            })
          }
        });
        this.bd.fetchZapatilla().subscribe(res=>{
          this.bd.presentAlert('base', JSON.stringify(res));
          this.arregloZapatillas = res;
          this.arregloUsuario = this.arregloZapatillas.filter(zapatilla => zapatilla.zestado === 0 && zapatilla.tallas.some(t => t.stock > 0));
          this.arregloFiltrado = this.arregloZapatillas.filter(zapatilla => zapatilla.zestado === 0)
          
        })
      }
    });
  }

  irProducto(idzapatilla: string){
    let navigationExtras: NavigationExtras = {
      state: {
        id: idzapatilla
      }
    }
    this.router.navigate(['/producto'], navigationExtras)
  }

  irBusqueda(){
    let navigationExtras: NavigationExtras = {
      state: {
        termino: this.terminoBusqueda
      }
    }
    this.terminoBusqueda= ''
    this.router.navigate(['/zapatillas'], navigationExtras)
  }
}


