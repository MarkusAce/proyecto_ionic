import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarperfilPage } from './editarperfil.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

describe('EditarperfilPage', () => {
  let component: EditarperfilPage;
  let fixture: ComponentFixture<EditarperfilPage>;

  beforeEach( async() => {
    const sqliteMock = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
        executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({
          rows: {
            length: 1,
            item: (index: number)=>({
              idusuario: 1,
              uusuario: 'Testunitario',
              ucorreo: 'test@test.com',
              urut: '999999999',
              utelefono: '912341234',
              ddireccion: 'test 123',
              idcomuna: 1,
              ufechanac: '21/09/1990',
              ucontrasena: 'Admin12@',
              uimagen: 'test.jpg',
              idrol: 3
            })
            }
          }))
        }))
    };

    await TestBed.configureTestingModule({
      declarations: [ EditarperfilPage ],
      imports: [
        IonicModule.forRoot(),
        Paquete1Module
      ],
      providers: [NativeStorage,
        { provide: SQLite, useValue: sqliteMock},
        ServicesbdService
      ]
    }).compileComponents();

    const servicesbdService = TestBed.inject(ServicesbdService);
    const dbMock = await sqliteMock.create();
    servicesbdService.database = dbMock;
    fixture = TestBed.createComponent(EditarperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
