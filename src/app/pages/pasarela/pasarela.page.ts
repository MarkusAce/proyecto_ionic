import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.page.html',
  styleUrls: ['./pasarela.page.scss'],
})
export class PasarelaPage implements OnInit {

  pasarelaForm!: FormGroup;
  idUsuario: string = '';
  idRol: string = '';

  total: number = 0;
  productos: any[] = [];

  constructor(private bd: ServicesbdService, private formBuilder: FormBuilder, private router: Router, private activerouter: ActivatedRoute) {
    this.pasarelaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tarjeta: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    })
   }

  ngOnInit() {
    this.activerouter.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.total = this.router.getCurrentNavigation()?.extras?.state?.['total'],
        this.productos = this.router.getCurrentNavigation()?.extras?.state?.['productos']
      }
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

  validarPasarela(){
    if (this.pasarelaForm.valid){
      const fechaHoy = new Date();
      const dia = String(fechaHoy.getDate()).padStart(2,'0');
      const mes = String(fechaHoy.getMonth() + 1).padStart(2,'0');
      const anio = fechaHoy.getFullYear();

      const fechaFormateada = `${dia}-${mes}-${anio}`;
      const estado: string = 'Pendiente';

      this.bd.insertarCompra(fechaFormateada, this.total, estado, this.idUsuario).then(res=>{
        if (res){
          const detallePromises = this.productos.map((producto)=>{
            const detalle = {
              idcompra: res,
              idzapatilla: producto.idZapatilla,
              cantidad: producto.cantidad,
              subtotal: producto.total,
              talla: producto.talla,
              preciounidad: producto.preciounidad
            };
            return this.bd.insertarDetalle(detalle).then(()=>{
              return this.bd.modificarStock(producto.idZapatilla, producto.talla, producto.cantidad).then(()=>{
              });
            });
          });
          Promise.all(detallePromises).then(()=>{
            this.bd.vaciarCarrito(this.idUsuario)
            this.bd.seleccionarComprasConDetalles();
            this.bd.presentAlert('Aprobada','La compra ha sido realizada con exito.')
            this.bd.NotificacionCompra();
            this.router.navigate(['/inicio'])
          })
        }
      })
    }
  }
}
