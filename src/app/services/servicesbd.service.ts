import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marca } from './marca';

@Injectable({
  providedIn: 'root'
})
export class ServicesbdService {
    public database!: SQLiteObject



  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY AUTOINCREMENT, rnombre VARCHAR(255) NOT NULL);";
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(idcomuna INTEGER PRIMARY KEY AUTOINCREMENT, comnombre VARCHAR(255) NOT NULL);";
  tablaMarca: string = "CREATE TABLE IF NOT EXISTS marca(idmarca INTEGER PRIMARY KEY AUTOINCREMENT,mnombre VARCHAR(255) NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT, ucorreo VARCHAR(255) NOT NULL, urut VARCHAR(20), utelefono INTEGER NOT NULL, ufechanac DATE NOT NULL, ucontrasena VARCHAR(255) NOT NULL, idrol integer NOT NULL, FOREIGN KEY (idrol) REFERENCES rol(idrol));";
  tablaDireccion: string = "CREATE TABLE IF NOT EXISTS direccion(iddireccion INTEGER PRIMARY KEY AUTOINCREMENT, ddireccion VARCHAR(255) NOT NULL, dnumero INTEGER NOT NULL, idusuario INTEGER NOT NULL, idcomuna INTEGER NOT NULL, FOREIGN KEY(idusuario) REFERENCES usuario(idusuario), FOREIGN KEY(idcomuna) REFERENCES comuna(idcomuna));"
  tablaZapatilla: string = "CREATE TABLE IF NOT EXISTS zapatilla(idzapatilla INTEGER PRIMARY KEY AUTOINCREMENT, znombre VARCHAR(255) NOT NULL, zfoto VARCHAR(255) NOT NULL, zprecio INTEGER NOT NULL, zstock INTEGER NOT NULL, ztalla INTEGER NOT NULL, idmarca INTEGER NOT NULL, FOREIGN KEY (idmarca) REFERENCES marca(idmarca));";
  tablaCompra: string = "CREATE TABLE IF NOT EXISTS compra(idcompra INTEGER PRIMARY KEY AUTOINCREMENT, cfechaventa DATE NOT NULL, ctotal INTEGER NOT NULL, cestatus VARCHAR(255) NOT NULL, idusuario INTEGER NOT NULL, FOREIGN KEY(idusuario) REFERENCES usuario(idusuario));";
  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, dcantidad INTEGER NOT NULL, dsubtotal INTEGER NOT NULL, idcompra INTEGER NOT NULL, idzapatilla INTEGER NOT NULL, FOREIGN KEY(idcompra) REFERENCES compra(idcompra), FOREIGN KEY(idzapatilla) REFERENCES zapatilla(idzapatilla));";

  registroMarca: string = "INSERT or IGNORE INTO marca(idmarca, mnombre) VALUES(1,'Adidas');";

  listaMarca = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 
    this.crearBD();
  }
  crearBD(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'bdzapfast.db',
        location: 'default'
      }).then((bd:SQLiteObject)=>{
        this.database = bd;
        this.crearTablas();
        this.isDBReady.next(true);
      }).catch(e=>{
        this.presentAlert('Crear BD', 'Error: ' + JSON.stringify(e));
      })
    })
  }

  async crearTablas(){
    try {
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaMarca, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaDireccion, []);
      await this.database.executeSql(this.tablaZapatilla, []);
      await this.database.executeSql(this.tablaCompra, []);
      await this.database.executeSql(this.tablaDetalle, []);

      await this.database.executeSql(this.registroMarca, []);
    }catch(e){
      this.presentAlert('Crear BD', 'Error: ' + JSON.stringify(e));
    }
  }

  fetchMarca(): Observable<Marca[]>{
    return this.listaMarca.asObservable();
  }
  dbState(){
    return this.isDBReady.asObservable();
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
