import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicesbdService } from 'src/app/services/servicesbd.service';
import { Talla } from 'src/app/services/talla';

@Component({
  selector: 'app-editarzapa',
  templateUrl: './editarzapa.page.html',
  styleUrls: ['./editarzapa.page.scss'],
})
export class EditarzapaPage implements OnInit {

  modZapaForm!: FormGroup;
  idUsuario: string = '';
  idRol: string = '';

  imagen: any;

  zapatillaSelec: any = {};

  datosEditados: any = {};

  arregloMarcas: any = [
    {
      id: '',
      nombre: ''
    }
  ];

  constructor(private router: Router,private bd:ServicesbdService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.modZapaForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      precio: [0, [Validators.required, this.validarPrecio.bind(this)]],
      talla1: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla2: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla3: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla4: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla5: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla6: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla7: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla8: [0, [Validators.required, this.validarTalla.bind(this)]],
      marca: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    }, {validators: this.validarZero});


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

    this.activatedRoute.queryParams.subscribe(res =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        const id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
        if (id){
          this.bd.seleccionarZapaId(id).then(res =>{
            this.zapatillaSelec = res;
            this.imagen = res?.zfoto;

            this.modZapaForm.patchValue({
              nombre: this.zapatillaSelec.znombre,
              precio: Number(this.zapatillaSelec.zprecio),
              talla1: Number(this.zapatillaSelec.tallas[0].stock),
              talla2: Number(this.zapatillaSelec.tallas[1].stock),
              talla3: Number(this.zapatillaSelec.tallas[2].stock),
              talla4: Number(this.zapatillaSelec.tallas[3].stock),
              Talla5: Number(this.zapatillaSelec.tallas[4].stock),
              talla6: Number(this.zapatillaSelec.tallas[5].stock),
              talla7: Number(this.zapatillaSelec.tallas[6].stock),
              talla8: Number(this.zapatillaSelec.tallas[7].stock),
              marca: this.zapatillaSelec.idmarca,
              imagen: this.zapatillaSelec.zfoto
            })
          })
        }
      }
    })

    this.bd.dbState().subscribe(data=>{
      if(data){
        this.bd.fetchMarca().subscribe(res=>{
          this.arregloMarcas = res;
        })
      }
    })
  }

  async validarZapatilla(){
    if(this.modZapaForm.valid){
    
      const mnombre = await this.bd.seleccionarMarcaPorId(this.modZapaForm.value.marca);

      this.datosEditados = {
        idzapatilla: this.zapatillaSelec.idzapatilla,
        znombre: this.modZapaForm.value.nombre,
        zfoto: this.modZapaForm.value.imagen,
        zprecio: this.modZapaForm.value.precio,
        idmarca:this.modZapaForm.value.marca,
        mnombre: mnombre,
        tallas:[
          {talla:this.zapatillaSelec.tallas[0].talla, stock: String(this.modZapaForm.value.talla1)},
          {talla:this.zapatillaSelec.tallas[1].talla, stock: String(this.modZapaForm.value.talla2)},
          {talla:this.zapatillaSelec.tallas[2].talla, stock: String(this.modZapaForm.value.talla3)},
          {talla:this.zapatillaSelec.tallas[3].talla, stock: String(this.modZapaForm.value.talla4)},
          {talla:this.zapatillaSelec.tallas[4].talla, stock: String(this.modZapaForm.value.talla5)},
          {talla:this.zapatillaSelec.tallas[5].talla, stock: String(this.modZapaForm.value.talla6)},
          {talla:this.zapatillaSelec.tallas[6].talla, stock: String(this.modZapaForm.value.talla7)},
          {talla:this.zapatillaSelec.tallas[7].talla, stock: String(this.modZapaForm.value.talla8)},
        ]
      }

      if (JSON.stringify(this.datosEditados) === JSON.stringify(this.zapatillaSelec)){
        this.bd.presentAlert('Sin cambios Zapatilla', 'Usted no ha realizado cambios');
        this.router.navigate(['/zapatillas']);
      }else{
        await this.bd.modificarZapatilla(this.modZapaForm.value.nombre, this.modZapaForm.value.imagen, this.modZapaForm.value.precio, this.modZapaForm.value.marca, this.zapatillaSelec.idzapatilla)
        await this.bd.modificarTalla(this.zapatillaSelec.idzapatilla, this.datosEditados.tallas[0].stock, this.zapatillaSelec.tallas[0].talla)
        await this.bd.modificarTalla(this.zapatillaSelec.idzapatilla, this.datosEditados.tallas[1].stock, this.zapatillaSelec.tallas[1].talla)
        await this.bd.modificarTalla(this.zapatillaSelec.idzapatilla, this.datosEditados.tallas[2].stock, this.zapatillaSelec.tallas[2].talla)
        await this.bd.modificarTalla(this.zapatillaSelec.idzapatilla, this.datosEditados.tallas[3].stock, this.zapatillaSelec.tallas[3].talla)
        await this.bd.modificarTalla(this.zapatillaSelec.idzapatilla, this.datosEditados.tallas[4].stock, this.zapatillaSelec.tallas[4].talla)
        await this.bd.modificarTalla(this.zapatillaSelec.idzapatilla, this.datosEditados.tallas[5].stock, this.zapatillaSelec.tallas[5].talla)
        await this.bd.modificarTalla(this.zapatillaSelec.idzapatilla, this.datosEditados.tallas[6].stock, this.zapatillaSelec.tallas[6].talla)
        await this.bd.modificarTalla(this.zapatillaSelec.idzapatilla, this.datosEditados.tallas[7].stock, this.zapatillaSelec.tallas[7].talla)
        this.router.navigate(['/zapatillas']);
      }
    }
  }

  validarPrecio(control: FormControl): ValidationErrors | null{
    const precio = control?.value;
    if (precio<1){
      return { precioInvalido:true};
    }
    return null;
  }

  validarTalla(control: FormControl): ValidationErrors | null{
    const talla = control?.value;
    if (talla<0){
      return { tallaInvalida:true};
    }
    return null;
  }

  takePicture = async() =>{
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.imagen = image.webPath;

    this.modZapaForm.patchValue({
      imagen: this.imagen
    });
  }

  validarZero(control:AbstractControl): ValidationErrors | null {
    const {talla1, talla2, talla3, talla4, talla5, talla6, talla7, talla8} = control.value;

    const todoCero = [
      talla1, talla2, talla3, talla4, talla5, talla6, talla7, talla8
    ].every(talla => talla === 0);

    return todoCero ? {tallasInvalidas: true} : null;
  }

}
