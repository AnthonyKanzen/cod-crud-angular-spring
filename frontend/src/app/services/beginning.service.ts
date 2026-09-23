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

  save(beginning: Beginning) {

    return this.httpClient.post<Beginning>(this.API, beginning).pipe(
        catchError(error => {
          console.error('Erro ao salvar o curso:', error);
          return throwError(() => error);
        })
      );

  }

  findById(id: string) {
  return this.httpClient.get<Beginning>(`${this.API}/${id}`);
}

update(id: string, beginning: Beginning) {
  return this.httpClient.put<Beginning>(
    `${this.API}/${id}`,
    beginning
  );
}

}
