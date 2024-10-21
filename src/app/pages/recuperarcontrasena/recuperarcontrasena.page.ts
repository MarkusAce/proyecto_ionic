import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ApirestService } from 'src/app/services/apirest.service';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {

  emailForm!: FormGroup;
  idUsuario: string = '';
  idRol: string = '';

  constructor( private bd: ServicesbdService , private apirest: ApirestService, private formBuilder: FormBuilder, private router: Router) {  }

  ngOnInit() {

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

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

  recuperarContrasena(){

    if (this.emailForm.valid){
      let email = this.emailForm.get('email')?.value.toLowerCase();


      this.bd.verificarEmail(email).then(res =>{
        if (!res){
          this.bd.presentAlert('Error correo', 'El correo ingresado no existe en nuestra base de datos.')
          return;
        }
        
        let codigo = Math.floor(100000 + Math.random() * 900000);

        let navigationextras: NavigationExtras = {
          state:{
            codigo: codigo,
            email:email
          }
        }

        this.apirest.enviarCorreo(email, codigo.toString()).subscribe({
          next: (res)=>{
            if (res){
              console.log('Se ha enviado el correo');
              this.bd.presentAlert('Correo enviado', 'Por favor revise su bandeja de correos para encontrar su codigo.').then(()=>{
                this.router.navigate(['/cambiarcontra'], navigationextras)
              })
              
            }
          },
          error: (err) =>{
            console.log(JSON.stringify(err));
            this.bd.presentAlert('Error correo', 'Hubo un error al enviar el correo:' + JSON.stringify(err))
            return;
          }
          
          })
          
      }) 
    }
  }

  validarCorreo(control: AbstractControl): Promise<ValidationErrors | null>{

    const email = control?.value;

    if (email){
      return this.bd.verificarEmail(email).then(existe =>{
        if (!existe){
          this.bd.presentAlert('Error correo', 'El correo ingresado no existe en nuestra base de datos.')
        }
        return null;
      });
    }
    return Promise.resolve(null);
  }

}
