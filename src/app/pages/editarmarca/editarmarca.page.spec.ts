import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarmarcaPage } from './editarmarca.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('EditarmarcaPage', () => {
  let component: EditarmarcaPage;
  let fixture: ComponentFixture<EditarmarcaPage>;

  beforeEach(async() => {
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

    await TestBed.configureTestingModule({
      declarations: [ EditarmarcaPage ],
      providers: [NativeStorage,
        { provide: SQLite, useValue: sqliteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarmarcaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});