import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';
import { Zapatilla } from 'src/app/services/zapatilla';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  cantForm!: FormGroup;
  terminoBusqueda: string = "";
  talla!: string;
  cantidad: number = 0;
  imagen: any;

  idUsuario: string = '';
  idRol: string = '';

  totalCantidad: number = 0;
  cantSelec: number = -1;

  zapatillaSelec: any = {};

  constructor(private router: Router,private bd:ServicesbdService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  

  ngOnInit() {
    this.cantForm = this.formBuilder.group({
      talla: [null, Validators.required],
      cantidad: [{value: '', disabled:true}, [ Validators.required, this.validadorCantidad.bind(this)]]
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

    this.activatedRoute.queryParams.subscribe(res =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        const id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
        if (id){
          this.bd.seleccionarZapaId(id).then(res =>{
            this.zapatillaSelec = res;
            this.calcularTotalStock();
          })
        }
      }
    })

    this.bd.guardarCarrito
  }

  validarProducto(){
   if(this.cantForm.valid){
    if(this.idRol=='1'){
      this.bd.presentAlert('Sesión no iniciada', 'Necesita ingresar a su cuenta para comprar.');
      this.router.navigate(['/login']);
    }else{
      const talla = this.cantForm.get('talla')?.value;
      const cantidad = this.cantForm.get('cantidad')?.value;

      const producto = {
        imagen: this.zapatillaSelec.zfoto,
        nombre: this.zapatillaSelec.znombre,
        marca: this.zapatillaSelec.mnombre,
        idZapatilla: this.zapatillaSelec.idzapatilla,
        idUsuario: this.idUsuario,
        talla: talla,
        stock: Number(this.cantSelec),
        cantidad: cantidad,
        preciounidad: this.zapatillaSelec.zprecio,
        total: this.zapatillaSelec.zprecio * cantidad
      }

      if(this.zapatillaSelec.zestado === 1){
        this.bd.presentAlert('Error', 'Este producto esta deshabilitado');
      }else if (this.zapatillaSelec.zestado === 0){
        this.bd.agregarCarrito(producto);
      }
      
    }
   }
  }

  calcularTotalStock(){
    if (this.zapatillaSelec && this.zapatillaSelec.tallas){
      this.totalCantidad = this.zapatillaSelec.tallas.reduce((total: number, talla: any) =>{
        return total + (talla.stock ? parseInt(talla.stock, 10): 0);
      }, 0);
    }
  }

  onTallaChange(){
    const tallaData = this.zapatillaSelec.tallas.find((t: any)=> t.talla === this.talla)
    this.cantSelec = tallaData? tallaData.stock : 0;

    if (this.cantSelec > 0){
      this.cantForm.get('cantidad')?.enable();
    }else{
      this.cantForm.get('cantidad')?.disable();
      this.cantForm.get('cantidad')?.setValue('');
    }
  }

  validadorCantidad(control: AbstractControl): ValidationErrors | null{
    const cantidad = control.value;

    if (this.cantSelec <= 0){
      return { sinCantidad: true };
    }
    if (cantidad > this.cantSelec){
      return { cantidadExcedida: true };
    }
    return null;
  }
}
