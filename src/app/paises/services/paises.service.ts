import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisCorto } from '../interfaces/paises.interface';
import { Observable, of } from 'rxjs';
import { Frontera } from '../interfaces/frontera.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesServices  {
  private _regiones = ['africa','americas','asia','europe','oceania'];

  get regiones ():string[]{
    return [...this._regiones];
  }

  private baseUrl:string ='https://restcountries.com/v3.1/' 
  
  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<PaisCorto[]>{
    return this.http.get<PaisCorto[]>(`${ this.baseUrl }region/${ region }?fields=name,capital,cca3`);
  }
  getPaisPorCodigo(codigo: string):Observable<Frontera|null>{
    if(!codigo){
      return of(null);
    }
    return this.http.get<Frontera>(`${ this.baseUrl }alpha/${ codigo }?fields=borders,name`);
  }
}
