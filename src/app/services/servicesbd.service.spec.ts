import { TestBed } from '@angular/core/testing';

import { ServicesbdService } from './servicesbd.service';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('ServicesbdService', () => {
  let service: ServicesbdService;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, NativeStorage]
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
