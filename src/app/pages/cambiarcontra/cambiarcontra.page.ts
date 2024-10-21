import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.page.html',
  styleUrls: ['./cambiarcontra.page.scss'],
})
export class CambiarcontraPage implements OnInit {

  contrasenaForm!: FormGroup;
  contrasenacodigoForm!: FormGroup;

  idUsuario: string = '';
  idRol: string = '';

  codigo: string = '';
  email: string = '';

  constructor(private router: Router,private bd: ServicesbdService, private formBuilder: FormBuilder, private activerouter: ActivatedRoute) { }

  ngOnInit() {
    this.activerouter.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.codigo = this.router.getCurrentNavigation()?.extras?.state?.['codigo'];
        this.email = this.router.getCurrentNavigation()?.extras?.state?.['email'];
      }
    })
     
    this.contrasenacodigoForm = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nueva: [null, [Validators.required, this.contrasenaValidador]],
      confirmar: ['', Validators.required]
    }, {validator: this.contrasenasIguales});

    this.contrasenaForm = this.formBuilder.group({
      antigua: ['', [Validators.required]],
      nueva: [null, [Validators.required, this.contrasenaValidador]],
      confirmar: ['', Validators.required]
    }, {validator: this.contrasenasIguales});

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

  async validarCambioContra(){
    if (this.contrasenaForm.valid){
      const {antigua, nueva} = this.contrasenaForm.value;

      const contrasenaValida = await this.bd.seleccionarComparar(this.idUsuario, antigua);
      if(contrasenaValida){
        const actualizado = await this.bd.modificarContrasena(this.idUsuario, nueva);
        if(actualizado){
          this.router.navigate(['/perfil'])
        }else{
          this.bd.presentAlert('Error', 'La contraseña no se pudo actualizar');
        }
      }else{
        this.bd.presentAlert('Error', 'La contraseña antigua es incorrecta');
      }
    }
  }

  async validarCambioContraCodigo(){
    if (this.contrasenacodigoForm.valid){
      const {codigo, nueva} = this.contrasenacodigoForm.value;
      if(codigo == this.codigo){
        const idUsuario = await this.bd.seleccionarIdPorCorreo(this.email);
        if (idUsuario){
          const actualizado = await this.bd.modificarContrasena(idUsuario, nueva);
          if(actualizado){
            this.bd.seleccionarUsuario();
            this.router.navigate(['/login'])
          } else{
            this.bd.presentAlert('Error', 'La contraseña no se pudo actualizar');
          }
        }
      }
    }
  }

  contrasenaValidador(control: AbstractControl): ValidationErrors | null {
    const nueva = control.value;
    const errors: ValidationErrors = {};

    if(!nueva){
      errors['vacia'] = true;
      return errors;
    }
    const mayusculaValid = /[A-Z]/.test(nueva);
    const minusculaValid = /[a-z]/.test(nueva);
    const numeroValid = /\d/.test(nueva);
    const especialValid = /[@$!%*?&]/.test(nueva);
    const minimoValid = nueva.length >=8;

    if(!mayusculaValid){
      errors['mayuscula'] = true;
    }
    if (!minusculaValid){
      errors['minuscula'] = true;
    }
    if (!numeroValid){
      errors['numero'] = true;
    }
    if (!especialValid){
      errors['especial'] = true;
    }
    if (!minimoValid){
      errors['minimo'] = true;
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }

  contrasenasIguales(form: FormGroup) {
    const nueva = form.get('nueva')?.value;
    const confirmar = form.get('confirmar')?.value;
    return nueva === confirmar? null : {mismatch: true};
  }
}
