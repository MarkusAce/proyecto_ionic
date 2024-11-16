import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarrafooterComponent } from './barrafooter.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router } from '@angular/router';

describe('BarrafooterComponent', () => {
  let component: BarrafooterComponent;
  let fixture: ComponentFixture<BarrafooterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {

    const sqliteMock = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
        executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({
          rows: {
            lenght: 3,
            item:(index:number)=>{
              const items = [
                {idrol: 1, rnombre: 'Invitado', rtipo: 1},
                {idrol: 2, rnombre: 'Usuario', rtipo: 2},
                {idrol: 3, rnombre: 'Administrador', rtipo: 3}
              ]
              return items[index];

            }
          }
        }))
      }))
    };

    const nativeStorageMock = {
      getItem: jasmine.createSpy('getItem').and.returnValue(Promise.resolve()),
      setItem: jasmine.createSpy('setItem').and.returnValue(Promise.resolve()),
      remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve())
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ BarrafooterComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        {provide: SQLite, useValue: sqliteMock},
        {provide: NativeStorage, useValue: nativeStorageMock},
        {provide: Router, useValue: routerSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BarrafooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
