import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
    const total = this.calcularTotal();

    let navigationExtras: NavigationExtras = {
      state: {
        total: total,
        productos: this.productosCarrito,
      }
    };

    const stockPromises = this.productosCarrito.map((producto)=>{
      return this.bd.seleccionarStock(producto.idZapatilla, producto.talla);
    });

    Promise.all(stockPromises).then((res)=>{
      const mensajeSinStock: string[] = [];

      res.forEach((stock, index)=>{
        if (stock < this.productosCarrito[index].cantidad){
          mensajeSinStock.push(`No hay suficiente stock para el producto número ${index +1}` );
        }
      });

      if(mensajeSinStock.length > 0){
        const mensaje = mensajeSinStock.join('n');
        this.bd.presentAlert('Sin stock', mensaje);
      }else{
        this.router.navigate(['/pasarela'], navigationExtras);
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
