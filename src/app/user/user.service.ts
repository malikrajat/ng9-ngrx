import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './store/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _baseUrl: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private _http: HttpClient) {}

  /**
   * getUsers
   */
  public getUsers(): Observable<User[]> {
    return this._http
      .get<User[]>(this._baseUrl)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
