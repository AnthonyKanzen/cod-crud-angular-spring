import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, catchError, throwError } from 'rxjs';

import { Beginning } from '../models/beginning';

@Injectable({
  providedIn: 'root'
})
export class BeginningService {

  private readonly API = '/api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<Beginning[]>(this.API)
      .pipe(
        delay(2000),
        catchError(error => {
          console.error('Erro ao carregar os cursos:', error);
          return throwError(() => error);
        })
      );
  }

}
