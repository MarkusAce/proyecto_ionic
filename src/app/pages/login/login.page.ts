import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;


  constructor(private router: Router, private formBuilder: FormBuilder, private bd: ServicesbdService) { }

  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: [null, [Validators.required]]
    })
  }

  
  validarLogin(){
    const usuario: string = this.loginForm.get('usuario')?.value;
    const contrasena: string = this.loginForm.get('contrasena')?.value;

    if (this.loginForm.valid){
      this.bd.validarUsuarioLogin(usuario, contrasena).then(res =>{
        if(res){
          this.bd.guardarTipoUsuario(usuario);
          this.bd.presentAlert('Acceso','Inicio de sesión exitoso.')
          
          let NavigationExtras: NavigationExtras = {
            state:{
              user: usuario
            }
          }
          this.router.navigate(['/inicio'], NavigationExtras);
        }else{
          this.bd.presentAlert('Acceso denegado', 'Los datos son incorrectos.')
        }
      })
      
    }
    }
  
  irRegistro(){
    this.router.navigate(['/registrar']);
  }
  irCambiarContra(){
    this.router.navigate(['/cambiarcontra']);
  }
}
