import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapatillasPage } from './zapatillas.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ZapatillasPage', () => {
  let component: ZapatillasPage;
  let fixture: ComponentFixture<ZapatillasPage>;

  beforeEach(() => {

    const activatedRouteMock = {
      queryParams: of({}),
      snapshop: {
        paramMap: {
          get: (key: string) => null
        }
      }
    }

    TestBed.configureTestingModule({
      declarations: [ ZapatillasPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, NativeStorage,
        { provide: ActivatedRoute, useValue: activatedRouteMock}
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(ZapatillasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
