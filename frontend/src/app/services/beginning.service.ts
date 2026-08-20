import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

import { Beginning } from '../models/beginning';

@Injectable({
  providedIn: 'root'
})
export class BeginningService {

  private readonly API = '/beginning.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<Beginning[]>(this.API)
      // delay usado apenas para testar visualmente o spinner
      //.pipe(delay(2000));
  }

}
