import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-listacomprasad',
  templateUrl: './listacomprasad.page.html',
  styleUrls: ['./listacomprasad.page.scss'],
})
export class ListacomprasadPage implements OnInit {

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
  

  irInicio(){
    this.router.navigate(['/inicio'])
  }
  
  irProducto(){
    this.router.navigate(['/producto'])
  }
}
