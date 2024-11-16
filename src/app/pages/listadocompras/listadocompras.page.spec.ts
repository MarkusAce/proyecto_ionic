import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadocomprasPage } from './listadocompras.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('ListadocomprasPage', () => {
  let component: ListadocomprasPage;
  let fixture: ComponentFixture<ListadocomprasPage>;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ ListadocomprasPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, NativeStorage]
    })
    fixture = TestBed.createComponent(ListadocomprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
