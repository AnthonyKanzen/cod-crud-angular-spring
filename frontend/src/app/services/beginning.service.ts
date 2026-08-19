import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Beginning } from '../models/beginning';

@Injectable({
  providedIn: 'root'
})
export class BeginningService {

  private readonly API = '/beginning.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Beginning[]>(this.API);
  }
}
