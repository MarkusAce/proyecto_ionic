import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-editarmarca',
  templateUrl: './editarmarca.page.html',
  styleUrls: ['./editarmarca.page.scss'],
})
export class EditarmarcaPage implements OnInit {

  marcaForm!: FormGroup;

  idUsuario: string = '';
  idRol: string = '';

  arregloMarcas: any [] = [];

  constructor(private router: Router, private bd:ServicesbdService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.marcaForm = this.formBuilder.group({
      marca: ['', Validators.required],
      nuevamarca: ['', Validators.required, this.validarMarca.bind(this)],
      estado: [null]
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

    this.bd.dbState().subscribe(data=>{
      if(data){
        this.bd.fetchMarca().subscribe(res=>{
          this.arregloMarcas = res;
        })
      }
    })
  }

  validarMarca(control: AbstractControl): Promise<ValidationErrors | null>{
     
      const marca = control?.value.toLowerCase();
      
      if (marca){
         return this.bd.verificarMarca(marca).then(existe =>{
          if (existe){
            return { marcaExiste:true };
          }
          return null;
        });
      }
      return Promise.resolve(null);
  }

  deshabilitarMarca(){
    const idmarca = this.marcaForm.value.marca;

    if (idmarca){
      this.bd.deshabilitarMarca(idmarca);
      this.bd.seleccionarMarca();
      this.router.navigate(['/zapatillas']);
    }
    else{
      this.bd.presentAlert("Error", "Debe seleccionar una marca");
    }
  }

  habilitarMarca(){
    const idmarca = this.marcaForm.value.marca;

    if (idmarca){
      this.bd.habilitarMarca(idmarca);
      this.bd.seleccionarMarca();
      this.router.navigate(['/zapatillas']);
    }
    else{
      this.bd.presentAlert("Error", "Debe seleccionar una marca");
    }
  }
  

  validarEditarMarca(){
    const marca: string = this.marcaForm.get('marca')?.value;
    const nuevamarca: string = this.marcaForm.get('nuevamarca')?.value.toLowerCase();

    if (this.marcaForm.valid){
      this.bd.modificarMarca(marca,nuevamarca);
      this.bd.seleccionarMarca();
      this.router.navigate(['/zapatillas']);
    }
  }

  actualizarEstado(){
    const idSeleccionado = this.marcaForm.value.marca;
    const marcaSeleccionada = this.arregloMarcas.find(marca => marca.idmarca === idSeleccionado);

    if (marcaSeleccionada){
      this.marcaForm.patchValue({estado: marcaSeleccionada.mestado});
    }
  }
}
