import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marca } from './marca';
import { Comuna } from './comuna';
import { Usuario } from './usuario';
import { Direccion } from './direccion';
import { Tipousuario } from './tipousuario';
import { Rol } from './rol';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ServicesbdService {
    public database!: SQLiteObject



  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY AUTOINCREMENT, rnombre VARCHAR(255) NOT NULL, rtipo INTEGER);";
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(idcomuna INTEGER PRIMARY KEY AUTOINCREMENT, comnombre VARCHAR(255) NOT NULL);";
  tablaMarca: string = "CREATE TABLE IF NOT EXISTS marca(idmarca INTEGER PRIMARY KEY AUTOINCREMENT,mnombre VARCHAR(255) NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT, uusuario VARCHAR(255) NOT NULL, ucorreo VARCHAR(255) NOT NULL, urut VARCHAR(20), utelefono INTEGER NOT NULL, ufechanac DATE NOT NULL, ucontrasena VARCHAR(255) NOT NULL, idrol integer NOT NULL, FOREIGN KEY (idrol) REFERENCES rol(idrol));";
  tablaDireccion: string = "CREATE TABLE IF NOT EXISTS direccion(iddireccion INTEGER PRIMARY KEY AUTOINCREMENT, ddireccion VARCHAR(255) NOT NULL, uimagen VARCHAR(255), idusuario INTEGER NOT NULL, idcomuna INTEGER NOT NULL, FOREIGN KEY(idusuario) REFERENCES usuario(idusuario), FOREIGN KEY(idcomuna) REFERENCES comuna(idcomuna));"
  tablaZapatilla: string = "CREATE TABLE IF NOT EXISTS zapatilla(idzapatilla INTEGER PRIMARY KEY AUTOINCREMENT, znombre VARCHAR(255) NOT NULL, zfoto VARCHAR(255) NOT NULL, zprecio INTEGER NOT NULL, zstock INTEGER NOT NULL, zestado BOOLEAN DEFAULT FALSE, ztalla INTEGER NOT NULL, idmarca INTEGER NOT NULL, FOREIGN KEY (idmarca) REFERENCES marca(idmarca));";
  tablaCompra: string = "CREATE TABLE IF NOT EXISTS compra(idcompra INTEGER PRIMARY KEY AUTOINCREMENT, cfechaventa DATE NOT NULL, ctotal INTEGER NOT NULL, cestatus VARCHAR(255) NOT NULL, idusuario INTEGER NOT NULL, FOREIGN KEY(idusuario) REFERENCES usuario(idusuario));";
  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, dcantidad INTEGER NOT NULL, dsubtotal INTEGER NOT NULL, idcompra INTEGER NOT NULL, idzapatilla INTEGER NOT NULL, FOREIGN KEY(idcompra) REFERENCES compra(idcompra), FOREIGN KEY(idzapatilla) REFERENCES zapatilla(idzapatilla));";

  //registro Marca
  registroMarca: string = "INSERT or IGNORE INTO marca(idmarca, mnombre) VALUES(1,'Adidas');";

  //Registro Rol
  registroRol: string = "INSERT or IGNORE INTO rol(idrol, rnombre, rtipo) VALUES(1,'Invitado', 1)"
  registroRol2: string = "INSERT or IGNORE INTO rol(idrol, rnombre, rtipo) VALUES(2, 'Usuario', 2)"
  registroRol3: string = "INSERT or IGNORE INTO rol(idrol, rnombre, rtipo) VALUES(3, 'Administrador', 3)"

  //Registro Comunas
  registroComuna: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(1, 'Cerrillos')"
  registroComuna2: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(2, 'Cerro Navia')"
  registroComuna3: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(3, 'Conchali')"
  registroComuna4: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(4, 'El Bosque')"
  registroComuna5: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(5, 'Estacion Central')"
  registroComuna6: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(6, 'Huechuraba')"
  registroComuna7: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(7, 'Independencia')"
  registroComuna8: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(8, 'La Cisterna')"
  registroComuna9: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(9, 'La Florida')"
  registroComuna10: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(10, 'La Granja')"
  registroComuna11: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(11, 'La Pintana')"
  registroComuna12: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(12, 'La Reina')"
  registroComuna13: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(13, 'Las Condes')"
  registroComuna14: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(14, 'Lo Barnechea')"
  registroComuna15: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(15, 'Lo Espejo')"
  registroComuna16: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(16, 'Lo Prado')"
  registroComuna17: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(17, 'Macul')"
  registroComuna18: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(18, 'Maipu')"
  registroComuna19: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(19, 'Ñuñoa')"
  registroComuna20: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(20, 'Pedro Aguirre Cerda')"
  registroComuna21: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(21, 'Peñalolen')"
  registroComuna22: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(22, 'Providencia')"
  registroComuna23: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(23, 'Pudahuel')"
  registroComuna24: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(24, 'Quilicura')"
  registroComuna25: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(25, 'Quinta Normal')"
  registroComuna26: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(26, 'Recoleta')"
  registroComuna27: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(27, 'Renca')"
  registroComuna28: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(28, 'San Joaquin')"
  registroComuna29: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(29, 'San Miguel')"
  registroComuna30: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(30, 'San Ramon')"
  registroComuna31: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(31, 'Santiago')"
  registroComuna32: string = "INSERT or IGNORE INTO comuna(idcomuna, comnombre) VALUES(32, 'Vitacura')"

  //registro Usuario
  registroUsuario: string = "INSERT or IGNORE INTO usuario(idusuario, uusuario, ucorreo, urut,utelefono,ufechanac, ucontrasena, idrol) VALUES(1000, 'Admin', 'Admin@gmail.com', '999999999', '999999999', '21/09/1990', 'Admin1234@', '3')"

  listaMarca = new BehaviorSubject([]);

  listaRol = new BehaviorSubject([]);

  listaComuna = new BehaviorSubject([]);

  listaUsuario = new BehaviorSubject([]);

  listaTipoUsuario = new BehaviorSubject([]);

  listaDireccion = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, private nativeStorage: NativeStorage) { 
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
      //Creacion tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaMarca, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaDireccion, []);
      await this.database.executeSql(this.tablaZapatilla, []);
      await this.database.executeSql(this.tablaCompra, []);
      await this.database.executeSql(this.tablaDetalle, []);

      //Tabla Marca
      await this.database.executeSql(this.registroMarca, []);
      //Tabla rol
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroRol2, []);
      await this.database.executeSql(this.registroRol3, []);

      //Tabla Comuna
      await this.database.executeSql(this.registroComuna, []);
      await this.database.executeSql(this.registroComuna2, []);
      await this.database.executeSql(this.registroComuna3, []);
      await this.database.executeSql(this.registroComuna4, []);
      await this.database.executeSql(this.registroComuna5, []);
      await this.database.executeSql(this.registroComuna6, []);
      await this.database.executeSql(this.registroComuna7, []);
      await this.database.executeSql(this.registroComuna8, []);
      await this.database.executeSql(this.registroComuna9, []);
      await this.database.executeSql(this.registroComuna10, []);
      await this.database.executeSql(this.registroComuna11, []);
      await this.database.executeSql(this.registroComuna12, []);
      await this.database.executeSql(this.registroComuna13, []);
      await this.database.executeSql(this.registroComuna14, []);
      await this.database.executeSql(this.registroComuna15, []);
      await this.database.executeSql(this.registroComuna16, []);
      await this.database.executeSql(this.registroComuna17, []);
      await this.database.executeSql(this.registroComuna18, []);
      await this.database.executeSql(this.registroComuna19, []);
      await this.database.executeSql(this.registroComuna20, []);
      await this.database.executeSql(this.registroComuna21, []);
      await this.database.executeSql(this.registroComuna22, []);
      await this.database.executeSql(this.registroComuna23, []);
      await this.database.executeSql(this.registroComuna24, []);
      await this.database.executeSql(this.registroComuna25, []);
      await this.database.executeSql(this.registroComuna26, []);
      await this.database.executeSql(this.registroComuna27, []);
      await this.database.executeSql(this.registroComuna28, []);
      await this.database.executeSql(this.registroComuna29, []);
      await this.database.executeSql(this.registroComuna30, []);
      await this.database.executeSql(this.registroComuna31, []);
      await this.database.executeSql(this.registroComuna32, []);

      //tabla Usuario
      await this.database.executeSql(this.registroUsuario, []);

      this.seleccionarRol();
      this.seleccionarComuna();
      this.seleccionarUsuario();
    }catch(e){
      this.presentAlert('Crear BD', 'Error: ' + JSON.stringify(e));
    }
  }

  fetchMarca(): Observable<Marca[]>{
    return this.listaMarca.asObservable();
  }
  fetchComuna(): Observable<Comuna[]>{
    return this.listaComuna.asObservable();
  }
  fetchRol(): Observable<Rol[]>{
    return this.listaRol.asObservable();
  }
  fetchUsuario(): Observable<Usuario[]>{
    return this.listaUsuario.asObservable();
  }
  fetchDireccion(): Observable<Comuna[]>{
    return this.listaDireccion.asObservable();
  }
  fetchTipoUsuario(): Observable<Tipousuario[]>{
    return this.listaTipoUsuario.asObservable();
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

  seleccionarMarca(){
    return this.database.executeSql('SELECT * FROM marca', []).then(res=>{
      let items: Marca[] = [];
      if (res.rows.length > 0){
        for (var i=0; i <res.rows.length; i++) {
          items.push({
            idmarca: res.rows.item(i).idmarca,
            mnombre: res.rows.item(i).mnombre
          });
        }
      }
      this.listaMarca.next(items as any);
    })
  }

  seleccionarComuna(){
    return this.database.executeSql('SELECT * FROM comuna', []).then(res=>{
      let items: Comuna[] = [];
      if (res.rows.length > 0){
        for (var i=0; i < res.rows.length; i++) {
          items.push({
            idcomuna: res.rows.item(i).idcomuna,
            comnombre: res.rows.item(i).comnombre
          });
        }
      }
      this.listaComuna.next(items as any);
    })
  }

  seleccionarRol(){
    return this.database.executeSql('SELECT * FROM rol', []).then(res =>{
      let items: Rol[] = [];
      if (res.rows.length > 0){
        for (var i=0; i < res.rows.length; i++) {
          items.push({
            idRol: res.rows.item(i).idRol,
            rnombre: res.rows.item(i).rnombre,
            rtipo: res.rows.item(i).rtipo
          });
        }
      }
      this.listaRol.next(items as any);
    })
  }

  seleccionarUsuario(){
    return this.database.executeSql('SELECT * FROM usuario', []).then(res=>{
      let items: Usuario[] = [];
      if (res.rows.length > 0){
        for (var i=0; i < res.rows.length; i++) {
          items.push({
            idusuario: res.rows.item(i).idusuario,
            uusuario: res.rows.item(i).uusuario,
            ucorreo: res.rows.item(i).ucorreo,
            urut: res.rows.item(i).urut,
            utelefono: res.rows.item(i).utelefono,
            ufechanac: res.rows.item(i).ufechanac,
            ucontrasena: res.rows.item(i).ucontrasena,
            idrol: res.rows.item(i).idrol
          });
        }
      }
      this.listaUsuario.next(items as any);
    })
  }

  eliminarMarca(id:string){
    return this.database.executeSql('DELETE FROM marca WHERE idmarca =?', [id]).then(res=>{
      this.presentAlert("Eliminar", "Marca eliminada");
      this.seleccionarMarca();
    }).catch(e=>{
      this.presentAlert("Error", "Error al eliminar marca: " + JSON.stringify(e));
    })
  }

  modificarMarca(id:string, nombre:string){
    this.presentAlert("service", "ID: " + id);
    return this.database.executeSql('UPDATE marca SET mnombre = ? where idmarca = ?', [nombre, id]).then(res=>{
      this.presentAlert("Modificar", "Noticia Modificar");
      this.seleccionarMarca();
    }).catch(e =>{
      this.presentAlert("Error", "Error al modificar marca: " + JSON.stringify(e));
    })
  }

  insertarMarca(nombre:string){
    return this.database.executeSql('INSERT INTO marca (mnombre) VALUES (?)', [nombre]).then(res=>{
      this.presentAlert("Registrar", "Marca Registrada");
      this.seleccionarMarca();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  insertarDireccion(nombre:string, idUsu:string, idComu:string){
    return this.database.executeSql('INSERT INTO direccion (ddireccion, idUsuario, idComuna) VALUES (?,?,?)', [nombre, idUsu, idComu]).then(res=>{
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  insertarUsuario(uusuario:string, ucorreo:string, urut:string, utelefono:string, ufechanac:string, ucontrasena:string){
    return this.database.executeSql('INSERT INTO usuario(uusuario, ucorreo, urut, utelefono, ufechanac, ucontrasena, idrol) VALUES (?,?,?,?,?,?,2)', [uusuario, ucorreo, urut, utelefono, ufechanac, ucontrasena]).then(res=>{
      const idUsuario = res.insertId;
      this.presentAlert("Registrar", "Usuario Registrado");
      this.seleccionarUsuario();
      return idUsuario;
    }).catch(e=>{
      this.presentAlert('Registrar', 'Error: ' + JSON.stringify(e));
    })
  }

  validarUsuarioLogin(usuario: string, contrasena: string){
    return this.database.executeSql('SELECT uusuario, ucontrasena FROM usuario WHERE uusuario = ? AND ucontrasena = ?', [usuario, contrasena]).then(res=>{
      if(res.rows.length > 0){
        return true;
      }else{
        return false;
      }
    }).catch(e =>{
      this.presentAlert('fallo',  JSON.stringify(e));
      return false;
    })
  }

  guardarTipoUsuario(usuario:string){
    return this.database.executeSql('SELECT * FROM usuario WHERE uusuario= ?', [usuario]).then(res=>{
      let items: Tipousuario[] = [];
      if (res.rows.length > 0){
        for (var i=0; i < res.rows.length; i++) {
          items.push({
            idUsuario: res.rows.item(i).idusuario,
            idRol: res.rows.item(i).idrol
          });
        }
      }
      this.listaTipoUsuario.next(items as any);
    })
  }

  defaultTipoUsuario(){
    const tipoUsuario = {
      idUsuario: '',
      idRol: '1'
    };
    this.listaTipoUsuario.next(tipoUsuario as any);
  }

  verificarUsuario(usuario:string){
    return this.database.executeSql('SELECT * FROM usuario WHERE uusuario = ?',[usuario]).then(res=>{
      return res.rows.length > 0;
    })
  }
  
  verificarEmail(email:string){
    return this.database.executeSql('SELECT * FROM usuario WHERE ucorreo = ?',[email]).then(res=>{
      return res.rows.length > 0;
    })
  }
  verificarExisteRut(rut:string){
    return this.database.executeSql('SELECT * FROM usuario WHERE urut = ?',[rut]).then(res=>{
      return res.rows.length > 0;
    })
  }
  verificarMarca(marca:string){
    return this.database.executeSql('SELECT * FROM marca WHERE mnombre = ?', [marca]).then(res=>{
      return res.rows.length > 0;
    })
  }
}
