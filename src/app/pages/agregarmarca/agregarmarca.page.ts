import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-agregarmarca',
  templateUrl: './agregarmarca.page.html',
  styleUrls: ['./agregarmarca.page.scss'],
})
export class AgregarmarcaPage implements OnInit {

  marcaForm!: FormGroup;

  marca: string = '';
  idUsuario: string = '';
  idRol: string = '';
  
  constructor(private router: Router, private bd:ServicesbdService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.marcaForm = this.formBuilder.group({
      marca: ['', [Validators.required],[this.validarExisteMarca.bind(this)]]
    })

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

  validarMarca(){
    if (this.marcaForm.valid){
      this.bd.insertarMarca(this.marca)
    }
  }

  insertar(){
    this.bd.insertarMarca(this.marca);
    this.router.navigate(['/zapatillas']);
  }
  validarExisteMarca(control: AbstractControl): Promise<ValidationErrors | null>{

    const marca = control?.value;

    if (marca){
      return this.bd.verificarMarca(marca).then(existe =>{
        if (existe){
          return { marcaExiste:true};
        }
        return null;
      });
    }
    return Promise.resolve(null);
  }
}
