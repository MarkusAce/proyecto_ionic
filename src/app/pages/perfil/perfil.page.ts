import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  idUsuario: string = '';
  idRol: string = '';

  datosUsuario: any = {};

  

  constructor(private router: Router, private bd: ServicesbdService) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  ionViewWillEnter() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(){
    this.bd.dbState().subscribe(data =>{
      if (data){
        this.bd.fetchTipoUsuario().subscribe(res =>{
          if (res.length > 0){
            this.idUsuario = res[0].idUsuario;
            this.idRol = res[0].idRol;
          }else{
            this.idUsuario = '';
            this.idRol = '1';
          }

          this.bd.seleccionarUsuarioPorId(this.idUsuario).then(res =>{
            this.datosUsuario = res;
          }).catch(error =>{
            this.bd.presentAlert('Error', 'Error al cargar los datos del usuario'+ JSON.stringify(error))
          })
        })
      }
    })
  }
  
  cerrarSesion(){
    this.bd.defaultTipoUsuario();
    this.bd.presentAlert('Cerrando Sesion', 'Usted ha cerrado sesión')
    this.router.navigate(['/inicio']);
  }
  
  agregarUsuario(){
    this.router.navigate(['/registrar'])
  }

  editarPerfil(){
    this.router.navigate(['/editarperfil'])
  }
}
