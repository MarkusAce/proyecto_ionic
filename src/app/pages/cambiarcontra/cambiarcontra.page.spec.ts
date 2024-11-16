import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarcontraPage } from './cambiarcontra.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';

describe('CambiarcontraPage', () => {
  let component: CambiarcontraPage;
  let fixture: ComponentFixture<CambiarcontraPage>;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarcontraPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, NativeStorage,
        {
          provide: ActivatedRoute,
          useValue: {queryParams: {subscribe: (fn: Function) => fn({})}}
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CambiarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
