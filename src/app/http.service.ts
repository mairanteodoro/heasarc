import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private http:Http) { }

  // METHODS
  getData(apiUrl:string) {
    return this.http.get(apiUrl)
      .map((response:Response) => response.json());
  }

}
