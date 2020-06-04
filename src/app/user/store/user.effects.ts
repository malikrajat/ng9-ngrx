import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  addUser,
  addUserSuccess,
  addUsersFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUsersFailure,
} from './user.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
  // load users
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
  //addUser
  addUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      mergeMap((actions) =>
        this.userService.addUser(actions.user).pipe(
          map((user) => addUserSuccess({ user })),
          catchError((error) => of(addUsersFailure({ error })))
        )
      ),
      tap(() => this.router.navigate(['/']))
    )
  );
  // delete user
  //addUser
  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap((actions) =>
        this.userService.deleteUser(actions.id).pipe(
          map(() => deleteUserSuccess({ id: actions.id })),
          catchError((error) => of(deleteUsersFailure({ error })))
        )
      )
    )
  );
}
