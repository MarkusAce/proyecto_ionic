import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-listadocompras',
  templateUrl: './listadocompras.page.html',
  styleUrls: ['./listadocompras.page.scss'],
})
export class ListadocomprasPage implements OnInit {
  terminoBusqueda:string = "";
  idUsuario: string = '';
  idRol: string = '';
  uNombre: string = '';

  arregloCompra: any[] = [];
  arregloUsuarioCompra: any[] = [];
  constructor(private router:Router, private bd: ServicesbdService) { }

  

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

      if(this.idRol == '2'){
          this.cargarComprasUsuario();
      }
      if(this.idRol == '3'){
        this.cargarComprasAdministrador();
      }
    });
    
  }

  irInicio(){
    this.router.navigate(['/inicio'])
  }

  cargarComprasUsuario(){
    this.bd.fetchComprasConDetalles().subscribe(res =>{
      this.arregloUsuarioCompra = res.filter((compra: {idusuario:string} ) => compra.idusuario === this.idUsuario)
    })
  }

  cargarComprasAdministrador(){
    this.bd.fetchComprasConDetalles().subscribe(res =>{
      this.arregloCompra = res;
    })
  }
}
