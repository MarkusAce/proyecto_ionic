import { TestBed } from '@angular/core/testing';

import { ApirestService } from './apirest.service';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { HttpClientModule } from '@angular/common/http';

describe('ApirestService', () => {
  let service: ApirestService;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        HttpClientModule
      ],
      providers: [SQLite, NativeStorage, ApirestService]
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApirestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
