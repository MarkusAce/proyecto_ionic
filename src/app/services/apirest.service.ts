import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  API_URL = 'https://api.emailjs.com/api/v1.0/email/send'
  PUBLIC_KEY = "Pas_d3trxBed1qcRD"
  SERVICE_ID = "service_2ysvk1m"
  TEMPLATE_ID = "template_i7b2fzv"
  constructor( private http: HttpClient) { }

  enviarCorreo(email:string, codigo:string): Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    let body = {
      "service_id": this.SERVICE_ID,
      "template_id": this.TEMPLATE_ID,
      "user_id": this.PUBLIC_KEY,
      "template_params": {
        "email": email,
        "codigo": codigo,
      }
    }
    return this.http.post(this.API_URL, body, {headers, responseType:'text'});
  }
}
