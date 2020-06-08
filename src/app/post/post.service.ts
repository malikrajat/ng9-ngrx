import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Post } from './store/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _baseUrl: string = 'https://jsonplaceholder.typicode.com/posts/';
  constructor(private _http: HttpClient) {}

  /**
   * getUsers
   */
  public getPosts(): Observable<Post[]> {
    return this._http
      .get<Post[]>(this._baseUrl)
      .pipe(catchError(this.handleError));
  }
  /**
   * deletePost
   */
  public deletePost(id: string) {
    return this._http
      .delete(this._baseUrl + id)
      .pipe(catchError(this.handleError));
  }
  /**
   * add post
   */
  public addPost(post: Post): Observable<Post> {
    return this._http
      .post<Post>(this._baseUrl, post)
      .pipe(catchError(this.handleError));
  }

  /**
   * load post
   */
  public getPost(id: string | number): Observable<Post> {
    return this._http
      .get<Post>(this._baseUrl + id)
      .pipe(catchError(this.handleError));
  }

  public editPost(
    id: string | number,
    changes: Partial<Post>
  ): Observable<Post> {
    return this._http
      .put<Post>(this._baseUrl + id, changes)
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
