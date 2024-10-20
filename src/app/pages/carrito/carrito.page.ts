import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  alertButtons = ['Cerrar'];

  idUsuario: string = '';
  idRol: string = '';

  productosCarrito: any[] = [];
  
  constructor(private router: Router,private bd:ServicesbdService) { }

  async ngOnInit() {

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
    this.productosCarrito = await this.bd.obtenerCarrito(this.idUsuario);
  }

  comprar(){

    const fechaHoy = new Date();
    const dia = String(fechaHoy.getDate()).padStart(2,'0');
    const mes = String(fechaHoy.getMonth() + 1).padStart(2,'0');
    const anio = fechaHoy.getFullYear();

    const fechaFormateada = `${dia}-${mes}-${anio}`;
    const total = this.calcularTotal();
    const estado: string = 'Pendiente';
    
    this.bd.insertarCompra(fechaFormateada, total,estado, this.idUsuario).then(res=>{
      if(res){
        const detallePromises = this.productosCarrito.map(producto =>{
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
            })
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
  quitar(index: number){
    this.bd.eliminarDelCarrito(index, this.idUsuario).then(res =>{
      if (res){
        this.productosCarrito = res
      }
    })
  }
  irZapatillas(){
    this.router.navigate(['/zapatillas'])
  }

  calcularSubtotalSinIVA(){
    return this.productosCarrito.reduce((total, producto)=> total + (producto.total / 1.19), 0);
  }

  calcularTotal(){
    return this.productosCarrito.reduce((total, producto)=> total + producto.total, 0);
  }

  calcularIVA(){
    return this.calcularTotal() - this.calcularSubtotalSinIVA();
  }
}
