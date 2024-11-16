import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {

  perfilForm!: FormGroup;
  idUsuario: string = '';
  idRol: string = '';

  datosUsuario: any = {};

  arregloComunas: any []= [];

  primeraImagen: any;

  constructor(private router: Router, private bd: ServicesbdService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.perfilForm = this.formBuilder.group({
      usuario1: [{value: '', disabled: true}, [Validators.required, Validators.minLength(5)]],
      email1: [{value: '', disabled: true}, [Validators.required]],
      rut:[{value: '', disabled: true}, [Validators.required]],
      telefono: ['',[Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      direccion: ['', [Validators.required,Validators.minLength(5), Validators.pattern(/.*\d+.*/)]],
      comuna: ['', Validators.required],
      fechanac: [{value: '', disabled: true}, [Validators.required]],
      imagen: ['']
    });

    this.bd.dbState().subscribe(data=>{
      if(data){
        this.bd.fetchComuna().subscribe(res=>{
          this.arregloComunas = res || [];
        })
      }
    })

    this.bd.dbState().subscribe(data =>{
      if(data){
        this.bd.fetchTipoUsuario().subscribe(async res =>{
          if(res.length> 0){
            this.idUsuario = res[0].idUsuario;
            this.idRol = res[0].idRol;
          }else{
            this.idUsuario = '';
            this.idRol = '1';
          }

          if (this.idUsuario){
            try{
              const usuario = await this.bd.seleccionarUsuarioPorId(this.idUsuario);
              this.datosUsuario = usuario;
              this.perfilForm.patchValue({
                usuario1: usuario?.uusuario,
                email1: usuario?.ucorreo,
                telefono: usuario?.utelefono,
                direccion: usuario?.ddireccion,
                comuna: usuario?.idcomuna,
                fechanac: usuario?.ufechanac,
                imagen: usuario?.uimagen
              });
              this.primeraImagen = usuario?.uimagen;
            } catch(error){
              this.bd.presentAlert('Error', 'Error al cargar los datos del usuario'+ JSON.stringify(error))
            }
          }
        });
      }
    });
  }

  validarPerfil(){
    if(this.perfilForm.valid){
      const telefono = Number(this.perfilForm.value.telefono);
      const direccion = this.perfilForm.value.direccion;
      const comuna = this.perfilForm.value.comuna;
      const imagen = this.perfilForm.value.imagen;

      if (this.datosUsuario.utelefono === telefono && this.datosUsuario.ddireccion === direccion && this.datosUsuario.idcomuna === comuna && this.primeraImagen === imagen){

        this.bd.presentAlert('Sin cambios Usuario', 'Usted no ha realizado cambios');
        this.router.navigate(['/perfil'])

      }else{

        this.bd.modificarUsuario(telefono, imagen, this.datosUsuario.idusuario).then(()=>{
          this.bd.modificarDireccion(direccion, comuna, this.datosUsuario.idusuario).then(()=>{
            this.router.navigate(['/perfil'])

          })
        }).catch(error =>{
          this.bd.presentAlert('Error', 'Error al modificar los datos del usuario'+ JSON.stringify(error))
        })
      }
    }
  }

  validarFormulario(): boolean{
    return this.perfilForm.controls['telefono'].valid && this.perfilForm.controls['direccion'].valid && this.perfilForm.controls['comuna'].valid && this.perfilForm.valid;
  }
  cerrarSesion(){
    this.bd.defaultTipoUsuario();
    this.bd.presentAlert('Cerrando Sesion', 'Usted ha cerrado sesión')
    this.router.navigate(['/inicio']);
  }
  
  agregarUsuario(){
    this.router.navigate(['/registrar'])
  }

  takePicture = async() =>{
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.datosUsuario.uimagen = image.webPath;

    this.perfilForm.patchValue({
      imagen: this.datosUsuario.uimagen
    });
  }
}
