import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptoObj } from '../models/CryptoObj';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /* public coin:string = '?fsym=BTC'; */
  public currency:string = '&tsym=USD';
  public dataLimit:string = '&limit=10';
  public myKey:string = '&api_key=26d19b1304cea6acbc16d8db2099529be6ce9438dd907278d7b368cc9c8fa3a5';
  public dataURL:string 
  = 'https://min-api.cryptocompare.com/data/v2/histoday';

  constructor(private http:HttpClient) { }

  getCryptoData(coin:string):Observable<CryptoObj> {
    /* console.log(`${this.dataURL}${this.coin}${this.currency}${this.dataLimit}${this.myKey}`); */
    return this.http.get<CryptoObj>(`${this.dataURL}${coin}${this.currency}${this.dataLimit}${this.myKey}`);
  }

}
