import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarzapaPage } from './editarzapa.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditarzapaPage', () => {
  let component: EditarzapaPage;
  let fixture: ComponentFixture<EditarzapaPage>;

  beforeEach(async() => {
    const activatedRouteMock = {
      queryParams: of({}),
      snapshop: {
        paramMap: {
          get: (key: string) => null
        }
      }
    }

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
      declarations: [ EditarzapaPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [NativeStorage,
        { provide: ActivatedRoute, useValue: activatedRouteMock},
        { provide: SQLite, useValue: sqliteMock}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditarzapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
