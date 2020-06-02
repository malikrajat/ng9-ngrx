import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../user.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );
}
