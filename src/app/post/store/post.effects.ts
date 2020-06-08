import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAction from './post.actions';
import * as fromReducer from './post.reducer';
import { PostService } from '../post.service';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, tap, concatMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PostEffects {
  constructor(
    private _actions$: Actions,
    private _postService: PostService,
    private _store: Store<fromReducer.PostState[]>,
    private router: Router
  ) {}

  //load Posts
  loadPosts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAction.loadPosts),
      mergeMap(() =>
        this._postService.getPosts().pipe(
          map((posts) => fromAction.loadPostsSuccess({ posts })),
          catchError((error) => of(fromAction.loadPostsFail({ error })))
        )
      )
    )
  );

  // delete post
  deletePost$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAction.deletePost),
      mergeMap((actions) =>
        this._postService.deletePost(actions.id).pipe(
          map(() => fromAction.deletePostSuccess({ id: actions.id })),
          catchError((error) => of(fromAction.deletePostFailure({ error })))
        )
      )
    )
  );

  // add post
  addPost$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAction.addPost),
      mergeMap((actions) =>
        this._postService.addPost(actions.post).pipe(
          map((post) => fromAction.addPostSuccess({ post })),
          catchError((error) => of(fromAction.deletePostFailure({ error })))
        )
      ),
      tap(() => this.router.navigate(['/post']))
    )
  );

  //load post
  post$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAction.loadPost),
      mergeMap((actions) =>
        this._postService.getPost(actions.id).pipe(
          map((post) => fromAction.loadPostSuccess({ selectedPost: post })),
          catchError((error) => of(fromAction.loadPostFailure({ error })))
        )
      )
    )
  );

  //edit user
  editUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAction.editPost),
      concatMap((action) =>
        this._postService.editPost(action.post.id, action.post.changes).pipe(
          map((post) => fromAction.editPostSuccess({ post: action.post })),
          catchError((error) => of(fromAction.editPostFailure({ error })))
        )
      ),
      tap(() => this.router.navigate(['/post']))
    )
  );
}
